import React from 'react';
import { useAuthentication } from '../utils/useAuthentication';
import AuthStack from '../StackNavbar/authStack';
import { Text } from 'react-native-paper';
import DrawerNav from '../Navbar/DrawerNav';

export default function RootNavigation() {
  const { user } = useAuthentication();
  return  user?(<>
  <DrawerNav/>
  </>
  ):<AuthStack/> 
}