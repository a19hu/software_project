import React from 'react'
import Coursedetails from '../classroom/Course/Coursedetails'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Attendence from '../classroom/Course/Attendence';
import Studentlist from '../classroom/Course/Studentlist';
const Tab = createBottomTabNavigator();
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
export default function Bottomstudent({ route }) {
  const {details } = route.params;
  return (
    <Tab.Navigator 
    screenOptions={{
    tabBarInactiveTintColor:"#ABB2EF",
    tabBarActiveTintColor:"white",
    // tabActiveTint
      tabBarStyle: { position: 'absolute' },
      tabBarBackground: () => (
        <BlurView tint="light" intensity={100}  />
      ),
    }}
    tabBarStyle={{ backgroundColor: 'red' }}
    initialRouteName="Studentcoursedet"
    >
    <Tab.Screen name="Coursedetails" component={Coursedetails} 
    options={{
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => (
<MaterialCommunityIcons name="card-account-details" size={24} color={color} />)}} 
    initialParams={{details:details}} />
    <Tab.Screen name="Attendence" component={Attendence} 
    options={{
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => (
<MaterialIcons name="photo-library" size={24} color={color} />     ),
    }} 
    />
    <Tab.Screen name="Studentlist" component={Studentlist} 
     options={{
      headerShown: false,
      tabBarIcon: ({color}) => (<FontAwesome name="list-alt" size={24} color={color} /> )}} 
   
    
    initialParams={{details:details}}/>
  </Tab.Navigator>
  )
}