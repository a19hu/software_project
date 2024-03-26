import { View, Text,StyleSheet,Image } from 'react-native'
import React, { useRef, useState } from 'react'
import logo from '../../../Image/logo.png'
import { CalendarList } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

export default function CalendarExample() {
    const navigation = useNavigation()

    const [selectedDate, setSelectedDate] = useState(null);
    const handleDayPress = day => {
        setSelectedDate(day.dateString);
        
  navigation.navigate('Attendencephoto')
      };
      
      const customDatesStyles = {
        selectedDate: {
          
          text: {
            color: 'red', 
          },
        },
      };
    

  return (
    <View >
      <CalendarList
        onDayPress={handleDayPress}
        // onVisibleMonthsChange={(months) => {
        //   console.log('now these months are visible', months);
        // }}
        pastScrollRange={6}
        futureScrollRange={0}
        scrollEnabled={true}
        showScrollIndicator={true}
        markedDates={{
            [selectedDate]: { selected: true }, 
          }}
        customDatesStyles={customDatesStyles}
      />
       {selectedDate && (
        <View style={{
          position: 'absolute',
          top: 0,
         
        }}>
          <Image
            source={require('../../../Image/logo.png')} // Replace with your background image
            style={{
              flex: 1,
              height:50,
              width:50
            }}
          />
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ color: 'red' }}>{selectedDate}</Text>
          </View>
        </View>
      )}
    </View>
  )
}

