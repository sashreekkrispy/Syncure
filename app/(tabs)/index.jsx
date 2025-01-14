import { FlatList, ScrollView, View } from 'react-native';
import React from 'react';
import EmptyState from './../../components/EmptyState';
import Header from './../../components/Header';
import MedicationList from '../../components/MedicationList';

export default function HomeScreen() {
  return (

    <FlatList data={[]} ListHeaderComponent={
      <View
      style={{
        flex:1,
        padding: 25,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Header />
      
      <MedicationList />
      
    </View>

    }/>
    
  );
}
