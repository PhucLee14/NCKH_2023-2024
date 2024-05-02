// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD79ssyVIF-4P6AObd6ecG5jnTBev-d3AM",
    authDomain: "nckh-118de.firebaseapp.com",
    projectId: "nckh-118de",
    storageBucket: "nckh-118de.appspot.com",
    messagingSenderId: "1013257029960",
    appId: "1:1013257029960:web:3cf9887b86a0cf921a0b7d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

export default storage;
// export default app;
