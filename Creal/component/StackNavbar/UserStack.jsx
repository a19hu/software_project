import React,{useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import Coursedetails from '../classroom/Course/Coursedetails';
const Stack = createStackNavigator();

export default function UserStack() {
  const [details,setdetails]=useState({
    id:'',
    class:'',
    course:''
  })

  return (
      <Stack.Navigator screenOptions={{headerShown: false }}>
        <Stack.Screen name="home" component={Home}   
        initialParams={{ setdetails: setdetails }} 
        />
        <Stack.Screen name="Todo" component={Todo } />
        <Stack.Screen name="Coursedetails" component={Coursedetails } />

        <Stack.Screen name="Createclass" component={Createclass } />
        <Stack.Screen name="joinclass" component={Joinclass } />
        <Stack.Screen name="Profile" component={Profile} /> 
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="AddClass" component={AddClass} options={{headerShown:true}}/>
        <Stack.Screen name="Bottomstudent" component={Bottomstudent} 
        initialParams={{details:details }} 
        
        />
        <Stack.Screen name="ClassStudent" component={ClassStudent} 
        />

      </Stack.Navigator>
  );
}