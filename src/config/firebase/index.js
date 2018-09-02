import { firebase } from "@firebase/app";
import "@firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCUbLt0vI0Y6jwx7m1z0IPGdDI1DxhfULc",
  authDomain: "arcpark-1532921739973.firebaseapp.com",
  databaseURL: "https://arcpark-1532921739973.firebaseio.com",
  projectId: "arcpark-1532921739973",
  storageBucket: "arcpark-1532921739973.appspot.com",
  messagingSenderId: "569429999510"
});

export const db = firebaseApp.database();