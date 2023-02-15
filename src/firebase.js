// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb_ce3hY7VPKW8cBYp_N5ZXJBRhh58DiQ",
  authDomain: "chat-app-deac0.firebaseapp.com",
  projectId: "chat-app-deac0",
  storageBucket: "chat-app-deac0.appspot.com",
  messagingSenderId: "434474606796",
  appId: "1:434474606796:web:3d2d06315321ef569ea269"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);