import { View, Text,ImageBackground,StyleSheet } from 'react-native'
import React,{ useState,useEffect } from 'react'
import Background from '../../../Image/back.png'

// import {firebase,firebaseConfig} from '../../../firebase'
import { getStorage,ref,getDownloadURL } from 'firebase/storage';
// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }
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
    <ImageBackground
    source={Background}
    style={styles.background}
    resizeMode='repeat'
>
    <View>
      {/* <CalendarExample/> */}
      <Text>jrspo</Text>
    </View>
</ImageBackground>

  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#121636',
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: -1,
},
});