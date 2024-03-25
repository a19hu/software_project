import { View, Text,TextInput,Button,StyleSheet,Image  ,TouchableOpacity,ToastAndroid,} from 'react-native'
import React,{useState} from 'react'
import { Feather } from '@expo/vector-icons';
import {  createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../../firebase'
import login from '../../../Image/login.png'
export default function SighUp({ navigation }) {
    const [eye,seteye]=useState(true)
    const handleeye=()=>{
      seteye(!eye)
    }
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: ''
      })
      const signUp=async()=> {
        if (value.email === '' || value.password === '' ) {
          setValue({
            ...value,
            error: 'Email and password are mandatory.'
          })
          ToastAndroid.show(value.error, ToastAndroid.SHORT);

          return;
        }
    
        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
            navigation.navigate('SignIn');
          } catch (error) {
            setValue({
              ...value,
              error: error.message,
            })
            ToastAndroid.show(value.error, ToastAndroid.SHORT);
          }
        }
  return (
    <View style={styles.container}>
        <View
        style={styles.upcontainer}
        >
            <Image source={login} style={{ width: 350, height: 350 }}/>
        </View>
        <View
        style={styles.downcontainer}
        >
   <Text  style={styles.heading}>SignUp</Text>
   
     <TextInput
        style={styles.inputs}
      placeholder='Email'
      value={value.email}
      onChangeText={(text) => setValue({ ...value, email: text })}
      />
      <View style={styles.inputContainer}>

      <TextInput
        style={styles.input}
       placeholder='Password'
       secureTextEntry={eye} 
       value={value.password}
       onChangeText={(text) => setValue({ ...value, password: text })}
      />
      {eye?
      
      <Feather name="eye-off" size={18} color="black" onPress={handleeye}/>
    :

      <Feather name="eye" size={22} color="black" onPress={handleeye} />
    }
    </View>
      
      <TouchableOpacity style={styles.button} onPress={signUp}  >
        <Text style={styles.buttontext}>SignUp</Text>
      </TouchableOpacity>
      <Text>Already account

            <TouchableOpacity  onPress={() => navigation.navigate('SignIn')}  >
        <Text style={styles.buttontextup}>Login</Text>
      </TouchableOpacity>
        </Text>
        
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor:'#13344A',
        backgroundColor: '#1BAB7D',
        borderWidth:1,
        width:'70%',
        padding:10,
        marginTop:10,
        marginBottom:10,
    borderRadius:10
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    // height: 40,
  },
    container: {
        flex: 1,
        backgroundColor: '#1BAB7D',
      },
      upcontainer:{
       height:'40%',
       width:'100%',
       borderTopLeftRadius: 0, 
    borderTopRightRadius: 0, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
      },
      downcontainer:{
        alignItems: 'center',
        // justifyContent: 'center',
       height:'60%',
    backgroundColor: '#fff',
       width:'100%',
       borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    borderBottomLeftRadius: 0, 
    borderBottomRightRadius: 0,
      },
      button:{
        backgroundColor:'#13344A',
        width:'70%',
        alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    borderRadius:10,
    marginTop:10,
    fontWeight:'900',
    fontSize:40,
    marginBottom:10


      },
      buttontext:{
        fontWeight:'700',
        fontSize:17,
        color:'white'
      },
      heading:{
        fontSize:40,
        fontWeight:'900',
        marginTop:20,
        marginBottom:50
      },
      inputs:{
        borderColor:'#13344A',
        backgroundColor: '#1BAB7D',
        borderWidth:1,
        width:'70%',
        padding:10,
        marginTop:10,
        marginBottom:10,
    borderRadius:10


      },
      buttontextup:{
        color:'blue',
        textDecorationLine:'underline',
        marginLeft:4,
        marginRight:4,
        paddingRight:4,
        paddingLeft:4
      }
});