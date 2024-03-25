import { View, Text,TextInput,Button } from 'react-native'
import React,{useState} from 'react'
import {firebase,firebaseConfig} from '../../../firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default function Joinclass({navigation}) {
    const [courseid,setcourseid]=useState()
    const handleadd=async()=>{
    setcourseid('')
    // navigation.navigate('Coursedetails')
    const data = await getDocumentById(courseid);
console.log('Document data:', data);

    }
    const getDocumentById = async (documentId) => {
        try {
            const querySnapshot = await firebase.firestore().collection('studentlist')
                                                  .where('courseid', '==', documentId)
                                                  .get();
            const documents = [];
            querySnapshot.forEach(doc => {
              documents.push({ id: doc.id, ...doc.data() });
            });
            return documents;
        } catch (error) {
          console.error('Error getting document:', error);
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