import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function EmptyState() {
  const router = useRouter();

  // Handle navigation when button is pressed
  const handlePress = () => {
    router.push('/AddNewMedication');
  };

  return (
    <View style={{ marginTop: 80, display: 'flex', alignItems: 'center' }}>
      <Image
        source={require('./../assets/images/pill.png')}
        style={{ width: 120, height: 120 }}
      />

      <Text
        style={{
          fontSize: 35,
          fontFamily: 'outfit-Bold',
          marginTop: 30,
        }}
      >
        No Medications!
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: '#808080',
          textAlign: 'center',
          marginTop: 20,
          fontFamily: 'outfit',
        }}
      >
        You currently have no medications set up. Please set up a new one.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: 'black',
          padding: 15,
          borderRadius: 10,
          width: '100%',
          marginTop: 30,
        }}
        onPress={handlePress} // Navigate on press
      >
        <Text
          style={{
            textAlign: 'center',
            fontSize: 17,
            color: 'white',
            fontFamily: 'outfit-medium',
          }}
        >
          +Add New Medication
        </Text>
      </TouchableOpacity>
    </View>
  );
}
