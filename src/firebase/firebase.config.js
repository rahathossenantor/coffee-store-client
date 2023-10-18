// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfBspI4GVHVzgafIttbd8LsOTPptLMRbs",
  authDomain: "coffee-store-ff8ff.firebaseapp.com",
  projectId: "coffee-store-ff8ff",
  storageBucket: "coffee-store-ff8ff.appspot.com",
  messagingSenderId: "889661101330",
  appId: "1:889661101330:web:8e76e45e7f6bf3cb914fcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
