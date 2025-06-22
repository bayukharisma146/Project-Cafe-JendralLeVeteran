// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLajgrkgr5ux8PU4QZeL2HOQdEDAQqumE",
  authDomain: "jendral-le-veteran.firebaseapp.com",
  projectId: "jendral-le-veteran",
  storageBucket: "jendral-le-veteran.appspot.com",
  messagingSenderId: "943113910198",
  appId: "1:943113910198:web:fdd2ee6f02fc06ba10f317",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
};
export default app;