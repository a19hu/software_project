import { View, Text,Button,Image,Alert, TouchableOpacity,ImageBackground,  Linking,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'
import {getStorage, ref, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import * as DocumentPicker from 'expo-document-picker';
const storage = getStorage();
import Background from '../../../Image/back.png'

export default function StudentLeave() {
    const [fileName, setFileName] = useState('');
    const [blobFile, setBlobFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState([]);
    useEffect(() => {
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
            let result = await DocumentPicker.getDocumentAsync({type:'application/pdf'});
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
                      // console.log("File available at", downloadURL);
                      setUploading(false);
                    });
                  }
                  );
                } catch (error) {
          console.error("Error uploading file:", error);
          setUploading(false);
        }
        const openFile = (url) => {
        };
    Linking.openURL(url);
  };

  
  return (
    <ImageBackground
            source={Background}
            style={styles.background}
            resizeMode='repeat'
        >
    <View>
      <Button title="Pick PDF" onPress={pickDocument} disabled={uploading} />
      <Button title="Upload Document" onPress={uploadFile} />
           <Button title="show Document" onPress={() => openFile(files[0])} />
          <Text>jsjfpo</Text>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#121636',
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: -1,
},
});