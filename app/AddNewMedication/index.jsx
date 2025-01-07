import { View, Text, Image } from 'react-native'
import React from 'react'
import AddMedicationForm from '../../components/AddMedicationForm'


export default function index() {
  return (
    <View>
        <Image source={require('./../../assets/images/consult.png')} style={{
            height:280,
            width:'100%'
        }} />
        <AddMedicationForm />
      
    </View>
  )
}