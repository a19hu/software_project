import { View, Text } from 'react-native'
import React,{useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screen/Home/Home';
import Profile from '../Screen/profile/Profile';
import Todo from '../Screen/Todo/Todo';
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
const Stack = createStackNavigator();

export default function UserStack() {
  const [details,setdetails]=useState({
    id:'',
    class:'',
    course:'',
    userId:''

  })
  const [studentdetails,setstuydentdetails]=useState({
    id:'',
    class:'',
    course:'',
    classCode:'',
    email:'',
  })
  const [classid,setclassid]= useState('')

  return (
      <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen name="mainhome" component={Home}   
        initialParams={{ setdetails: setdetails,classid:classid,setstuydentdetails:setstuydentdetails}} 
        />

        <Stack.Screen name="HomeTA" component={HomeTA } 
        // initialParams={{setdetails:setdetails}}
        />
       
        <Stack.Screen name="Todo" component={Todo } />
        <Stack.Screen name="Coursedetails" component={Coursedetails } />
        <Stack.Screen name="Attendencephoto" component={Attendencephoto } />

        <Stack.Screen name="Createclass" component={Createclass } 
        />
        <Stack.Screen name="joinclass" component={Joinclass } 
        initialParams={{setclassid:setclassid}} 
        
        />
        <Stack.Screen name="joinTa" component={JoinTa } 
        // initialParams={{setclassid:setclassid}} 
        
        />
        <Stack.Screen name="Profile" component={Profile} /> 
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="AddClass" component={AddClass} options={{headerShown:true}}/>
        <Stack.Screen name="Bottomstudent" component={Bottomstudent} 
        initialParams={{details:details }} 
        
        />
        <Stack.Screen name="ClassStudent" component={ClassStudent} 
        initialParams={{studentdetails:studentdetails }}
        />
        <Stack.Screen name="studentcamera" component={Studentcamera} /> 

      </Stack.Navigator>
  );
}

