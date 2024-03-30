import { View, Text,TextInput,Button,StyleSheet,Image  ,TouchableOpacity,ToastAndroid, ImageBackground,} from 'react-native'
import React,{useState} from 'react'
import { Feather } from '@expo/vector-icons';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth();
import Background from '../../../Image/back.png'
import logoadd from '../../../Image/logoadd.png'
export default function SignIn({ navigation }) {
    const [eye,seteye]=useState(true)
    const handleeye=()=>{
      seteye(!eye)
    }
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: ''
      })
      const signin=async()=> {
        if (value.email === '' || value.password === '') {
          setValue({
            ...value,
            error: 'Email and password are mandatory.'
          })
          ToastAndroid.show('please fill the input', ToastAndroid.SHORT);
          return;
        }
    
        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
            ToastAndroid.show('Login successfully!', ToastAndroid.SHORT);
          } catch (error) {
            setValue({
              ...value,
              error: error.message,
            })
          }
        }
  return (
    <ImageBackground
            source={Background}
            style={styles.background}
        >
    <View style={styles.container}>
    <View style={styles.styletop}>
                    <Image source={logoadd} style={styles.logo} />
                    <Text style={styles.heading}>Welcome</Text>
                    <Text style={styles.heading}> back!</Text>
                </View>
                <View style={styles.styledown}>

<View style={[styles.layer, styles.layer1]} />
<View style={[styles.layer, styles.layer2]} >
<View  >
     <TextInput
      style={styles.inputs}
      placeholder='Enter your Email ID'
      placeholderTextColor='#E0E3FF'
      value={value.email}
      onChangeText={(text) => setValue({ ...value, email: text })}
      />
      
      <View style={styles.inputContainer}>

      <TextInput
 placeholder='Password'
 style={styles.input}
 placeholderTextColor='#E0E3FF'
 secureTextEntry={eye} 
 value={value.password}
 onChangeText={(text) => setValue({ ...value, password: text })}
/>
{eye?

<Feather name="eye-off" size={22} color="#B1B7EE" onPress={handleeye} style={styles.icon}/>
:

<Feather name="eye" size={22} color="#B1B7EE" onPress={handleeye} style={styles.icon}/>
}
</View>
        </View>
    <View style={styles.buttongroup}>

    <TouchableOpacity style={styles.button} onPress={signin}>
    <Text style={styles.buttontext}>Log In</Text>
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
      borderColor:'#B1B7EE',
      borderWidth:2,
      borderRadius:27,
      padding:13,
      width:340,
      marginTop:10,
      color:'#B1B7EE'
  },
  icon:{
    position:'absolute',
    right:18,
    top:35
  },
  input:{
    borderColor:'#B1B7EE',
    borderWidth:2,
    borderRadius:27,
    padding:13,
    width:340,
    flexDirection:'row',
    marginTop:20,
    color:'#B1B7EE'


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
      backgroundColor:'#B1B7EE',
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
      color:'#21316C',
      fontWeight:'700',
      fontSize:20
  },
  buttongroup:{
      width:500,
      alignItems: 'center',
      marginTop:40
  }
});

