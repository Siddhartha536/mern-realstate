// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-realstate-add81.firebaseapp.com",
  projectId: "mern-realstate-add81",
  storageBucket: "mern-realstate-add81.appspot.com",
  messagingSenderId: "972172017349",
  appId: "1:972172017349:web:4144ca18e16dfdaf82faac",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
