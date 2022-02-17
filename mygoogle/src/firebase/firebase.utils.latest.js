import { initializeApp } from 'firebase/app';
import {getAuth,GoogleAuthProvider,createUserWithEmailAndPassword 
} from 'firebase/auth';
import firebaseConfig from './firebase-config'

import {
  getFirestore,
  getDoc,
  setDoc,
  doc
} from 'firebase/firestore';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const provider = new GoogleAuthProvider();


export const createUserProfileDocument = async (userAuth, additionalData) => {
 console.log("#### Start creating user profile doc.additionalData",additionalData)
  if (!userAuth ) 
  {
    console.log ("no userAuth found.. returning.")
    return;
  }
  //QueryReference or Query Snapshot. - document or collection.
  console.log("-> User Auth uid:", userAuth);
  const userRef = doc(db, 'users', userAuth.uid)
  //console.log("->User Document Ref in App DB for Google uid:", userRef);
  const docSnap = await getDoc(userRef);
  var displayName = undefined;
 // console.log("->Document Snapshot Ref in App DB ", docSnap);
  //console.log("FIRESTOREDOC",doc(getFirestore(app),'users/absd11123'));
  if (docSnap.exists()) {
    console.log("->User Document exists in Application DATA:", docSnap.data())
  } else {
      if(userAuth.displayName) displayName = userAuth.displayName;
      if(additionalData && additionalData.displayName)  displayName = additionalData.displayName;
      const { email} = userAuth;
      const createdAt = new Date();
      console.log("->No such document exist in app db ! ",
       "Creating new one now: DisplayName.",displayName);
    try {
      // Add a new document in collection "cities"
      console.log("-->Start Creating the document in App db with displayName:",displayName);
      await setDoc((userRef), {
        displayName,
        email,
        createdAt
      });
      console.log(" -->End Creating the document in App db.");

    } catch (error) {
      console.log(' ->Error creating document in App db.', error.message);
    }
    // doc.data() will be undefined in this case
   
  }
  console.log("#### End creating user profile doc.");
  return userRef;
}


export const createUserWithEmail = async (email,password,displayName) => {
  var user = await createUserWithEmailAndPassword(auth,email,password)
.then ((userCredential) => {
  //Signed in 
   user = userCredential.user;
   userCredential.user.displayName = displayName;
   user.displayName = displayName;
  console.log(" createUserWithEmailAndPassword User created is:",user);
  return user;
}).catch((error) => {
  console.log("Error while create user with email.",error.message);
  return null;
})
}


export default firebaseApp;