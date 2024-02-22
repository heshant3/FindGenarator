// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEdcDQ5DmLfFqup3Oq_UrvUwUxj2edZQ4",
  authDomain: "findgenarator-527dc.firebaseapp.com",
  databaseURL: "https://findgenarator-527dc-default-rtdb.firebaseio.com",
  projectId: "findgenarator-527dc",
  storageBucket: "findgenarator-527dc.appspot.com",
  messagingSenderId: "560219838192",
  appId: "1:560219838192:web:c90f000fb17b2c521f1435",
  measurementId: "G-KWGPBYV9B7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
