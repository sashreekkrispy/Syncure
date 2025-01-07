import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Colors from '../../constants/Colors';

export default function LoginScreen() {

  const router=useRouter();
  return (
    <View style={{ backgroundColor: "white", height: '100%' }}>
    <Image
      source={require('./../../assets/images/app_login_cover.webp')}
      style={{ width: '100%', height: 500 }}
    />
    <View style={{ padding: 35, display: 'flex', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'outfit-Bold', fontSize: 30, textAlign: 'center' }}>
        Stay in sync with your health.
      </Text>

      <Text style={{ fontFamily: 'outfit', textAlign: 'center', padding: 15, fontSize: 18, color: Colors.GRAY }}>
        Never miss a pill again.
      </Text>

      <TouchableOpacity style={{
        
          padding: 15,
          marginTop: 70,
          backgroundColor:'black',
          width: '100%',
          borderRadius: 14,
        
      }} onPress={()=>router.push('login/signIn')}>

        <Text style={{
          textAlign:'center',
          fontSize:16,
          color:'white',
          fontFamily:'outfit'

        }}>Continue</Text>

      </TouchableOpacity>

   
    </View>
  </View>
  )
}


const styles=StyleSheet.create({
    image:{
        width:210,
        height:450,
        borderRadius:23,

    }
})