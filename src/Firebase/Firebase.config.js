// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY_PASS, 
  authDomain: import.meta.env.VITE_AUTHDOMAIN_PASS, 
  projectId: import.meta.env.VITE_PROJECTID_PASS, 
  storageBucket: import.meta.env.VITE_STORAGEBUCKET_PASS, 
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID_PASS, 
  appId: import.meta.env.VITE_APPID_PASS
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth ;