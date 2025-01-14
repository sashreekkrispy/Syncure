import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function AddNew() {
  const router = useRouter();

  useEffect(() => {
    
    router.replace('/AddNewMedication');
  }, []);

  return null; // No UI needed since it's just redirecting
}
