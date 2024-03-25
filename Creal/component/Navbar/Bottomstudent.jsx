import { View, Text } from 'react-native'
import React from 'react'
import Leav from '../classroom/Course/Leav'
import Coursedetails from '../classroom/Course/Coursedetails'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Attendence from '../classroom/Course/Attendence';
import Studentlist from '../classroom/Course/Studentlist';
const Tab = createBottomTabNavigator();
export default function Bottomstudent({ route }) {
  const {details } = route.params;
  return (
    <Tab.Navigator
    >
    <Tab.Screen name="Coursedetails" component={Coursedetails} options={{headerShown:false}}  initialParams={{details:details}} />
    <Tab.Screen name="Attendence" component={Attendence} options={{headerShown:false}} />
    <Tab.Screen name="Studentlist" component={Studentlist} options={{headerShown:false}} initialParams={{details:details}}/>
    <Tab.Screen name="Leav" component={Leav} options={{headerShown:false}} />


  </Tab.Navigator>
  )
}