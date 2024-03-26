import { View, Text } from 'react-native'
import React,{ useState,useEffect } from 'react'
import {firebase,firebaseConfig} from '../../../firebase'
import { getStorage,ref,getDownloadURL } from 'firebase/storage';
import CalendarExample from './CalendarExample';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default function StudentAttendence() {
  const [imageUrl, setImageUrl] = useState(null);
  // useEffect(() => {
  //   const fun =async()=>{
  //     const storage = getStorage()
  //     console.log('done2')
  //     const reference = ref(storage,'/Image8.jpg')
  //     console.loga('done3')
  //     await getDownloadURL(reference) .then(url => {
  //       setImageUrl(url);
  //       console.log('url',url)
  //     })
  //   }
  // fun()
  // 
  //   console.log('image',imageUrl)
  // }, []);

  return (
    <View>
      <CalendarExample/>
    </View>
  )
}