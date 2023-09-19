import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCJnuc4BpXlLA-WKnr4ggc0OnhQIUqCyXI",
    authDomain: "image-gallery-e3fac.firebaseapp.com",
    projectId: "image-gallery-e3fac",
    storageBucket: "image-gallery-e3fac.appspot.com",
    messagingSenderId: "540959217853",
    appId: "1:540959217853:web:470cd82b2058ee4e1cbfd4",
    measurementId: "G-GRQ79KRNRX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
