// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcESn5hYMkVdc9PuQUbJKfkSAsHC6EwZY",
    authDomain: "asistencia-bac9a.firebaseapp.com",
    projectId: "asistencia-bac9a",
    storageBucket: "asistencia-bac9a.appspot.com",
    messagingSenderId: "118861079876",
    appId: "1:118861079876:web:8ab958f3d7b955830aa311"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


export { app, auth, db }