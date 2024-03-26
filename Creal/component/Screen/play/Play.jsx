import { View, Text,Image } from 'react-native'
import React from 'react'
import Zoomable from './Zoomable'
import logo from '../../../Image/logo.png'
export default function Play() {
  return (
    <View>
        <Zoomable>
      <Image source={logo} style={{ width: 200, height: 200 }} />
        </Zoomable>
        <Zoomable>
      <Image source={logo} style={{ width: 200, height: 200 }} />
        </Zoomable>
        <Zoomable>
      <Image source={logo} style={{ width: 200, height: 200 }} />
        </Zoomable>
        <Zoomable>
      <Image source={logo} style={{ width: 200, height: 200 }} />
        </Zoomable>
        <Zoomable>
      <Image source={logo} style={{ width: 200, height: 200 }} />
        </Zoomable>
    </View>
  )
}