import { View, Text,TextInput,Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import {firebase,firebaseConfig} from '../../../firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default function Createclass() {
    const [value, setValue] = useState({
        class: '',
        course: '',
      })
      const prefix = 'COURSE';
const timestamp = Date.now().toString(36);
const randomNumber = Math.random().toString(36);
const courseId = `${prefix}-${timestamp}-${randomNumber}`;

    const handleAddTodo = () => {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
          firebase.firestore().collection('classcreate').add({
            ...value,
            userId: currentUser.uid,
          })
            .then(() => {
              console.log('Todo added successfully');
              setValue();
            })
            .catch(error => console.error('Error adding todo: ', error));
        }
      };
    
  return (
    <View>
      <Text>Createclass</Text>
      <TextInput
      placeholder='class name'
      value={value.class}
      onChangeText={(text) => setValue({ ...value,class: text })}
      
      />
      <TextInput
      placeholder='course'
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