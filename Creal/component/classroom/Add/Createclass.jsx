import { View, Text,TextInput,Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
import firebase from 'firebase/app';
import { collection, addDoc, query, where, getDocs,doc } from "firebase/firestore";
export default function Createclass({navigation}) {
    const [value, setValue] = useState({
      class: '',
        course: ''
      })
      const generateClassCode=()=>{
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let classCode = '';
        const codeLength = 6;
       for (let i = 0; i < codeLength; i++) {
                 const randomIndex = Math.floor(Math.random() * characters.length);
                 classCode += characters.charAt(randomIndex);
        }

       return classCode;
      }
    const handleAddTodo = async() => {
      
      const user = auth.currentUser;
        
          await addDoc(collection(db, "ClassCreateByAdmin"), {
            ...value,
            userId: user.uid,
            email:user.email,
            classCode: generateClassCode(),
          })
           
              .then((docRef) => {
                setValue({ class: '', course: '' });
                console.log('Todo added successfully');
                navigation.navigate('mainhome')
              })
              .catch(error => console.error('Error adding todo: ', error));
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