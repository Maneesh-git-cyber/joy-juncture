import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATKW3lbHEOZ_JbqkvEWP01LQeN2a6Yk-A",
  authDomain: "gwoc-26.firebaseapp.com",
  projectId: "gwoc-26",
  storageBucket: "gwoc-26.firebasestorage.app",
  messagingSenderId: "756583479378",
  appId: "1:756583479378:web:da7f8651c4ab610add478b",
  measurementId: "G-4KG2TC67P2"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
