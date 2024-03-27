import { View, Text,TouchableOpacity,StyleSheet,Button,TextInput } from 'react-native'
import React,{useState,useEffect} from 'react'
import {auth, firebase,firebaseConfig} from '../../../firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
import * as Clipboard from 'expo-clipboard';
export default function Coursedetails({route}) {
  const [textes,settext]= useState()
  const [note,setnote] = useState([])
  const { details } = route.params;
  const id = details.id
  console.log(id)
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(details.classCode);
  };

useEffect(()=>{
  fetchnotes(id)
},[])
const currentDate = new Date();

const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1; 
const currentDay = currentDate.getDate();
const currentHour = currentDate.getHours();
const currentMinute = currentDate.getMinutes();
const date = currentDay + "/" + currentMonth + "/" + currentYear
const time = currentHour + ":" + currentMinute

  const fetchnotes=(Id)=>{
    const currentUser = firebase.auth().currentUser;
    const uid= currentUser.email
    try{
      firebase.firestore().collection('ClassCreateByAdmin').doc(Id).collection('massages').onSnapshot(snapshot => {
        const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // console.log(todosData)
        setnote(todosData)

      });
    }catch(err){

    }
  }
  const replyhandle=async(Id)=>{
    const currentUser = firebase.auth().currentUser;
    const uid= currentUser.email
    try{

      const ref= firebase.firestore().collection('ClassCreateByAdmin').doc(Id).collection('massages')
      await ref.add({
        email:uid,
        textes,
        date,
        time
      });
      settext('')
    }catch(err){

    }
  }
  const handleChangeText = (inputText) => {
    settext(inputText);
  };

  return (
    <View>
      <TouchableOpacity style={styles.class} >
<Text style={styles.classtext} >{details.class} {details.id}</Text>
<Button title="copy tId,claso classcode" onPress={copyToClipboard} />
</TouchableOpacity>
{note && note.map((item,index)=>(
        <Text key={index}>{item.email}  {item.date} {item.time} {item.textes} </Text>
        ))}
        <TextInput
      placeholder='add some notes'
      value={textes}
      onChangeText={handleChangeText}
      />
      <Button title='add' onPress={()=>replyhandle(id)}/>
 
    </View>
  )
}
const styles = StyleSheet.create({

  class:{
    height:100,
    width:'94%',
    backgroundColor:'#13344A',
    borderRadius:10,
    // marginBottom:10,
    marginTop:10,
    padding:20
  },
  classtext:{
    color:'white'
  }
});