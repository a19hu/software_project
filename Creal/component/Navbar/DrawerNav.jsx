import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screen/Home/Home';
import Notification from '../Screen/notification/Notification';
import logo from '../../Image/logo.png'
import Todo from '../Screen/Todo/Todo';
import { FontAwesome } from '@expo/vector-icons';
import Profile from '../Screen/profile/Profile'
import UserStack from '../StackNavbar/UserStack';
// import { useNavigation } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
// const navigation = useNavigation();
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 20 }}>
        <Image source={logo} style={{ width: 100, height: 100 }} />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
export default function DrawerNav() {
  return (
    <NavigationContainer>
    <Drawer.Navigator
    drawerContent={props => <CustomDrawerContent {...props}/>}
    screenOptions={{
      headerStyle: {
        backgroundColor: '#1BAB7D', 
      },
      // headerTitle: () => <Image source={logo} style={{ width: 50, height: 50 }} />, 
      headerTitleAlign: 'center',
      headerTintColor: '#fff', 
      drawerActiveTintColor: '#1BAB7D', 
    }}
    >
      
      <Drawer.Screen name="Home" component={UserStack}/>
      <Drawer.Screen name="Notification" component={Notification} />
      {/* <Drawer.Screen name="Todo" component={Todo} /> */}
      <Drawer.Screen name="profile" component={Profile} />

    </Drawer.Navigator>
    </NavigationContainer>
  )
}