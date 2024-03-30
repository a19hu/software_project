import { View, Text } from 'react-native'
import React,{useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screen/Home/Home';
import Profile from '../Screen/profile/Profile';
import Notification from '../Screen/notification/Notification';
import AddClass from '../classroom/Add/AddClass';
import Bottomstudent from '../Navbar/Bottomstudent';
import Createclass from '../classroom/Add/Createclass';
import Joinclass from '../classroom/Add/Joinclass';
import ClassStudent from '../Navbar/ClassStudent';
import Attendencephoto from '../classroom/Student/Attendencephoto';
import Coursedetails from '../classroom/Course/Coursedetails';
import Studentcamera from '../classroom/Student/Studentcamera';
import JoinTa from '../classroom/TA/JoinTa';
import HomeTA from '../classroom/TA/HomeTA';
import Email from '../../component/classroom/Course/Email'
import Studentcoursedet from '../classroom/Student/Studentcoursedet';
const Stack = createStackNavigator();

export default function UserStack() {
  return (
      <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen name="mainhome" component={Home}   
        />

        <Stack.Screen name="HomeTA" component={HomeTA } 
        />
       
        <Stack.Screen name="Studentcoursedet" component={Studentcoursedet } />

        <Stack.Screen name="Coursedetails" component={Coursedetails } />
        <Stack.Screen name="Attendencephoto" component={Attendencephoto } />

        <Stack.Screen name="Createclass" component={Createclass } 
        />
        <Stack.Screen name="email" component={Email} 
        />
        <Stack.Screen name="joinclass" component={Joinclass } 
        
        />
        <Stack.Screen name="joinTa" component={JoinTa } 
        
        />
        <Stack.Screen name="Profile" component={Profile} /> 
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="AddClass" component={AddClass} options={{headerShown:true}}/>
        <Stack.Screen name="Bottomstudent" component={Bottomstudent} 
        
        />
        <Stack.Screen name="ClassStudent" component={ClassStudent} 
        />
        <Stack.Screen name="studentcamera" component={Studentcamera} /> 

      </Stack.Navigator>
  );
}

