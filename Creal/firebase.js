// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC9_Db73dw80mMWMAx5EbI3qAVQs7-H7_A",
    authDomain: "instgram-demo-95594-41151.firebaseapp.com",
    projectId: "instgram-demo-95594",
    storageBucket: "instgram-demo-95594.appspot.com",
    messagingSenderId: "623795247980",
    appId: "1:623795247980:web:14981e38dfb9aed6e1b149",
    measurementId: "G-8RT9Q10M5V"
  
};

if (!firebase.apps.length) {
  initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);
export {firebase}
export const auth = getAuth();
export {firebaseConfig}
export const storage = getStorage(app)