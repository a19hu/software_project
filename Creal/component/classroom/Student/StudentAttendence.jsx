import { View, Text } from 'react-native'
import React,{ useState,useEffect } from 'react'
import {firebase,firebaseConfig} from '../../../firebase'
import { getStorage,ref,getDownloadURL } from 'firebase/storage';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default function StudentAttendence() {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    const fun =async()=>{
      const storage = getStorage()
      console.log('done2')
      const reference = ref(storage,'/Image8.jpg')
      console.loga('done3')
      await getDownloadURL(reference) .then(url => {
        setImageUrl(url);
        console.log('url',url)
      })
    }
  fun()
    // const storageRef = firebase.storage().ref().child('gs://instgram-demo-95594.appspot.com'); 

    // storageRef.getDownloadURL()
    //   .then(url => {
    //     setImageUrl(url);
    //   })
    //   .catch(error => {
    //     console.error('Error getting download URL:', error);
    //   });
    console.log('image',imageUrl)
  }, []);

  return (
    <View>
      <Text>StudentAttendence</Text>
    </View>
  )
}