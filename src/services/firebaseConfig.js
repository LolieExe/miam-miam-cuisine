import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJQfXNadzGTbzKrEkwXeworwCdvHZ4vp4",
  authDomain: "miam-miam-project.firebaseapp.com",
  projectId: "miam-miam-project",
  storageBucket: "miam-miam-project.appspot.com",
  messagingSenderId: "418723350388",
  appId: "1:418723350388:web:62fdcdd5e6e231da908e21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };