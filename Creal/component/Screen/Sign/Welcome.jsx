import { View, Text, StyleSheet, ImageBackground, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
// import Background from '../../../Image/background.png'
import Background from '../../../Image/back.png'
import logoadd from '../../../Image/logoadd.png'

export default function Welcome({ navigation }) {
    return (
        <ImageBackground
            source={Background}
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.styletop}>
                    <Image source={logoadd} style={styles.logo} />
                    <Text style={styles.heading}>Hi there!</Text>
                </View>
                <View style={styles.styledown}>

                    <View style={[styles.layer, styles.layer1]} />
                    <View style={[styles.layer, styles.layer2]} />
                    <View style={[styles.layer, styles.layer3]} >
                        <View style={styles.buttongroup}>

                        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('SignIn')}>
                        <Text style={styles.buttontext}>Log In</Text>
                       </TouchableOpacity>
                       <TouchableOpacity style={styles.buttonSign}onPress={()=>navigation.navigate('Sign Up')}>
                        <Text style={styles.buttontextSign}>Sign Up</Text>
                       </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        backgroundColor: '#121636',
        flex: 1,
        height: '50%',
        width: '100%',
        // justifyContent: 'center',
        zIndex: -1,
    },
    top: {
        backgroundColor: 'red'
    },
    layer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 500,
        borderTopRightRadius: 500,
        alignItems: 'center',

    },
    layer1: {
        backgroundColor: '#6E77BA',
        height: '100%',
        zIndex: 1,
    },
    layer2: {
        backgroundColor: '#434C96',
        zIndex: 2,
        height: '100%',
        top: '30%',
    },
    layer3: {
        backgroundColor: '#2A3B7F',
        zIndex: 3,
        height: '100%',
        width: '100%',
        top: '60%',
        left: 0,
    },
    styledown: {
        position: 'absolute',
        bottom: 0,
        width: 740,

        height: '54%',

    },
    styletop: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        zIndex: 100,
        top: 110
    },
    heading: {
        color: 'white',
        fontSize: 57,
        fontWeight:'700',

    },
    logo: {
        height: 100,
        width: 130,
        alignItems: 'center',
        marginLeft:25


    },
    button:{
        backgroundColor:'#B1B7EE',
        padding:10,
        borderRadius:10,
        borderRadius:50,
        zIndex: 10,
        padding:10,
        width:180,
        justifyContent: 'center',
        alignItems:'center',
   margin:8
    },
    buttonSign:{
        borderColor:'#B1B7EE',
        borderWidth:2,
        padding:10,
        borderRadius:10,
        borderRadius:50,
        zIndex: 10,
        padding:10,
        width:180,
        justifyContent: 'center',
        alignItems:'center',
   margin:8
    },
    buttontextSign:{
        color:'#B1B7EE',
        fontWeight:'700',
        fontSize:20
    },
    buttontext:{
        color:'#21316C',
        fontWeight:'700',
        fontSize:20
    },
    buttongroup:{
        width:500,
        alignItems: 'center',
        marginTop:40
    }
});

