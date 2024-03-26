import { View, Text,Button,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import {auth, firebase,firebaseConfig} from '../../../firebase'
import { where } from '@firebase/firestore';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default function Studentcoursedet({route}) {
  const { studentdetails } = route.params;
  const [textes,settext]= useState()
  const [note,setnote] = useState([])
  const id =studentdetails.id
 useEffect(()=>{
  fetchmassage(id)

 },[])
 const currentDate = new Date();

 const currentYear = currentDate.getFullYear();
 const currentMonth = currentDate.getMonth() + 1; 
 const currentDay = currentDate.getDate();
 const currentHour = currentDate.getHours();
 const currentMinute = currentDate.getMinutes();
 const date = currentDay + "/" + currentMonth + "/" + currentYear
 const time = currentHour + ":" + currentMinute

 const handleChangeText = (inputText) => {
  settext(inputText);
};
   const fetchmassage=(Id)=>{
    const currentUser = firebase.auth().currentUser;
    const uid= currentUser.email
    try{
      firebase.firestore().collection('ClassCreateByAdmin').doc(Id).collection('massages').where('email', '==', uid).onSnapshot(snapshot => {
        const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(todosData)
        setnote(todosData)
      });
    }catch(err){

    }
      
   }

  const hadleIncourse=async(Id)=>{
    const currentUser = firebase.auth().currentUser;
    const uid= currentUser.email
    console.log('text',textes)
    try{

      const ref= firebase.firestore().collection('ClassCreateByAdmin').doc(Id).collection('massages');
      await ref.add({
        email:uid,
        textes,
        // markedAt: firebase.firestore.FieldValue.serverTimestamp(),
        date,
        time
      });

    }catch(err){
      console.log(err)
    }

  }

  return (
    <View>
      <Text>{studentdetails.email}</Text>
      <Text>{studentdetails.class}</Text>
      <Text>{studentdetails.course}</Text>
      <Text>{studentdetails.classCode}</Text>
      <Text>{studentdetails.id}</Text>
      <TextInput
      placeholder='add some notes'
      value={textes}
      onChangeText={handleChangeText}
      />

      <Button title='add' onPress={()=>hadleIncourse(id)}/>
      {note && note.map((item,index)=>(
        <Text key={index}>{item.email}  {item.date} {item.time} {item.textes} </Text>
        ))}
 
    </View>
  )
}