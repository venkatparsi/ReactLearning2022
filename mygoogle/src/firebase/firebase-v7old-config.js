import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsLbINxmRxtElNsoqW3K6l6GFHXTCTSq0",
  authDomain: "my-9154c.firebaseapp.com",
  projectId: "my-9154c",
  storageBucket: "my-9154c.appspot.com",
  messagingSenderId: "92459531719",
  appId: "1:92459531719:web:a63da8209deedd46ad6de2",
  measurementId: "G-XGTDLYVY6Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
