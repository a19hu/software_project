import { View, Text,TextInput,Button,StyleSheet,Image  ,TouchableOpacity,ToastAndroid,ImageBackground,} from 'react-native'
import React,{useState} from 'react'
import { Feather } from '@expo/vector-icons';
import {  getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import Background from '../../../Image/back.png'
import logoadd from '../../../Image/logoadd.png'
const auth = getAuth();
import { ref, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as DocumentPicker from 'expo-document-picker';
import defaultimage from '../../../Image/default.png'
export default function SighUp({ navigation }) {
    const [eye,seteye]=useState(true)
    const [fileName, setFileName] = useState('');
    const [blobFile, setBlobFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageuri, setimageuri] = useState(null);
    const handleeye=()=>{
      seteye(!eye)
    }
    const [value, setValue] = useState({
      name:'',
      rollnumber:'',
        email: '',
        password: '',
        error: ''
      })
      const signUp=async()=> {
        console.log('value',value)
        if (value.email === '' || value.password === '' || value.name === '' ) {
          ToastAndroid.show('value.error', ToastAndroid.SHORT);
          setValue({
            ...value,
            error: 'Email and password are mandatory.'
          })
  
          return;
        }
    
        try {
          console.log('press2')
          const userCredential  = await createUserWithEmailAndPassword(auth, value.email, value.password);
          const user = userCredential.user;
          await updateProfile(user, { displayName: username });
          console.log("User registered successfully:", user);
          console.log('press1')
          setValue('')
          navigation.navigate('SignIn');
          return user;
          } catch (error) {
            setValue({
              ...value,
              error: error.message,
            })
            console.log('error',error)
            ToastAndroid.show(value.error, ToastAndroid.SHORT);
             
          }
        }
        const pickDocument = async () => {
          try {
                let result = await DocumentPicker.getDocumentAsync({type:'image/*'});
                if (result !=null ) {
                    const response = await fetch(result.assets[0].uri);
                    const blob = await response.blob();
                    setFileName(result.assets[0].name);
                    setimageuri(result.assets[0].uri)
                    setBlobFile(blob);
                    console.log('sucess full')
                }
            } catch (error) {
                console.log('Error picking document:', error);
            }
      
        };
        const uploadFile = async () => {
          try {
              if (!blobFile) return;
    
              setUploading(true);
              const storageRef = ref(storage, `myDocs/${fileName}`);
              const uploadTask = uploadBytesResumable(storageRef, blobFile);
    
              uploadTask.on(
                  "state_changed",
                  null,
                  (error) => {
                      console.error("Error uploading file:", error);
                      setUploading(false);
                  },
                  () => {
                      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                          console.log("File available at", downloadURL);
                          setUploading(false);
                        });
                      }
                      );
                    } catch (error) {
              console.error("Error uploading file:", error);
              setUploading(false);
            }}
  return (
    <ImageBackground
            source={Background}
            style={styles.background}
        >
    <View style={styles.container}>
    <View style={styles.styletop}>
                    <Image source={logoadd} style={styles.logo} />
                    <Text style={styles.heading}>Welcome</Text>
                    <Text style={styles.heading}> Aboard!</Text>

                </View>


                <View style={styles.styledown}>

<View style={[styles.layer, styles.layer1]} >
<View  >
<TextInput
        style={styles.inputs}
 placeholderTextColor='#E0E3FF'
      placeholder='Name'
      value={value.name}
      onChangeText={(text) => setValue({ ...value, name: text })}
      />
       <TextInput
        style={styles.inputs}
 placeholderTextColor='#E0E3FF'
      placeholder='Roll number*(Optional)'
      value={value.rollnumber}
      onChangeText={(text) => setValue({ ...value, rollnumber: text })}
      />
     <TextInput
      style={styles.inputs}
      placeholder='Enter your Email ID'
      placeholderTextColor='#E0E3FF'
      value={value.email}
      onChangeText={(text) => setValue({ ...value, email: text })}
      />
      
      <View style={styles.inputContainer}>

      <TextInput
 style={styles.input}
 placeholder='Password'
 placeholderTextColor='#E0E3FF'
 secureTextEntry={eye} 
 value={value.password}
 onChangeText={(text) => setValue({ ...value, password: text })}
/>
{eye?

<Feather name="eye-off" size={22} color="#374082" onPress={handleeye} style={styles.icon}/>
:

<Feather name="eye" size={22} color="#374082" onPress={handleeye} style={styles.icon}/>
}
</View>
        </View>
    <View style={styles.buttongroup}>

    <TouchableOpacity style={styles.button} onPress={signUp}>
    <Text style={styles.buttontext}>Sign Up</Text>
   </TouchableOpacity>
   </View>
    </View>  
    </View>     
    </View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  inputs:{
      borderColor:'#374082',
      borderWidth:2,
      borderRadius:27,
      padding:13,
      width:340,
      marginTop:10,
      color:'#E0E3FF'
  },
  icon:{
    position:'absolute',
    right:18,
    top:35
  },
  input:{
    borderColor:'#374082',
    borderWidth:2,
    borderRadius:27,
    padding:13,
    width:340,
    flexDirection:'row',
    marginTop:20,
    color:'#E0E3FF'


  },

  container: {
      flex: 1,
      // justifyContent: 'center',
      alignItems: 'center',
  },
  background: {
      backgroundColor: '#121636',
      flex: 1,
      height: '50%',
      width: '100%',
      // justifyContent: 'center',
      zIndex: -1,
  },
  top: {
      backgroundColor: 'red'
  },
  layer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 500,
      borderTopRightRadius: 500,
      alignItems: 'center',

  },
  layer1: {
      backgroundColor: '#6E77BA',
      height: '100%',
      zIndex: 1,
      paddingTop:60

  },
  layer2: {
      backgroundColor: '#434C96',
      zIndex: 2,
      height: '100%',
      width: '100%',
      top: '30%',
      left: 0,
      paddingTop:60
  },
  styledown: {
      position: 'absolute',
      bottom: 0,
      width: 740,

      height: '54%',

  },
  styletop: {
      // flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      zIndex: 100,
      top: 110
  },
  heading: {
      color: 'white',
      fontSize: 57,
      fontWeight:'700',

  },
  logo: {
      height: 100,
      width: 130,
      alignItems: 'center',
      marginLeft:25


  },
  button:{
      backgroundColor:'#374082',
      padding:10,
      borderRadius:10,
      borderRadius:50,
      zIndex: 10,
      padding:10,
      width:180,
      justifyContent: 'center',
      alignItems:'center',
 margin:8
  },
  buttonSign:{
      borderColor:'#B1B7EE',
      borderWidth:2,
      padding:10,
      borderRadius:10,
      borderRadius:50,
      zIndex: 10,
      padding:10,
      width:180,
      justifyContent: 'center',
      alignItems:'center',
 margin:8
  },
  buttontextSign:{
      color:'#B1B7EE',
      fontWeight:'700',
      fontSize:20
  },
  buttontext:{
      color:'#E0E3FF',
      fontWeight:'700',
      fontSize:20
  },
  buttongroup:{
      width:500,
      alignItems: 'center',
      marginTop:40
  }
});
