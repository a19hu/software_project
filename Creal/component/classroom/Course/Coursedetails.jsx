import { View, Text,TouchableOpacity,StyleSheet,Button } from 'react-native'
import React,{useState} from 'react'
import * as Clipboard from 'expo-clipboard';
export default function Coursedetails({route}) {

  const { details } = route.params;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(details.classCode);
  };






  
  return (
    <View>
      <TouchableOpacity style={styles.class} >
<Text style={styles.classtext} >{details.class} {details.id}</Text>
<Button title="copy tId,claso classcode" onPress={copyToClipboard} />
</TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({

  class:{
    height:100,
    width:'94%',
    backgroundColor:'#13344A',
    borderRadius:10,
    // marginBottom:10,
    marginTop:10,
    padding:20
  },
  classtext:{
    color:'white'
  }
});