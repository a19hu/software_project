import { View, Text,TextInput,Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import {firebase,firebaseConfig} from '../../../firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default function Createclass() {
    const [value, setValue] = useState({
      class: '',
        course: ''
      })
      const generateClassCode=()=>{
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let classCode = '';
        const codeLength = 6;
       for (let i = 0; i < codeLength; i++) {
                 const randomIndex = Math.floor(Math.random() * characters.length);
                 classCode += characters.charAt(randomIndex);
        }

       return classCode;
      }
    const handleAddTodo = () => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          firebase.firestore().collection('ClassCreateByAdmin').add({
            ...value,
            userId: currentUser.uid,
            email:currentUser.email,
            classCode: generateClassCode(),
          })
            .then((docRef) => {
              console.log('Todo added successfully');
              // firebase.firestore().collection('classcode').add({
              //   classcode:docRef,
              //   adminname:currentUser.displayName,
              //   email:currentUser.email,
              //   ...value
              // })
              setValue({ class: '', course: '' });
            })
            .catch(error => console.error('Error adding todo: ', error));
        }

      };
    
  return (
    <View>
      <Text>Createclass</Text>
      <TextInput
      placeholder='classname'
      value={value.class}
      onChangeText={(text) => setValue({ ...value,class: text })}
      
      />
      <TextInput
      placeholder='admin name'
      value={value.course}
      onChangeText={(text) => setValue({ ...value,course: text })}
      
      />
      <Button
      title='create'
      onPress={handleAddTodo}
      />
    </View>
  )
}