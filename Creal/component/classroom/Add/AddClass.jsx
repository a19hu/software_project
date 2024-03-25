import { View, Text,Modal, TouchableOpacity, StyleSheet,Button} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
export default function AddClass({ visible, onClose}) {
    const navigation = useNavigation()
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
    >
    <TouchableOpacity style={styles.modalContainer} 
    onPress={onClose}
    >
      <View style={styles.modalContent}>
        <Button title="student" onPress={() => navigation.navigate('joinclass')} />
        <Button title="admin" onPress={() => navigation.navigate('Createclass')} />
      </View>
    </TouchableOpacity>
  </Modal>
  )
}
const styles = StyleSheet.create({
   
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      width: '100%',
      padding: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  });