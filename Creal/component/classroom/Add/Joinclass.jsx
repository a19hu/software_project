import { View, Text,TextInput,Button } from 'react-native'
import React,{useState} from 'react'
import {firebase,app} from '../../../firebase'
export default function Joinclass({ route }) {
  const { setclassid} = route.params;

    const [courseid,setcourseid]=useState()
    const handleadd=async()=>{
      // navigation.navigate('Coursedetails')
      const data = await joinClass(courseid);
      // console.log('data'.data)
      setcourseid('')

    }
    const joinClass = async (classCodes) => {
      // console.log(classCodes)
      const currentUser = firebase.auth().currentUser;
      console.log(currentUser.uid)
      // if(currentUser){
      //   firebase.firestore().collection('studentclasscode').add({
      // classcode:courseid,
      // userId: currentUser.uid,
      // email:currentUser.email
      //   })
      // }
      try {
        const querySnapshot = await firebase.firestore().collection('ClassCreateByAdmin').where('classCode', '==', classCodes).get();
        if (querySnapshot.empty) {
          throw new Error('Class not found with this code');
        }
        const classDoc = querySnapshot.docs[0];
        const classId = classDoc.id;
        await classDoc.ref.collection('students').add({
          name:currentUser.email,
          uid:currentUser.uid
          
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
      placeholder='course'
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