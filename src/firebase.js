// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE1piO8ZBLiO_nfbmZ4C-cGJiMRqEzElU",
  authDomain: "quiz-app-leaderboard-944f8.firebaseapp.com",
  projectId: "quiz-app-leaderboard-944f8",
  storageBucket: "quiz-app-leaderboard-944f8.firebasestorage.app",
  messagingSenderId: "794263650376",
  appId: "1:794263650376:web:34e832b54294e8b65ed87d",
  measurementId: "G-H3SBSF736G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);