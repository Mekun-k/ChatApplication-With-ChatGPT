// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0qTsyTvDyW2EBPXLTYNUHMSVpwtQRUYw",
  authDomain: "chatapplication-with-cha-5e570.firebaseapp.com",
  projectId: "chatapplication-with-cha-5e570",
  storageBucket: "chatapplication-with-cha-5e570.firebasestorage.app",
  messagingSenderId: "845938918845",
  appId: "1:845938918845:web:3a350d6bbaf74cab4cbed4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);