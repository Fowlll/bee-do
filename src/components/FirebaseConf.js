// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOZ1DP4kb5p4wSUo9LctFzCEiN48p09-M",
  authDomain: "bee-do.firebaseapp.com",
  projectId: "bee-do",
  storageBucket: "bee-do.appspot.com",
  messagingSenderId: "492988863190",
  appId: "1:492988863190:web:a6502954e59843db55ef77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default auth;
export const firestore = db;