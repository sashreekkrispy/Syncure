import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AddMedicationForm from '../../components/AddMedicationForm';

export default function Index() {
  const router = useRouter();

  const handleBack = () => {
    router.push('(tabs)'); // Redirect to the home screen
  };

  return (
    <ScrollView>
      {/* Back Button */}
      <View style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }}>
        <TouchableOpacity
          onPress={handleBack}
          style={{
            backgroundColor: '#fff',
            padding: 10,
            borderRadius: 50,
            elevation: 5,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Image */}
      <Image
        source={require('./../../assets/images/consult.png')}
        style={{
          height: 280,
          width: '100%',
        }}
      />

      {/* Add Medication Form */}
      <AddMedicationForm />
    </ScrollView>
  );
}
