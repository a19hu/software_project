import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../Screen/Sign/SignIn';
import SighUp from '../Screen/Sign/SighUp';
import Welcome from '../Screen/Sign/Welcome';
const Stack = createStackNavigator();
export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome}  options={{ headerShown: false }}/>
        <Stack.Screen name="SignIn" component={SignIn}  options={{ headerShown: false }}/>
        <Stack.Screen name="Sign Up" component={SighUp} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}