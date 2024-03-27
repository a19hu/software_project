import { View, Text,Button,Image,Alert, TouchableOpacity, Linking } from 'react-native'
import React,{useState,useEffect} from 'react'
import { storage } from '../../../firebase';
import { ref, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as DocumentPicker from 'expo-document-picker';

export default function StudentLeave() {
    const [fileName, setFileName] = useState('');
    const [blobFile, setBlobFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState([]);
    useEffect(() => {
      // const fetchFiles = async (userId) => {
      //   try {
      //     const storagePath = `users/${userId}/uploads`;
    
      const fetchFiles = async () => {
        try {
          const storageRef = ref(storage, 'myDocs'); 
          const listResult = await listAll(storageRef);
          const urls = await Promise.all(listResult.items.map(item => getDownloadURL(item)));
          setFiles(urls);
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      };
  
      fetchFiles();
    }, []);
    const pickDocument = async () => {
      try {
            let result = await DocumentPicker.getDocumentAsync({});
            // console.log(result)
            if (result !=null ) {
                const response = await fetch(result.assets[0].uri);
                const blob = await response.blob();
                setFileName(result.assets[0].name);
                setBlobFile(blob);
                console.log('sucess full')
            }
        } catch (error) {
            console.log('Error picking document:', error);
        }
  
    };
    const uploadFile = async () => {
      try {
          if (!blobFile) return;

          setUploading(true);
          const storageRef = ref(storage, `myDocs/${fileName}`);
          const uploadTask = uploadBytesResumable(storageRef, blobFile);

          uploadTask.on(
              "state_changed",
              null,
              (error) => {
                  console.error("Error uploading file:", error);
                  setUploading(false);
              },
              () => {
                  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      console.log("File available at", downloadURL);
                      setUploading(false);
                  });
              }
          );
      } catch (error) {
          console.error("Error uploading file:", error);
          setUploading(false);
      }
  };
  const openFile = (url) => {
    Linking.openURL(url);
  };

  
  return (
    <View>
      <Image source={{ uri: files[1] }} style={{ width: 400, height: 500, marginBottom: 20 }} />
      <Image source={{ uri: files[2] }} style={{ width: 100, height: 100, marginBottom: 20 }} />
      <Button title="Pick PDF" onPress={pickDocument} disabled={uploading} />
      <Button title="Upload Document" onPress={uploadFile} 
      // disabled={!fileName || uploading}
       />
           <Button title="show Document" onPress={() => openFile(files[0])} />
          
    </View>
  )
}