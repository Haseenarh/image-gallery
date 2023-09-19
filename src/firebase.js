import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJnuc4BpXlLA-WKnr4ggc0OnhQIUqCyXI",
    authDomain: "image-gallery-e3fac.firebaseapp.com",
    projectId: "image-gallery-e3fac",
    storageBucket: "image-gallery-e3fac.appspot.com",
    messagingSenderId: "540959217853",
    appId: "1:540959217853:web:470cd82b2058ee4e1cbfd4",
    measurementId: "G-GRQ79KRNRX"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
