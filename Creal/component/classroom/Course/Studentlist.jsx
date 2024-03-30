import { View, Text,TextInput,Button,TouchableOpacity,ImageBackground,StyleSheet,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import Background from '../../../Image/back.png'


export default function Studentlist({route}) {
  const { details } = route.params;
  const [value, setValue] = useState()
  const [todos, setTodos] = useState([]);


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

        <Text style={styles.classname} >{details.class} </Text>
        <Text style={styles.classtext} > {details.course}</Text>
               <View style={styles.buttoncopy}>

        <TouchableOpacity  style={styles.button}>
                <Text style={styles.copy}>
                copy class code
                  
                </Text>
               </TouchableOpacity>
               <TouchableOpacity  style={styles.button}>
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


      {/* {note && note.map((item,index)=>(
        <Text key={index}>{item.email}  {item.date} {item.time} {item.textes} </Text>
        ))} */}
        {/* <TextInput
      placeholder='add some notes'
      value={textes}
      onChangeText={handleChangeText}
      /> */}
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