// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRr8jMjQV59RWmXY97zUiT8QyeEK1O5Uo",
  authDomain: "ongawa-17902.firebaseapp.com",
  projectId: "ongawa-17902",
  storageBucket: "ongawa-17902.appspot.com",
  messagingSenderId: "840577719261",
  appId: "1:840577719261:web:26ecfd4242b845e8517434",
  measurementId: "G-5RMKHQ9S3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// const analytics = getAnalytics(app);

export {app, auth}