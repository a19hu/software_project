import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, ScrollView,Image} from 'react-native';
import { Camera } from 'expo-camera';
import { ref, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from '../../../firebase';

export default function Studentcamera() {

  const [hasPermission, setHasPermission] = useState(null);
  const [blobFile, setBlobFile] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [files, setFiles] = useState([]);
  
  let camera;

  useEffect(() => {
   
    const fetchFiles = async () => {
      try {
        const storageRef = ref(storage, 'camera1'); 
        const listResult = await listAll(storageRef);
        const imagname=await Promise.all(listResult.items.map(item => item.name));
        const urls = await Promise.all(listResult.items.map(item => getDownloadURL(item)));
        const filesData = imagname.map((name, index) => ({
          name: name,
          url: urls[index]
        }));
        setFiles(filesData);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <Text> access to camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (!camera) return;
    let result = await camera.takePictureAsync();
    if (result !=null ) {
      const response = await fetch(result.uri);
      const blob = await response.blob();
      console.log(blob);
      setBlobFile(blob);
      setPreviewVisible(true);
      await uploadImageAsync(result.uri);
      console.log('camera1 sucess full')
  }
  };
  const currentDate = new Date();

 const currentYear = currentDate.getFullYear();
 const currentMonth = currentDate.getMonth() + 1;
const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`
 const currentDay = currentDate.getDate() > 9 ? currentDate.getDate() : "0"+currentDate.getDate()
 const currentHour = currentDate.getHours() > 9 ? currentDate.getHours() : "0"+ currentDate.getHours()
 const currentMinute = currentDate.getMinutes() > 9 ? currentDate.getMinutes() : "0"+currentDate.getMinutes()
 const date = currentYear + "-"+formattedMonth + "-" +currentDay 
 const time = currentHour + ":" + currentMinute
const datetime= time +""+'|'+date
console.log(datetime)
  async function uploadImageAsync(uri) {
    try {
      if (!blobFile) return;
      // console.log(filename)
      const fileName=datetime
      const storageRef = ref(storage, `camera1/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, blobFile);
      console.log('camera2 sucess full')

      uploadTask.on(
          "state_changed",
          null,
          (error) => {
              console.error("Error uploading file:", error);
          },
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log("File available at", downloadURL);
              });
          }
      );
  } catch (error) {
      console.error("Error uploading file:", error);
  }
  }
  return (
    <ScrollView>
    <View >
      <Camera
        style={{ height: 600}}
        type={type}
        ref={(r) => {
          camera = r;
        }}
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 50, marginBottom: 10, color: "black" }}>Flip</Text>
          </TouchableOpacity>
          <View>
            <View>
              <TouchableOpacity
                onPress={takePicture}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  backgroundColor: "red",
                }}
              />
            </View>
          </View>
        </View>
      </Camera>
    </View>
    {files && files.map((item,index)=>(
      <View key={index}>

        <Image source={{ uri: item.url }} style={{ width: 300, height: 300, marginBottom: 20 }} />
        <Text>{item.name}</Text>
      </View>
    ))}



    </ScrollView>
  )
}
