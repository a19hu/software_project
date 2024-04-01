import { View, Text,Button,Image,Alert, TouchableOpacity,ImageBackground,  Linking,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import {getStorage, ref, listAll, getDownloadURL, uploadBytesResumable, getMetadata } from "firebase/storage";
import * as DocumentPicker from 'expo-document-picker';
const storage = getStorage();
import Background from '../../../Image/back.png'

export default function Leav({route}) {
  const { Id, classname, coursename, classcode, email } = route.params;
  const [fileinfo,setfileinfo]= useState([])
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const storageRef = ref(storage, classcode); 
        const listResult = await listAll(storageRef);
    
        const filesInfoPromises = listResult.items.map(async (item) => {
          const downloadURL = await getDownloadURL(item);
          const metadata = await getMetadata(item);
          const fileName = metadata.name;
          const creationTime = metadata.timeCreated;
    
          return { downloadURL, fileName, creationTime };
        });
    
        const filesInfo = await Promise.all(filesInfoPromises);
        return filesInfo;
      } catch (error) {
        console.error('Error fetching files:', error);
        return [];
      }
    };

    fetchFiles() .then(filesInfo => {
      console.log("Files information:", filesInfo);
      setfileinfo(filesInfo)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);
  const openFile = (url) => {
    Linking.openURL(url);
  };
  return (
    <View>
      <Text>Leav</Text>
      {fileinfo && fileinfo.map((file, index) => (
        <>
        
        <Text key={index}>{file.fileName}</Text>
        <Text key={index+1}>{file.creationTime}</Text>
        <Button title="show Document" onPress={() => openFile(file.downloadURL)} />


        </>
        
      ))}
    </View>
  )
}