import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyA5jRKgEBojarPr-BpgyCJ-Y3Ld0VAAxoo",
  authDomain: "health-management-app-cb4d6.firebaseapp.com",
  databaseURL: "https://health-management-app-cb4d6.firebaseio.com",
  projectId: "health-management-app-cb4d6",
  storageBucket: "health-management-app-cb4d6.appspot.com",
  messagingSenderId: "1012152980855",
  appId: "1:1012152980855:web:4cdab364c26c028f2a7d72",
  measurementId: "G-9S2GLZP9SP",
};
// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
