import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Email from '../classroom/Student/Email'
import StudentAttendence from '../classroom/Student/StudentAttendence';
import Studentcoursedet from '../classroom/Student/Studentcoursedet';
import StudentLeave from '../classroom/Student/StudentLeave';
const Tab = createBottomTabNavigator();

export default function ClassStudent({ route }) {
  const {studentdetails } = route.params;

  return (
    <Tab.Navigator
    >
    <Tab.Screen name="Studentcoursedet" component={Studentcoursedet} options={{headerShown:false}}  
    initialParams={{studentdetails:studentdetails}}
    />
    <Tab.Screen name="StudentAttendence" component={StudentAttendence} options={{headerShown:false}} />
    <Tab.Screen name="Email" component={Email} options={{headerShown:false}} />
    <Tab.Screen name="StudentLeave" component={StudentLeave} options={{headerShown:false}} />


  </Tab.Navigator>
  )
}