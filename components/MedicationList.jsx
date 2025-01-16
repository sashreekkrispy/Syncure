import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { db } from './../config/FirebaseConfig';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { GetDateRangeToDisplay } from '../service/ConvertDateTime';
import { getLocalStorage } from '../service/Storage';
import MedicationCardItem from './MedicationCardItem';
import EmptyState from './EmptyState';
import { useRouter } from 'expo-router';

export default function MedicationList() {
  const [medList, setMedList] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('MM/DD/YYYY'));
  const router=useRouter();

  useEffect(() => {
    GetDateRangeList();
    GetMedicationList(selectedDate);
  }, []);

  // Function to get date range list
  const GetDateRangeList = () => {
    const dateRange = GetDateRangeToDisplay();
    setDateRange(dateRange);
  };

  // Function to get medication list
  const GetMedicationList = async (selectedDate) => {
    const user = await getLocalStorage('userDetail');
    if (!user?.email) {
      console.error('Error: User email is undefined');
      return;
    }

    if (!selectedDate) {
      console.error('Error: Selected date is undefined');
      return;
    }

    setMedList([]);
    try {
      const q = query(
        collection(db, 'medication'),
        where('userEmail', '==', user.email),
        where('dates', 'array-contains', selectedDate)
      );

      const querySnapShot = await getDocs(q);
      if (querySnapShot.empty) {
        console.log('No matching documents found.');
      } else {
        querySnapShot.forEach((doc) => {
          console.log(doc.data());
          setMedList((prev) => [...prev, doc.data()]);
        });
      }
    } catch (e) {
      console.error('Error fetching medication list:', e);
    }
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Image
  source={require('./../assets/images/medicine3.webp')}
  style={{
    width: '100%',
    height: 210,
    borderRadius: 15,
  }}
  resizeMode='cover'
/>


      <FlatList
        data={dateRange}
        horizontal
        style={{ marginTop: 15 }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.dateGroup,
              { backgroundColor: item.formattedDate === selectedDate ? 'black' : '#F5F5F5' },
            ]}
            onPress={() => {
              setSelectedDate(item.formattedDate);
              GetMedicationList(item.formattedDate);
            }}
          >
            <Text style={[styles.day, { color: item.formattedDate === selectedDate ? 'white' : 'black' }]}>
              {item.day}
            </Text>
            <Text style={[styles.date, { color: item.formattedDate === selectedDate ? 'white' : 'black' }]}>
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />

      {medList?.length > 0 ? (
        <FlatList
          data={medList}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={()=>router.push({
              pathname:'/action-model',
              params:{
                ...item,
                selectedDate:selectedDate
              }
            })}>
              <MedicationCardItem medicine={item} selectedDate={selectedDate}/>
            </TouchableOpacity>
          )}
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateGroup: {
    padding: 15,
    backgroundColor: '#F5F5F5',
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
  day: {
    fontSize: 20,
    fontFamily: 'outfit',
  },
  date: {
    fontSize: 26,
    fontFamily: 'outfit-Bold',
  },
});
