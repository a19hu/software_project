import { View, Text,Button,Image,Alert } from 'react-native'
import React,{useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import {firebase,firebaseConfig} from '../../../firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default function StudentLeave() {
    const [image, setImage] = useState(null);
    const [uploading,setUploading]= useState(false)
    
    const selectImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
    
          if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        } catch (error) {
          console.error('Error selecting image:', error);
          Alert.alert('Error', 'Failed to select image. Please try again.');
        }
      };
      const uploadImage = async () => {
        console.log('done1')
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function() {
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', image, true);
          xhr.send(null);
        })
        console.log('blob',blob)
        const ref = firebase.storage().ref().child(`Image8.jpg`)
        console.log('ref',ref)
        const snapshot = ref.put(blob)
        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            setUploading(true)
          },
          (error) => {
            setUploading(false)
            console.log(error)
            blob.close()
            return 
          },
          () => {
            snapshot.snapshot.ref.getDownloadURL().then((url) => {
              setUploading(false)
              console.log("Download URL: ", url)
              setImage(url)
              blob.close()
              return url
            })
          }
          )
      }
  return (
    <View>
      <Text>Studentcamera</Text>
      <Button title="Select Image" onPress={selectImage} />
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, marginBottom: 20 }} />}
      <Button title="Upload Image" onPress={uploadImage} />

    </View>
  )
}