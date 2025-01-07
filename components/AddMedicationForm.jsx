import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import {TypeList, WhenToTake} from './../constants/Options'
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FormatDate, FormatDateForText } from '../service/ConvertDateTime';

export default function AddMedicationForm() {

    const [formData,setFormData]=useState();
    const [showStartDate,setShowStartDate]=useState(false);
    const [showEndDate,setShowEndDate]=useState(false);
    const onHandleInputChange=(field,value)=>{
        setFormData(prev=>({
            ...prev,
            [field]:value
        }))

    }
  return (
    <View style={{
        padding:25
    }}>
      <Text style={styles.header}>Add New Medication</Text>
      <View style={styles.displaygroup}>
      <AntDesign style={styles.icon} name="medicinebox" size={24} color="black" />
      <TextInput style={styles.textInput} placeholder='Medicine Name' onChangeText={(value)=>onHandleInputChange('name',value)}/>
    </View>

    <FlatList data={TypeList} horizontal showsHorizontalScrollIndicator={false} style={{marginTop:10}} renderItem={({item,index})=>(
        <TouchableOpacity style={[styles.displaygroup,{marginRight:10},
            {backgroundColor:item.name==formData?.type?.name?'black':'white'}
        ]} onPress={()=>onHandleInputChange('type',item)}>
            <Text style={[styles.textInput,{color:item.name==formData?.type?.name?'white':'black'}]}>{item.name}</Text>
            
         </TouchableOpacity>
    )} />

<View style={styles.displaygroup}>
        <Ionicons name="eyedrop-outline" size={24} color="black" />
      <TextInput style={styles.textInput} placeholder='Dose Ex. 2, 5ml' onChangeText={(value)=>onHandleInputChange('dose',value)}/>
    </View>

    <View style={styles.displaygroup}>
        <Ionicons name="time-outline" size={24} color="black" />

        <Picker selectedValue={formData?.when} onValueChange={(itemValue,itemIndex)=>
            onHandleInputChange('when',itemValue)
        } style={{width:'90%'}}>
            {WhenToTake.map((item,index)=>(
                <Picker.Item key={index} label={item} value={item} />
            ))}
        </Picker>
      
    </View>


    <View style={styles.dateInputGroup}>
    <TouchableOpacity style={[styles.displaygroup,{flex:1}]} onPress={()=>setShowStartDate(true)}>
        <Ionicons name="calendar-outline" size={24} color="black" />
        <Text style={styles.textInput}>{FormatDateForText(formData?.startDate)??'Start Date'}</Text>
       
    </TouchableOpacity>

    {showStartDate&&<RNDateTimePicker 
        minimumDate={new Date()}
        onChange={(Event)=>{
            onHandleInputChange('startDate',FormatDate(Event.nativeEvent.timestamp))
            setShowStartDate(false);

        }}
        value={new Date(formData?.startDate)??new Date()}

          
          />}

    <TouchableOpacity style={[styles.displaygroup,{flex:1}]} onPress={()=>setShowEndDate(true)}>
        <Ionicons name="calendar-outline" size={24} color="black" />
        <Text style={styles.textInput}>{FormatDateForText(formData?.endDate)??'End Data'}</Text>
    </TouchableOpacity>

    {showEndDate&&<RNDateTimePicker 
        minimumDate={new Date()}
        onChange={(Event)=>{
            onHandleInputChange('endDate',FormatDate(Event.nativeEvent.timestamp))
            setShowEndDate(false);

        }}
        value={new Date(formData?.endDate)??new Date()}

          
          />}

    </View>

    





    </View>
  )
}

const styles = StyleSheet.create({
    header:{
        fontsize:25,
        fontFamily:'outfit-Bold'
    },

    displaygroup:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding:12,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#E5E7EB',
        marginTop:7

    },
    textInput:{
        flex:1,
        marginLeft:10,
        fontSize:16,
        fontFamily:'outfit'

    },
    icon:{
        color:'black',
        borderRightWidth:1,
        paddingRight:12,
        borderColor:'#E5E7EB'

    },

    dateInputGroup:{
        flexDirection:'row',
        gap:10
    }
})