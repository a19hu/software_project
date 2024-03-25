import { View, Text,TextInput,Button,TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react';
import {firebase,firebaseConfig} from '../../../firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function Studentlist({route}) {
  const { details } = route.params;
  const [value, setValue] = useState()
  const [todos, setTodos] = useState([]);

  const handleinvite = () => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase.firestore().collection('studentlist').add({
        value,
        userId: currentUser.uid,
        courseid:details.id

      })
        .then(() => {
          console.log('Todo added successfully');
          setValue();
        })
        .catch(error => console.error('Error adding todo: ', error));
    }
  };
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    // console.log(details.id)                   
    const unsubscribe = firebase.firestore().collection('studentlist').where('courseid', '==', details.id).onSnapshot(snapshot => {
      const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, [ ]);
// console.log(todos)
  return (
    <View>
      <Text>Studentlist</Text>
      <TextInput
      placeholder='student email'
      value={value}
      onChangeText={(text) => setValue(text)}
      
      />
      <Button
      title='invite'
      onPress={handleinvite}
      />
       {todos && todos.map((item,index) => (
  <TouchableOpacity  key={index}   >


   <Text  key={index}> {item.value}</Text>
  </TouchableOpacity>
     ))}
    </View>
  )
}