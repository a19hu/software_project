import { View, Text,TextInput,Button } from 'react-native'
import React,{useState} from 'react'
import {firebase} from '../../../firebase'

export default function JoinTa({ route }) {
  // const { setclassid} = route.params;

    const [courseid,setcourseid]=useState()
    const handleadd=async()=>{
      const data = await joinClass(courseid);
      setcourseid('')

    }
    const joinClass = async (classCodes) => {
      const currentUser = firebase.auth().currentUser;
      // console.log(currentUser.uid)
     
      try {
        const querySnapshot = await firebase.firestore().collection('ClassCreateByAdmin').where('userId', '==', classCodes).get();
        if (querySnapshot.empty) {
          throw new Error('Class not found with this code');
        }
        const classDoc = querySnapshot.docs[0];
        const classId = classDoc.id;
        await classDoc.ref.collection('TA').add({
          name:currentUser.email,
          uid:currentUser.uid,
          userId:courseid
          
        });
        return classId; 
      } catch (error) {
        console.error('Error joining class: ', error);
        throw error;
      }
      
    };
    
  return (
    <View>
     <TextInput
      placeholder='USERID'
      value={courseid}
      onChangeText={(text) => setcourseid(text)}
      
      />
      <Button
      title='join'
      onPress={handleadd}
      />
    </View>
  )
}