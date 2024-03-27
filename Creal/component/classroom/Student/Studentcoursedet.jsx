import { View, Text,Button,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import {auth, firebase,firebaseConfig} from '../../../firebase'
import { query, where } from '@firebase/firestore';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default function Studentcoursedet({route,navigation}) {
  const { studentdetails } = route.params;
  const [textes,settext]= useState()
  const [notestudent,setnotestudent] = useState([])
  const [noteadmin,setnoteadmin] = useState([])
  const id =studentdetails.id
  const adminemail= studentdetails.email
 useEffect(()=>{
  fetchmassage(id)
  fetchmassageAdmin(id)

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
        // console.log('student',todosData)
        setnotestudent(todosData)
      });
    }catch(err){

    }
      
   }
   const fetchmassageAdmin=()=>{
    try{
      firebase.firestore().collection('ClassCreateByAdmin').get()
      .then(QuerySnapshot=>{
        QuerySnapshot.forEach(classdoc=>{
          firebase.firestore().collection('ClassCreateByAdmin').doc(classdoc.id).collection('massages').where('email', '==', adminemail).onSnapshot(saapshot=>{
            const todosData = saapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setnoteadmin(todosData)
          })
          
        })
        }
      )
      
    }catch(err){

    }
      
   }

  const hadleIncourse=async(Id)=>{
    console.log('id',Id)
    const currentUser = firebase.auth().currentUser;
    const uid= currentUser.email
    console.log('text',textes)
    try{

      const ref= firebase.firestore().collection('ClassCreateByAdmin').doc(Id).collection('massages');
      await ref.add({
        email:uid,
        textes,
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
      {noteadmin && noteadmin.map((item,index)=>(
        <Text key={index}>{item.email}  {item.date} {item.time} {item.textes} </Text>
        ))}
        {notestudent && notestudent.map((item,index)=>(
        <Text key={index}>{item.email}  {item.date} {item.time} {item.textes} </Text>
        ))}
 <Button title='camera' onPress={()=> navigation.navigate('studentcamera')}
//  disabled={true}
 />
    </View>
  )
}