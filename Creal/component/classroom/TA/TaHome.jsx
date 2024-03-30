import { View, SafeAreaView, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { firebase, firebaseConfig } from '../../../firebase'
import AddTa from './AddTa';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function TaHome({ route }) {
    const { setdetails} = route.params;
  const [classjoin, setclassjoin] = useState([])
  console.log('class',classjoin)
  useEffect(() => {
    const fetchStudentClasses = async () => {
      const currentUser = firebase.auth().currentUser;
      try{
          if (currentUser) {
      const email = currentUser.email;
    const classJoinData = [];
    const querySnapshot = await firebase.firestore().collection('ClassCreateByAdmin').get();

    const classQueries = querySnapshot.docs.map(async classdoc => {
      const studentSnapshot = await firebase.firestore().collection('ClassCreateByAdmin').doc(classdoc.id).collection('TA').where('name', '==', email).get();
      const todosData = studentSnapshot.docs.map(doc => ({  id: classdoc.id,...classdoc.data() }));
      classJoinData.push(...todosData);
    });

    await Promise.all(classQueries);
    setclassjoin(classJoinData);
  }
      }catch(error){
      }
    };

    fetchStudentClasses();

  }, []);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const hadlestudentcourse =  (Id, classname, coursename, classcode, email) => {
    try {
        navigation.navigate('ClassStudent')
      
       setstuydentdetails({
        id: Id,
        class: classname,
        course: coursename,
        classCode: classcode,
        email: email
      })
    } catch (error) {

    }
  }
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
        <View style={styles.classcontainer} >
          {classjoin && classjoin.map((item, index) => (

            <TouchableOpacity style={styles.class} key={index} onPress={() => hadlestudentcourse(item.id, item.class, item.course, item.classCode, item.email)}>
              <Button
                title='Remove '
                onPress={() => handleRemovestudentclass(item.id)}
              />
              <Text style={styles.classtext}>ta</Text>
              <Text style={styles.classtext} >{item.course} ---- {item.class}</Text>

            </TouchableOpacity>
          ))}
        </View>
        <AddTa
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