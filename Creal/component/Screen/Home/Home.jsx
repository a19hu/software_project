import { View, SafeAreaView, Text,Button,StyleSheet,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AddClass from '../../classroom/Add/AddClass';
import {firebase,firebaseConfig} from '../../../firebase'
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Home({ route } ) {
  const [todos, setTodos] = useState([]);
  const {setdetails } = route.params;

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    const unsubscribe = firebase.firestore().collection('classcreate').where('userId', '==', currentUser.uid).onSnapshot(snapshot => {
      const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, [ ]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const  handlecourse=async(Id,classname,coursename)=>{
  try{

   await setdetails({id:Id,
      class:classname,
      course:coursename
      })
      navigation.navigate('Bottomstudent')
  }catch(error){

  }
}
  return (
    <>
<Ionicons name="add-circle" size={70} color="#1BAB7D" style={styles.add} onPress={() => setModalVisible(true)}/>
   <ScrollView style={styles.container}>
    
 <View style={styles.classcontainer}>

 {todos && todos.map((item,index) => (
  <TouchableOpacity style={styles.class} key={item.id} onPress={()=>handlecourse(item.id,item.class,item.course)}>

<Text style={styles.classtext}>admin</Text>
   <Text style={styles.classtext} key={index}>{item.course} {item.class}</Text>
  </TouchableOpacity>
     ))}
 </View>
 <View style={styles.classcontainer} >
 <TouchableOpacity style={styles.class} onPress={()=>navigation.navigate('ClassStudent')}>

<Text style={styles.classtext}>student</Text>
   <Text style={styles.classtext} ></Text>
  </TouchableOpacity>
 </View>
      <AddClass
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
     />
    
   </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:500
    // height:"100%"
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#fff', // Adjust as needed
  },
  add:{
    position:'absolute',
    bottom:10,
    right:10,
    zIndex:100
  },
  class:{
    height:100,
    width:'94%',
    backgroundColor:'#13344A',
    borderRadius:10,
    // marginBottom:10,
    marginTop:10,
    padding:20
  },
  classcontainer:{
    // paddingTop:20,
    // flex:1,
    // justifyContent:'center',
     alignItems:'center',
     position:'relative'
  },
  classtext:{
    color:'white'
  }
});