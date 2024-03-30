import { View,Image,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Notification from '../Screen/notification/Notification';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import defaultimage from '../../Image/default.png'
import logo from '../../Image/logo.png'
import Profile from '../Screen/profile/Profile'
import Play from '../Screen/play/Play';
import UserStack from '../StackNavbar/UserStack';
import HomeTA from '../classroom/TA/HomeTA.jsx';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import logoadd from '../../Image/logoadd.png'
const Drawer = createDrawerNavigator();
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#121636' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 7 }}>
        <TouchableOpacity onPress={() => props.navigation.navigate('profile')}>

         <Image source={defaultimage} style={{ width: 100, height: 100, borderRadius: 50 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalLine} />
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
        backgroundColor:'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)'
      },
      headerTitleAlign: 'center',
      headerTintColor: '#8992CC', 
      drawerActiveTintColor: '#4374ba', 
    }}
    >
      <Drawer.Screen name="Classes" component={UserStack}
      options={{    
        drawerLabelStyle: {
          fontWeight: 'bold',
          color:'#8992CC'
        }, 
        drawerIcon: ({ focused, color, size }) => (
          <MaterialIcons name="class" size={size } color='#8992CC' />
        ),
        headerTitle: () => <Image source={logoadd} style={{ width: 50, height: 37 }} />, 
    }}
      />
      <Drawer.Screen name="Notification" component={Notification} 
       options={{
        drawerLabelStyle: {
          fontWeight: 'bold',
          color:'#8992CC'
        }, 
        drawerIcon: ({ focused, color, size }) => (
          <Feather
            name={focused ? 'bell' : 'bell'}
            size={size}
            color='#8992CC'
          />
        ),
      }}
      />
      <Drawer.Screen name="profile" component={Profile}
      options={{
        drawerLabelStyle: {
          fontWeight: 'bold',
          color:'#8992CC'

        }, 
        drawerIcon: ({ focused, color, size }) => (
          <AntDesign name="profile" size={24} color='#8992CC' />
        ),
      }}
      />
      <Drawer.Screen name="HomeTA" component={HomeTA} 
      options={{
        drawerLabelStyle: {
          fontWeight: 'bold',
          color:'#8992CC'

        }, 
        drawerIcon: ({ focused, color, size }) => (
          <FontAwesome5 name="chalkboard-teacher" size={24} color='#8992CC' />
        ),
      }}
      />


    </Drawer.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: '#8992CC', 
    borderBottomWidth: 2, 
    marginVertical: 10, 
  },
});