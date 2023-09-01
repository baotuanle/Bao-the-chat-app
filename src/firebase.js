import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFTbNmbODW2uw3xvXSzwUreBLAiUQ8X4c",
  authDomain: "messaing-app-4c788.firebaseapp.com",
  projectId: "messaing-app-4c788",
  storageBucket: "messaing-app-4c788.appspot.com",
  messagingSenderId: "265740891315",
  appId: "1:265740891315:web:4c0bb42bff2634b5e9acc6"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
