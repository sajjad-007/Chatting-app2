// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCgN4u5FT9eWMZwYYldGlNvtAIWo06RNEE",
  authDomain: "chatting-app2-94a66.firebaseapp.com",
  databaseURL: "https://chatting-app2-94a66-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatting-app2-94a66",
  storageBucket: "chatting-app2-94a66.appspot.com",
  messagingSenderId: "191903062709",
  appId: "1:191903062709:web:24a8042c17fff04754fcfc",
  measurementId: "G-938B8QVREV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig
