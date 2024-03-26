import { View, SafeAreaView, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AddClass from '../../classroom/Add/AddClass';
import { firebase, firebaseConfig } from '../../../firebase'
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Home({route }) {
  const [todos, setTodos] = useState([]);
  const [classjoin,setclassjoin]=useState([])
  const [code,setcode]= useState([])
  const { classid,setdetails,setstuydentdetails} = route.params;
  // console.log('code',code)
  // const classid= 'fjqSdJD7lV3I7b9s1Q2w'
  // console.log('id',classid)

  useEffect(() => {
    
    joinclass()
    unsubscribe()
  }, []);
  useEffect(()=>{
    if (code.length > 0) {
      code.forEach(codeItem => {
  // console.log(codeItem.classcode)
    classSnapshot(codeItem.classcode);

      })
    }
  },[code])
  const unsubscribe=()=>{
    const currentUser = firebase.auth().currentUser;
    firebase.firestore().collection('ClassCreateByAdmin').where('userId', '==', currentUser.uid).onSnapshot(snapshot => {
      const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTodos(todosData);
    });
  }
  const joinclass=()=>{
    const currentUser = firebase.auth().currentUser;
    firebase.firestore().collection('studentclasscode').where('userId', '==', currentUser.uid).onSnapshot(snapshot => {
      const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // setTodos(todosData);
      // console.log('joindata',todosData)
      setcode(todosData)
    });
  }
  const classSnapshot = (classcodeid)=>{
    // firebase.firestore().collection('ClassCreateByAdmin').doc(classid).collection('students').onSnapshot(snapshot => {
    //   const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   console.log('data',todosData)
    // });
    firebase.firestore().collection('ClassCreateByAdmin').where('classCode', '==', classcodeid).onSnapshot(snapshot => {
      const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // console.log('join1',todosData)
      setclassjoin(todosData)
    });
  }
  
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const handlecourse = async (Id, classname, coursename,classcode) => {
    try {

      await setdetails({
        id: Id,
        class: classname,
        course: coursename,
        classCode:classcode
      })
      navigation.navigate('Bottomstudent')
    } catch (error) {

    }
  }
  const hadlestudentcourse=async(Id, classname, coursename,classcode,email)=>{
    navigation.navigate('ClassStudent')
    try {

      await setstuydentdetails({
        id: Id,
        class: classname,
        course: coursename,
        classCode:classcode,
        email:email
      })
    } catch (error) {

    }
  }
  const handleRemoveTodo = (docId) => {
    firebase.firestore().collection('ClassCreateByAdmin').doc(docId).delete()
      .then(() => {
        console.log('Todo removed successfully');
      })
      .catch(error => console.error('Error removing todo: ', error));
       
  };
  const handleRemovestudentclass = (docId) => {
    firebase.firestore().collection('studentclasscode').doc(docId).delete()
      .then(() => {
        console.log('Todo removed successfully');
      })
      .catch(error => console.error('Error removing todo: ', error));
       
  };
  return (
    <>
      <Ionicons name="add-circle" size={70} color="#1BAB7D" style={styles.add} onPress={() => setModalVisible(true)} />
      <ScrollView style={styles.container}>

        <View style={styles.classcontainer}>

          {todos && todos.map((item, index) => (
            <TouchableOpacity style={styles.class} key={item.id} onPress={() => handlecourse(item.id, item.class, item.course,item.classCode)}>
 <Button
        title='Remove '
        onPress={() => handleRemoveTodo(item.id)}
      />
              <Text style={styles.classtext}>admin</Text>
              <Text style={styles.classtext} key={index}>{item.course} {item.classCode}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.classcontainer} >
          {classjoin && classjoin.map((item,index)=>(

          <TouchableOpacity style={styles.class} key={index} onPress={() => hadlestudentcourse(item.id,item.class,item.course,item.classCode,item.email)}>
 <Button
        title='Remove '
        onPress={() => handleRemovestudentclass(item.id)}
      />
            <Text style={styles.classtext}>student</Text>
            <Text style={styles.classtext} >{item.classCode}</Text>
          </TouchableOpacity>
          ))}
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
  },
  add: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 100
  },
  class: {
    height: 100,
    width: '94%',
    backgroundColor: '#13344A',
    borderRadius: 10,
    // marginBottom:10,
    marginTop: 10,
    padding: 20
  },
  classcontainer: {
    // paddingTop:20,
    // flex:1,
    // justifyContent:'center',
    alignItems: 'center',
    position: 'relative'
  },
  classtext: {
    color: 'white'
  }
});