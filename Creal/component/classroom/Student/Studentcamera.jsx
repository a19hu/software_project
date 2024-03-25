import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,Button} from 'react-native';
import { Camera } from 'expo-camera';

export default function Studentcamera() {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const flipCamera = () => {
    console.log('take flip')
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      let photo = await cameraRef.current.takePictureAsync();
    // Upload photo to Firebase Storage
    const response = await fetch(photo.uri);
    const blob = await response.blob();

    const storageRef = firebase.storage().ref().child('images/photo.jpg');
    await storageRef.put(blob);

    console.log('Photo uploaded to Firebase Storage');
  }
  }



  if (hasPermission === null) {
    return <Text>No access to camer</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View >
        <Text>osjdoi</Text>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={flipCamera}>
            <Button title='flip'/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Button title='sub'/>

          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height:500
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
  },
});
