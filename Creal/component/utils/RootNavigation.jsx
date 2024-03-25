import React from 'react';
import { useAuthentication } from '../utils/useAuthentication';
import UserStack from '../StackNavbar/UserStack';
import AuthStack from '../StackNavbar/authStack';
import DrawerNav from '../Navbar/DrawerNav';

export default function RootNavigation() {
  const { user } = useAuthentication();
  return  user?(<>
  {/* <UserStack/> */}
  <DrawerNav/>
  </>
  ):<AuthStack/> 
}