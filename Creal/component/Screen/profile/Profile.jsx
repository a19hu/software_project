import { View, Text, Button, StyleSheet, Image,ImageBackground,  TouchableOpacity } from 'react-native'
import React from 'react'
import { getAuth, signOut } from 'firebase/auth';
import { useAuthentication } from '../../utils/useAuthentication';
import defaultimage from '../../../Image/default.png'
import * as Clipboard from 'expo-clipboard';
import { FontAwesome6 } from '@expo/vector-icons';
import Background from '../../../Image/back.png'

const auth = getAuth();
export default function Profile() {
  const { user } = useAuthentication();
  const copyToClipboardUSER = async (id) => {
    await Clipboard.setStringAsync(id);
  };
  return (
    <ImageBackground
            source={Background}
            style={styles.background}
            resizeMode='repeat'
        >
    <View style={styles.container}>
      <View style={styles.imageconmtainer}>
        <Image source={defaultimage} style={styles.image} />
      </View>
      <View style={styles.info}>

        <Text>Email: {user?.email}!</Text>
        <View style={styles.useerrid}>
        <Text>UserId: </Text>
      <View style={styles.useerid}>
        <Text> {user?.uid}</Text>
        <FontAwesome6 name="copy" size={24} color="black"  onPress={()=>copyToClipboardUSER(user?.uid)}/>

      </View>
        </View>

      </View>
      <View style={styles.buttonconmtainer}>

        <TouchableOpacity onPress={() => signOut(auth)} style={styles.signout}>
          <Text style={{ color: 'white' }}>
            Sign out
          </Text>
        </TouchableOpacity>
      </View>

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
  container: {

    height: '100%'
  },
  info:{
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
    backgroundColor:'#808080',
    padding:10,
    color:'white',
    // width:'80%',
    
  },
  useerrid:{
    flexDirection:'row'
  },
  useerid:{
    flexDirection:'row',
    borderColor:'black',
    backgroundColor:'white',
    borderRadius:20,
    margin:10
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 150,
    borderColor: 'black',
    borderWidth: 1
  },
  imageconmtainer: {
    // flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonconmtainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    position: 'relative',
    bottom: 0

  },
  signout: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: 40
  }
});