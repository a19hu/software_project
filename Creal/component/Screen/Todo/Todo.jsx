import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Todo() {
  return (
    <View style={styles.container}>
      <Ionicons name="add-circle" size={70} color="#1BAB7D" style={styles.add} onPress={()=> navigation.navigate('home')}/>
      
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#fff', // Adjust as needed
  },
  add:{
    position:'absolute',
    bottom:10,
    right:10
  }
});