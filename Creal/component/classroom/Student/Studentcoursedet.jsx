import { View, Text, TouchableOpacity, StyleSheet,ImageBackground, Button, TextInput,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { collection, doc, onSnapshot, query, where, getDocs, getDocFromCache, setDoc, addDoc, push, ref } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from '../../../firebase'
const auth = getAuth();
import Background from '../../../Image/back.png'

export default function Studentcoursedet({route,navigation}) {
  const { Id, classname, coursename, classcode, email } = route.params;
  const [textes,settext]= useState('')
  const [cameradisplay,setcameradisplay]=useState(true)
  const [timeout,settimeout]=useState('hii')
  const [notestudent,setnotestudent] = useState([])
  const [noteadmin,setnoteadmin] = useState([])
  const durationInMinutes=1
 useEffect(()=>{
  fetchmassage()
  fetchmassageAdmin()
    // startCountdown(durationInMinutes);


 },[])

 
//  useEffect(() => {
//   const displayDuration = durationInMinutes * 6 * 1000;

//   const timer = setTimeout(() => {
//     setcameradisplay(false);
//   }, displayDuration);

//   return () => clearTimeout(timer);
// }, []);
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
   const fetchmassage=async()=>{
    const user= auth.currentUser;
    try {
      const q = query(collection(db, 'ClassCreateByAdmin', Id, 'massages'),where('email', '==', user.email));
      const snapshot = await getDocs(q);
      const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setnotestudent(todosData);
    }catch(err){
  console.log('error',err)
    }
      
   }
   const fetchmassageAdmin=async(id)=>{
    try {
      const q = query(collection(db, 'ClassCreateByAdmin', Id, 'massages'),where('email', '==', email));
      const snapshot = await getDocs(q);
      const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
       setnoteadmin(todosData);
      
      
    }catch(err){
  console.log(err)
    }
      
   }

  const hadleIncourse=async()=>{
    const user = auth.currentUser;
    try {
      const q = query(collection(db, "ClassCreateByAdmin"), where('classCode', '==', classcode));
      const snapshot = await getDocs(q);
      const classDoc = snapshot.docs[0];
      const studentDocRef = await addDoc(collection(classDoc.ref, "massages"), {
        email: user.email,
        textes,
        date,
        time
      });
      settext('')
    } catch (error) {
      console.error('Error joining class: ', error);
    }

  }
  // function startCountdown(durationInMinutes) {
  //   const targetDate = new Date();
  //     targetDate.setMinutes(targetDate.getMinutes() + durationInMinutes);
  //     const interval = setInterval(() => {
  //       const now = new Date().getTime();
  //       const distance = targetDate - now;
  //       if (distance <= 0) {
  //         clearInterval(interval); 
  //         settimeout('Countdown is over');
  //       setcameradisplay(true)

  //         return;
  //       }
  //       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //       const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  //       setcameradisplay(false)
  //       settimeout(`${minutes}m ${seconds}s`)
  //     }, 1000); 
  //   }
  
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
      </ImageBackground>
        </View>
      <View style={styles.camera}>
        <Text style={styles.input}>Timer : {timeout}</Text>
   <TouchableOpacity  style={styles.button} onPress={()=> navigation.navigate('studentcamera',timeout)}>
                <Text style={styles.copy}>
                Camera open
                </Text>
               </TouchableOpacity>

      </View>


      </View>
      <ScrollView>
      <View style={styles.containersmallnote}>
  
      

      {noteadmin && noteadmin.map((item,index)=>(
        <Text key={index}>{item.email}  {item.date} {item.time} {item.textes} </Text>
        ))}
        {notestudent && notestudent.map((item,index)=>(
        <Text key={index}>{item.email}  {item.date} {item.time} {item.textes} </Text>
        ))}


        <TextInput
      placeholder='add some notes'
      value={textes}
      onChangeText={handleChangeText}
      />
      <Button title='add' 
      onPress={()=>hadleIncourse()}
      
      />
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