import { View, Text,Button } from 'react-native'
import React from 'react'
import { signOut} from 'firebase/auth';
import { useAuthentication } from '../../utils/useAuthentication';
import {auth} from '../../../firebase'

export default function Profile() {
  const { user } = useAuthentication();

  return (
    <View>
      <Text>Welcome {user?.email}!</Text>

      <Text>Profile</Text>
      <Button title="Sign Out"  onPress={() => signOut(auth)} />

    </View>
  )
}