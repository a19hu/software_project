import { View, Text,TextInput,Button } from 'react-native'
import React,{useState} from 'react'
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs,doc,addDoc } from "firebase/firestore";
const auth = getAuth();
import { db } from '../../../firebase'

export default function JoinTa({ route }) {
  // const { setclassid} = route.params;

    const [courseid,setcourseid]=useState()
    const handleadd=async()=>{
      const data = await joinClass(courseid);
      setcourseid('')

    }
    const joinClass = async () => {
      const user = auth.currentUser;
          try {
            const q = collection(db, "ClassCreateByAdmin");
            const snapshot = await getDocs(q);
            let classDoc;
  snapshot.forEach(doc => {
    console.log('doc',doc.id)
    if (doc.id === courseid) { 
      classDoc = doc;
    }
    // else{
    //   throw new Error('Class not found with this code');

    // }
  });
            const studentDocRef = await addDoc(collection(classDoc.ref, "Ta"), {
              name: user.email,
              uid: user.uid
            });
            setcourseid('')
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