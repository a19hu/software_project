import { View, Text,Button } from 'react-native'
import React,{useState} from 'react'
import Studentcamera from './Studentcamera'
import * as DocumentPicker from 'expo-document-picker';
import {firebase,firebaseConfig} from '../../../firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default function Studentcoursedet() {
  const [uploading, setUploading] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      console.log('result',result)
      console.log('name',result.assets[0].name)

      if (!result.canceled) {
        setUploading(true);
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();
        const filename = result.assets[0].name;
        const storageRef = firebase.storage().ref().child(`pdfs/${filename}`);
        await storageRef.put(blob);
        setUploading(false);
        console.log('PDF uploaded to Firebase Storage');
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };
  return (
    <View>
      <Text>Studentcoursedet</Text>
      <Button title="Pick PDF" onPress={pickDocument} disabled={uploading} />
      {/* <Studentcamera/> */}
    </View>
  )
}