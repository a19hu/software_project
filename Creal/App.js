import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image ,ImageBackground} from 'react-native';
import React, { useState, useEffect } from 'react';
import Logo from './Image/logo.png'
import './firebase'
import { ThemeProvider } from 'react-native-elements';
import RootNavigation from './component/utils/RootNavigation';
import Background from './Image/back.png'

export default function App() {
  const [showLogo, setShowLogo] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={Background}
      style={styles.background}
    >
    <View style={styles.container}>
      {showLogo ? (
        <View style={styles.logo}>
          <Image source={Logo} style={{ width: 150, height: 150 }} />
        </View>
      ) : (<ThemeProvider>
        <RootNavigation />
      </ThemeProvider>)}
      {/* <StatusBar  
      backgroundColor="#121636"
      barStyle="light-content"  
      /> */}
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  top:{
    backgroundColor:'red'
  },
  container: {
    flex: 1,
    
  },
  logo:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background:{
    // marginTop:30,
    height:'100%',
    width:'100%',
    backgroundColor:'#121636'
},
});
