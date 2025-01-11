import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TypeList, WhenToTake } from './../constants/Options';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FormatDate, FormatDateForText, FormatTime, getDatesRange } from '../service/ConvertDateTime';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { getLocalStorage } from '../service/Storage';
import { useRouter } from 'expo-router';

export default function AddMedicationForm() {
  const [formData, setFormData] = useState({});
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const SaveMedication = async () => {
    const docId = Date.now().toString();
    const user = await getLocalStorage('userDetail');

    if (
      !(
        formData?.name &&
        formData?.type &&
        formData?.dose &&
        formData?.startDate &&
        formData?.endDate &&
        formData?.reminder
      )
    ) {
      Alert.alert('Enter all the fields!');
      return;
    }
    const dates=getDatesRange(formData?.startDate,formData?.endDate);

    try {
      await setDoc(doc(db, 'medication', docId), {
        ...formData,
        userEmail: user?.email,
        docId: docId,
        dates:dates
      });
      console.log('Data saved');
      Alert.alert('Great!', 'New medication added successfully!', [
        {
          text: 'OK',
          onPress: () => router.push('(tabs)'),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Medication</Text>

      <View style={styles.displaygroup}>
        <AntDesign style={styles.icon} name="medicinebox" size={24} color="black" />
        <TextInput
          style={styles.textInput}
          placeholder="Medicine Name"
          placeholderTextColor="#9CA3AF"
          onChangeText={(value) => onHandleInputChange('name', value)}
        />
      </View>

      <FlatList
        data={TypeList}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.typeList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.typeButton,
              {
                backgroundColor: item.name === formData?.type?.name ? 'black' : 'white',
              },
            ]}
            onPress={() => onHandleInputChange('type', item)}
          >
            <Text
              style={[
                styles.typeButtonText,
                {
                  color: item.name === formData?.type?.name ? 'white' : 'black',
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.displaygroup}>
        <Ionicons name="eyedrop-outline" size={24} color="black" />
        <TextInput
          style={styles.textInput}
          placeholder="Dose (e.g., 2 tablets, 5ml)"
          placeholderTextColor="#9CA3AF"
          onChangeText={(value) => onHandleInputChange('dose', value)}
        />
      </View>

      <View style={styles.displaygroup}>
        <Ionicons name="time-outline" size={24} color="black" />
        <Picker
          selectedValue={formData?.when}
          onValueChange={(itemValue) => onHandleInputChange('when', itemValue)}
          style={styles.picker}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.displaygroup, styles.dateInput]}
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.textInput}>
            {FormatDateForText(formData?.startDate) ?? 'Start Date'}
          </Text>
        </TouchableOpacity>

        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange('startDate', FormatDate(event.nativeEvent.timestamp));
              setShowStartDate(false);
            }}
            value={formData?.startDate ? new Date(formData.startDate) : new Date()}
          />
        )}

        <TouchableOpacity
          style={[styles.displaygroup, styles.dateInput]}
          onPress={() => setShowEndDate(true)}
        >
          <Ionicons name="calendar-outline" size={24} color="black" />
          <Text style={styles.textInput}>
            {FormatDateForText(formData?.endDate) ?? 'End Date'}
          </Text>
        </TouchableOpacity>

        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange('endDate', FormatDate(event.nativeEvent.timestamp));
              setShowEndDate(false);
            }}
            value={formData?.endDate ? new Date(formData.endDate) : new Date()}
          />
        )}
      </View>

      <View style={styles.displaygroup}>
        <Ionicons name="timer-outline" size={24} color="black" />
        <TextInput
          style={styles.textInput}
          placeholder="Reminder Time"
          placeholderTextColor="#9CA3AF"
          value={formData?.reminder}
          onFocus={() => setShowTimePicker(true)}
        />
      </View>

      {showTimePicker && (
        <RNDateTimePicker
          mode="time"
          onChange={(event) => {
            const selectedTime = event.nativeEvent.timestamp;
            if (selectedTime) {
              onHandleInputChange('reminder', FormatTime(selectedTime));
            }
            setShowTimePicker(false);
          }}
          value={formData?.reminder ? new Date(`1970-01-01T${formData.reminder}:00Z`) : new Date()}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={SaveMedication}>
        <Text style={styles.buttonText}>ADD MEDICATION</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  header: {
    fontSize: 24,
    fontFamily: 'outfit-Bold',
    marginBottom: 15,
    color: '#1F2937',
  },
  displaygroup: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 15,
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#374151',
  },
  typeList: {
    marginVertical: 10,
  },
  typeButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  typeButtonText: {
    fontSize: 14,
    fontFamily: 'outfit-Bold',
  },
  picker: {
    flex: 1,
    marginLeft: 10,
    color: '#374151',
    fontFamily: 'outfit',
  },
  dateInputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  dateInput: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#111827',
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'outfit-Bold',
    color: '#FFFFFF',
  },
});
