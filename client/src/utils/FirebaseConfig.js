// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "citahomes-100c7.firebaseapp.com",
  projectId: "citahomes-100c7",
  storageBucket: "citahomes-100c7.appspot.com",
  messagingSenderId: "105550597274",
  appId: "1:105550597274:web:e9008e6eb575206435e323",
  measurementId: "G-9X6TX4CWYZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);