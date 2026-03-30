// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwIu2VrgyagjxRiCrZomGZ8p6vTLwp-TY",
  authDomain: "visual-phase.firebaseapp.com",
  projectId: "visual-phase",
  storageBucket: "visual-phase.firebasestorage.app",
  messagingSenderId: "277108327668",
  appId: "1:277108327668:web:2cd1b3505bd2cb01078aa1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
