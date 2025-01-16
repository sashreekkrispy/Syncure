import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {MedicationCardItem} from './../../components/MedicationCardItem'
import Ionicons from '@expo/vector-icons/Ionicons';
import { arrayUnion, doc, setDoc,updateDoc } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';
import moment from 'moment';

export default function MedicationActionModel() {

  const medicine=useLocalSearchParams();
  const router=useRouter();

  const UpdateActionStatus=async(status)=>{

    try{
      const docRef=doc(db,'medication',medicine?.docId)
      await updateDoc(docRef,{
        action:arrayUnion({
          status:status,
          time:moment().format('L'),
          date:medicine?.selectedDate
        })

      });

      Alert.alert(status,'Response Saved!',[
        {
          text:'Ok',
          onPress:()=>router.replace('(tabs)')
        }

      ])

    }catch(e){
      console.log(e)
    }

  }
  return (
    <View style={styles.container}>

      <Image source={require('./../../assets/images/notification.png')} style={{
        width:160,
        height:160
      }}/>

      <Text style={{
        fontSize:18,
        fontFamily:'outfit'
      }}>{medicine?.selectedDate}</Text>

      <Text style={{
        fontSize:38,
        fontFamily:'outfit-Bold'
        
      }}>{medicine?.reminder}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={()=>UpdateActionStatus('Missed')}>
        <Ionicons name="close-outline" size={24} color="red" />
          <Text style={{
            fontSize:20,
            color:'red',
            fontFamily:'outfit-medium'
          }}>Missed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.successButton} onPress={()=>UpdateActionStatus('Taken')}> 
        <Ionicons name="checkmark-outline" size={24} color="blue" />
          <Text style={{
            fontSize:20,
            color:'blue',
            fontFamily:'outfit-medium'
          }}>Taken</Text>
        </TouchableOpacity>
      </View>

          <TouchableOpacity style={{
            position:'absolute',
            top:25,
            left:25
          }} onPress={()=>router.back()}>
          <Ionicons name="close-circle" size={44} color="black" />
          </TouchableOpacity>



      
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:25,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    height:'100%'
  },
  closeButton:{
    padding:10,
    flexDirection:'row',
    gap:6,
    borderWidth:1,
    alignItems:'center',
    borderColor:'red',
    borderRadius:10,

  },

  successButton:{

    padding:10,
    flexDirection:'row',
    gap:6,
    borderWidth:1,
    alignItems:'center',
    borderColor:'blue',
    borderRadius:10,
   

  },

  buttonContainer:{
    flexDirection:'row',
    gap:10,
    marginTop:25

  }
  
})