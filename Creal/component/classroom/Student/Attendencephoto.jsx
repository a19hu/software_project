import React, { useState } from 'react';
import { View, Image, TouchableOpacity,Text } from 'react-native';
import source from '../../../Image/logo.png'
export default function Attendencephoto() {
  
  return (
    <View>
      <Text>Attendencephoto</Text>
      <Image source={source} style={{ width: 200, height: 200 }} />
      <Text>front camera photo</Text>
     
      <Image source={source} style={{ width: 200, height: 200 }} />
      <Text>back camera photo</Text>
     
      
    </View>
  )
}