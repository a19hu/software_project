import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Logo from './Image/logo.png'
import RootNavigation from './component/utils/RootNavigation';
export default function App() {
  const [showLogo, setShowLogo] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {showLogo ? (
        <View style={styles.logo}>
          <Image source={Logo} style={{ width: 150, height: 150 }} />
        </View>
      ) : (<RootNavigation/>)}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  logo:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
