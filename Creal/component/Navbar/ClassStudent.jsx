import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentAttendence from '../classroom/Student/StudentAttendence';
import Studentcoursedet from '../classroom/Student/Studentcoursedet';
import StudentLeave from '../classroom/Student/StudentLeave';
const Tab = createBottomTabNavigator();
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
export default function ClassStudent({ route }) {
  const {Id, classname, coursename, classcode, email} = route.params;
  return (
    <Tab.Navigator 
    screenOptions={{
    tabBarInactiveTintColor:"#ABB2EF",
    tabBarActiveTintColor:"white",
      tabBarStyle: { position: 'absolute' },
      tabBarBackground: () => (
        <BlurView tint="light" intensity={100}  />
      ),
    }}
    tabBarStyle={{ backgroundColor: 'red' }}
    initialRouteName="Studentcoursedet"
    >
     
    <Tab.Screen name="Studentcoursedet" component={Studentcoursedet} 
    options={{
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => (
<MaterialCommunityIcons name="card-account-details" size={24} color={color} />)}} 
    initialParams={{Id, classname, coursename, classcode, email}}
    />
     <Tab.Screen name="StudentAttendence" component={StudentAttendence} 
    options={{
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => (
<MaterialIcons name="photo-library" size={24} color={color} />     ),
    }} 
    />
    <Tab.Screen name="StudentLeave" component={StudentLeave} 
      initialParams={{Id, classname, coursename, classcode, email}}
   
    options={{
      headerShown: false,
      tabBarIcon: ({color}) => (<AntDesign name="pdffile1" size={24} color={color} /> )}} 
    />


  </Tab.Navigator>
  )
}