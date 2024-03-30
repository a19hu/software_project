import { View, Text,ImageBackground,StyleSheet  } from 'react-native'
import React from 'react'
import Background from '../../../Image/back.png'

export default function Attendence() {
  return (
    <ImageBackground
    source={Background}
    style={styles.background}
    resizeMode='repeat'
>
    <View>
      <Text>Attendence</Text>
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
});