import { View, SafeAreaView, Text, Button, StyleSheet, TouchableOpacity, ImageBackground,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
import firebase from 'firebase/app';
import { collection, query, where, getDocs,doc } from "firebase/firestore";
import AddTa from './AddTa';
import Background from '../../../Image/back.png'

export default function HomeTA({ route }) {
    // const { setdetails} = route.params;
  const [classjoin, setclassjoin] = useState([])
  console.log(classjoin)
  const classJoinData = [];

  useEffect(() => {
    const fetchStudentClasses = async () => {
      const user = auth.currentUser;
      try{
        const querySnapshot = await getDocs(collection(db, 'ClassCreateByAdmin'));
        const classQueries = querySnapshot.docs.map(async (classdoc) => {
          const studentSnapshot = await getDocs(query(collection(classdoc.ref, 'Ta'), where('name', '==', user.email)));
          const todosData = studentSnapshot.docs.map((doc) => ({
            id: classdoc.id,
            ...classdoc.data(),
          }));
          classJoinData.push(...todosData);
        });
        await Promise.all(classQueries);
        setclassjoin(classJoinData);
  
      }catch(error){
      }
    };

    fetchStudentClasses();

  }, []);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const hadlestudentcourse =  (Id, classname, coursename, classcode, userId) => {
    try {
      navigation.navigate('Bottomstudent',{Id, classname, coursename, classcode, userId})

      
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
      <Ionicons name="add-circle" size={70} color="white" style={styles.add} onPress={() => setModalVisible(true)} />
      <ImageBackground
            source={Background}
            style={styles.background}
            resizeMode='repeat'
        >
      <ScrollView >
      <View style={styles.classcontainer} >
  {classjoin && classjoin.map((item, index) => (
   <View
   style={styles.class}
   key={index}
   
   >
      <ImageBackground
    source={Background}
    style={styles.classimage}

>
    <TouchableOpacity  key={index} onPress={() => hadlestudentcourse(item.id, item.class, item.course, item.classCode, item.email)}>
      <View style={styles.rowContainer}>

        <Text style={styles.classtext} key={index}>{item.class.substring(0, 8)+'..'}</Text>
        <Feather name="more-vertical" size={24} color="white"
          style={styles.details}
          onPress={() => handleRemoveTodo(item.id)}
        />
      </View>
      <Text style={styles.classadminorstudent}>you Ta</Text>
      <Text style={styles.classcoures}>{item.course}</Text>
    </TouchableOpacity>
      </ImageBackground>
      </View>
  ))}
</View>


        <AddTa
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />

      </ScrollView>
      </ImageBackground>
    </>
  )
}
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  background: {
    backgroundColor: '#121636',
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: -1,
},
  classtext: {
    margin: 10,
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    textTransform:'uppercase'
  },
  classcoures: {
    marginLeft: 10,
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    textTransform: 'capitalize',
    marginTop: 60
  },
  classadminorstudent: {
    marginLeft: 10,
    color: 'white',
    fontSize: 13,
    textTransform: 'capitalize',
    marginTop: 13
  },
  details: {
    right: 10,
    position: 'absolute'
  },
 
  add: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 100
  },
  class: {
    height: 170,
    backgroundColor: '#ABB2EF',
    width: '45%', 
    margin: 10,
    borderRadius: 10,
  },
  classimage: {
    // padding:10,
    height: '100%',
    
  },
  classcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  notics:{
    color:'#ABB2EF',
    fontSize:25,
    fontWeight:'900',
    marginLeft:20
  }

});
