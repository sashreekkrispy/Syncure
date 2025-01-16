import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MedicationCardItem({ medicine, selectedDate }) {
  const [status, setStatus] = useState();

  useEffect(() => {
    CheckStatus();
  }, [medicine, selectedDate]); // Watch for both medicine and selectedDate changes

  const CheckStatus = () => {
    const data = medicine?.action?.find(
      (item) => new Date(item.date).toDateString() === new Date(selectedDate).toDateString()
    );
    console.log("Found Data:", data); // Debugging log
    setStatus(data);
  };

  return (
    <View
      style={{
        padding: 10,
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine?.type?.icon }}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 24, fontFamily: 'outfit-Bold', color: 'white' }}>
            {medicine?.name}
          </Text>
          <Text style={{ fontSize: 17, fontFamily: 'outfit', color: 'white' }}>
            {medicine?.when}
          </Text>
          <Text style={{ fontSize: 13, fontFamily: 'outfit-Bold', color: 'white' }}>
            Dose: {medicine?.dose}
          </Text>
        </View>
      </View>
      <View style={styles.reminderContainer}>
        <Ionicons name="timer-outline" size={24} color="black" />
        <Text style={{ fontFamily: 'outfit-Bold', fontSize: 17 }}>{medicine?.reminder}</Text>
      </View>

        
        <View style={styles.statusContainer}>
          {status?.status === 'Taken' ? (
            <Ionicons name="checkmark-circle" size={24} color="green" />
          ) : status?.status === 'Missed' ? (
            <Ionicons name="close-circle" size={24} color="red" />
          ) : null}
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 15,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
  },
  statusContainer: {
    position: 'absolute',
    top: 0,
    padding: 7,
  },
});
