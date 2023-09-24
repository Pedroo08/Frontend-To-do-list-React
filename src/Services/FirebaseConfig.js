// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const key = process.env.REACT_APP_FIREBASE_APIKEY;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: key,
  authDomain: "app-todolist-pedro.firebaseapp.com",
  projectId: "app-todolist-pedro",
  storageBucket: "app-todolist-pedro.appspot.com",
  messagingSenderId: "183635323696",
  appId: "1:183635323696:web:e51ff7f3181356540db6f5"}




/*{
  apiKey: "AIzaSyDxdZ53C8Y0JNqjgozCSjC9_b9YDWVkBPc",
  authDomain: "app-todolist-pedro.firebaseapp.com",
  projectId: "app-todolist-pedro",
  storageBucket: "app-todolist-pedro.appspot.com",
  messagingSenderId: "183635323696",
  appId: "1:183635323696:web:e51ff7f3181356540db6f5"}
*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

