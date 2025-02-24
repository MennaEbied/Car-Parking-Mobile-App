import { initializeApp } from 'firebase/app';
import { getAuth , onAuthStateChanged,setPersistence,browserLocalPersistence } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import AsyncStorage from "@react-native-async-storage/async-storage";



const firebaseConfig = {
    apiKey: "AIzaSyAOaPt-csH-qQtrd4Vpqi2dgnD4dm1S55Q",
    authDomain: "authenticationapp-a895b.firebaseapp.com",
    projectId: "authenticationapp-a895b",
    storageBucket: "authenticationapp-a895b.appspot.com",
    messagingSenderId: "691488828619",
    appId: "1:691488828619:web:a57a5e75577a22d3da7f4e",
    measurementId: "G-C6F0JHB28Q"
  };

//const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Auth and export it
//export const auth = getAuth(firebaseApp);
//export default firebaseApp;
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);

//set persisttance
setPersistence(auth,browserLocalPersistence);