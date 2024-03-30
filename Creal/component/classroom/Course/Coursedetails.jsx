import { View, Text, TouchableOpacity, StyleSheet,ImageBackground, Button, TextInput,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../../../firebase'
import * as Clipboard from 'expo-clipboard';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
import Background from '../../../Image/back.png'
import { collection, doc, onSnapshot, query, where, getDocs, getDocFromCache, setDoc, addDoc, push,ref  } from "firebase/firestore";

export default function Coursedetails({ route }) {
  const [textes, settext] = useState()
  const [note, setnote] = useState([])
  const { Id, classname, coursename, classcode, userId } = route.params;
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(details.classCode);
  };
  const copyToClipboardUSER = async () => {
    await Clipboard.setStringAsync(details.userId);
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email;
        try {
          const q = collection(db, 'ClassCreateByAdmin', Id, 'massages');
          const snapshot = await getDocs(q);
          const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setnote(todosData);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    })
  }, []);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const date = currentDay + "/" + currentMonth + "/" + currentYear
  const time = currentHour + ":" + currentMinute

  const replyhandle = async (Id) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        try {
        //   await setDoc(doc(db, 'ClassCreateByAdmin', Id, 'massages'), {
        //     email: uid,
        // textes,
        // date,
        // time
        //   });
        const massagesCollectionRef = collection(db, 'ClassCreateByAdmin', Id, 'massages');
  await addDoc(massagesCollectionRef, {
    email: uid, 
    textes, 
    date,
    time 
  });
      settext('')
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    })
    
  }
  const handleChangeText = (inputText) => {
    settext(inputText);
  };

  return (
    <ImageBackground
            source={Background}
            style={styles.background}
            resizeMode='repeat'
        >
    <View style={styles.container}>
      <View style={styles.containersmall}>
        <View style={styles.info}>
    <ImageBackground
            source={Background}
            style={styles.backgroundinfo}
            >

        <Text style={styles.classname} >{classname} </Text>
        <Text style={styles.classtext} > {coursename}</Text>
               <View style={styles.buttoncopy}>

        <TouchableOpacity onPress={copyToClipboard} style={styles.button}>
                <Text style={styles.copy}>
                copy class code
                  
                </Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={copyToClipboardUSER} style={styles.button}>
                <Text style={styles.copy}>
                copy useid
                </Text>
               </TouchableOpacity>
               </View>
        
      </ImageBackground>
        </View>
      <View style={styles.camera}>
   <TextInput
   placeholder='add time'
   style={styles.input}
   />
   <TouchableOpacity style={styles.button}>
                <Text style={styles.copy}>
                Camera start
                </Text>
               </TouchableOpacity>

      </View>


      </View>
      <ScrollView>
      <View style={styles.containersmallnote}>


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
      </ScrollView>
 
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
backgroundinfo: {
  backgroundColor: '#ABB2EF',
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex:10,
    borderRadius: 20,
    padding:10,
    position:'absolute'

},
info:{
  height: 170,
  width:'100%',
  borderRadius: 20,


  
},

container:{
    alignItems:'center',

},
containersmall:{
  height: 250,
  width: '94%',
  backgroundColor: '#D0D5FF',
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20, 

},
  class: {
    backgroundColor: '#ABB2EF',
    padding: 20
  },
  classtext: {
    color: 'white',
    fontWeight:'700',
    fontSize: 20,
    marginTop:20
  },
  classname:{
    color: 'white',
    fontWeight:'900',
    fontSize: 27,
    textTransform:'uppercase',
    marginTop:10
  },
  buttoncopy:{
    flexDirection: 'row',
    position:'absolute',
    bottom: 0
  },
  button:{
    backgroundColor: '#121636',
    padding: 10,
    borderRadius: 50,
    borderColor: '#121636',
    width:'50%',
    borderWidth:1,
    margin:2,
    justifyContent:'center',
    alignItems:'center', 
  },
  input:{
    padding: 10,
    borderRadius: 50,
    borderColor: '#121636',
    width:'45%',
    borderWidth:1,
    marginLeft:12,
    justifyContent:'center',
    alignItems:'center', 
    marginBottom:5
  },
  copy:{
    color: 'white',
    fontWeight:'700',
  },
  camera:{
    flexDirection: 'row',
    position:'absolute',
    bottom: 0
  },
  containersmallnote:{
    height: 250,
  // width: '94%',
  backgroundColor: '#D0D5FF',
    borderRadius: 20,
    marginTop: 20,
    // marginBottom: 20, 
  }
});