import { View, Text,TextInput,Button } from 'react-native'
import React,{useState} from 'react'
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs,doc,addDoc } from "firebase/firestore";
const auth = getAuth();
import { db } from '../../../firebase'

export default function Joinclass({ route }) {
    const [classCodes,setcourseid]=useState()
  const handleadd = async (classCodes) => {
    
    const user = auth.currentUser;
          try {
            const q = query(collection(db, "ClassCreateByAdmin"), where('classCode', '==', classCodes));
            const snapshot = await getDocs(q);
            if (snapshot.empty) {
              throw new Error('Class not found with this code');
            }
            const classDoc = snapshot.docs[0];
            const studentDocRef = await addDoc(collection(classDoc.ref, "students"), {
              name: user.email,
              uid: user.uid
            });
            setcourseid('')
          } catch (error) {
            console.error('Error joining class: ', error);
            throw error;
          }
        
      
    }
    
  return (
    <View>
     <TextInput
      placeholder='course'
      value={classCodes}
      onChangeText={(text) => setcourseid(text)}
      
      />
      <Button
      title='join'
      onPress={()=>handleadd(classCodes)}
      />
    </View>
  )
}