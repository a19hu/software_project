import { View, Text, TextInput, Button, TouchableOpacity, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import Background from '../../../Image/back.png'
import { db } from '../../../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth();
import firebase from 'firebase/app';
import { collection, query, where, getDocs,doc } from "firebase/firestore";
export default function Studentlist({ route,navigation }) {
  const { Id, classname, coursename, classcode, userId } = route.params;
  const [todos, setTodos] = useState([]);
  const [classjoin, setclassjoin] = useState([])
  useEffect(() => {
    const datafetching =async()=>{
      const user = auth.currentUser;
      try {
        const q = await getDocs(collection(db, "ClassCreateByAdmin",Id,'students'))
        const todosData = q.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTodos(todosData);
        const querySnapshot = await getDocs(collection(db, "ClassCreateByAdmin",Id,'Ta'))
        const studentSnapshot = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setclassjoin(studentSnapshot);
      } catch (error) {
      }

    
     }
     datafetching()
    
  }, []);

  const handleemail = (id) => {
    navigation.navigate('email', {id,Id, classname, coursename, classcode, userId})
  }

  return (
    <ImageBackground
      source={Background}
      style={styles.background}
      resizeMode='repeat'
    >
      <ScrollView>


        <View style={styles.container}>
          <View style={styles.info}>
            <ImageBackground
              source={Background}
              style={styles.backgroundinfo}
            >

              <Text style={styles.classname} >Teacher </Text>
              <TouchableOpacity style={styles.button} onPress={()=>handleemail(Id)}>
                <Text style={styles.copy}>
                  Add
                </Text>
              </TouchableOpacity>


            </ImageBackground>
          </View>


        </View>
        <View>
  {todos.map((todo) => (
    <View key={todo.id}>
      <Text>{todo.name}</Text>
    </View>
  ))}
        </View>

        <View style={styles.container}>
          <View style={styles.info}>
            <ImageBackground
              source={Background}
              style={styles.backgroundinfo}
            >

              <Text style={styles.classname} >Student </Text>
              <TouchableOpacity style={styles.button} onPress={()=>handleemail(classcode)}>
                <Text style={styles.copy}>
                  Add
                </Text>
              </TouchableOpacity>


            </ImageBackground>
          </View>


        </View>
        <View>
        {classjoin.map((todo) => (
    <View key={todo.id}>
      <Text>{todo.name}</Text>
    </View>
  ))}
        </View>


      </ScrollView>



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
    zIndex: 10,
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    flexDirection: 'row'

  },
  info: {
    height: 80,
    width: '100%',
    borderRadius: 20,
    marginTop: 20


  },

  container: {
    alignItems: 'center',

  },


  classname: {
    color: 'white',
    fontWeight: '900',
    fontSize: 27,
    textTransform: 'uppercase',
    marginTop: 10
  },

  button: {
    backgroundColor: '#121636',
    padding: 10,
    borderRadius: 50,
    borderColor: '#121636',
    width: '30%',
    borderWidth: 1,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    position: 'absolute',
    bottom: 0,
    right: 0
  },

  copy: {
    color: 'white',
    fontWeight: '700',
  },


});