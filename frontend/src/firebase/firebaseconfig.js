// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPzKSV7ebdncVPeMgJLX_lXwccPXsHqKY",
  authDomain: "booking-app-46713.firebaseapp.com",
  projectId: "booking-app-46713",
  storageBucket: "booking-app-46713.appspot.com",
  messagingSenderId: "774371294259",
  appId: "1:774371294259:web:e07a49e7b1a896aea2f746",
  measurementId: "G-VD0XGR95E7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);