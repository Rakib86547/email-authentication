// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_h2c3riVobut4H9_equlvfDACRvYPU4E",
  authDomain: "email-authentication-pra.firebaseapp.com",
  projectId: "email-authentication-pra",
  storageBucket: "email-authentication-pra.appspot.com",
  messagingSenderId: "65625599461",
  appId: "1:65625599461:web:fe8c39a4108e985951930c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;