import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MedicationCardItem({medicine}) {
  return (
    <View style={{
        padding:10,
        marginTop:10,
        borderRadius:15,
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        alignItems:'center'     
    }}>
        <View style={styles.subContainer}> 
      <View style={styles.imageContainer}>
        <Image source={{uri:medicine?.type?.icon}} 

        style={{
            width:50,
            height:50
        }}
        
        />
      </View>
      <View>
        <Text style={{fontSize:24,fontFamily:'outfit-Bold',color:'white'}}>{medicine?.name}</Text>
        <Text style={{fontSize:17,fontFamily:'outfit',color:'white'}}>{medicine?.when}</Text>
        <Text style={{fontSize:13,fontFamily:'outfit-Bold',color:'white'}}>Dose: {medicine?.dose}</Text>
      </View>
      </View>
      <View style={styles.reminderContainer}>
      <Ionicons name="timer-outline" size={24} color="black" />
        <Text style={{fontFamily:'outfit-Bold',fontSize:17}}>{medicine?.reminder}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    imageContainer:{
        padding:10,
        backgroundColor:'white',
        borderRadius:15,
        marginRight:15

    },
    subContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    reminderContainer:{
        padding:10,
        backgroundColor:'white',
        borderRadius:15,
        alignItems:'center'

    }
})