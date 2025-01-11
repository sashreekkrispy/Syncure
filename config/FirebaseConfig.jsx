// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD5pdbvsu46snea2SX8dTk0rViGCDxXWw",
  authDomain: "syncure-medicine-tracker.firebaseapp.com",
  projectId: "syncure-medicine-tracker",
  storageBucket: "syncure-medicine-tracker.firebasestorage.app",
  messagingSenderId: "1023849850139",
  appId: "1:1023849850139:web:6ae354dc2ba561f3601fbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app);