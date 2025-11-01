// import firebase from "firebase/compat/app";
// import {getAuth } from "firebase/auth"
// import "firebase/compat/firestore"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyS1tVSEyPQrdiBWtsCnzP1fJAJ7g7_W8",
  authDomain: "clone-70f44.firebaseapp.com",
  projectId: "clone-70f44",
  storageBucket: "clone-70f44.firebasestorage.app",
  messagingSenderId: "180414988404",
  appId: "1:180414988404:web:224c30f9116970b24bd121",
};

// Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
// export const db = app.firestore()

