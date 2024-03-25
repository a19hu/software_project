import { View, Text,TouchableOpacity,StyleSheet, } from 'react-native'
import React from 'react'

export default function Coursedetails({route}) {
  const { details } = route.params;
  return (
    <View>
      <TouchableOpacity style={styles.class} >


<Text style={styles.classtext} >{details.class} {details.id}</Text>
</TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  add:{
    position:'absolute',
    bottom:10,
    right:10,
    zIndex:100
  },
  class:{
    height:100,
    width:'94%',
    backgroundColor:'#13344A',
    borderRadius:10,
    // marginBottom:10,
    marginTop:10,
    padding:20
  },
  classcontainer:{
    // paddingTop:20,
    // flex:1,
    // justifyContent:'center',
     alignItems:'center',
     position:'relative'
  },
  classtext:{
    color:'white'
  }
});