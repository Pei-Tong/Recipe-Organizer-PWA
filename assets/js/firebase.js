// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 新增 Authentication 匯入

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7UqECLIMhMXofB0ZsmB-cqSrbRxk53VI",
  authDomain: "recipe-organizer-pwa.firebaseapp.com",
  projectId: "recipe-organizer-pwa",
  storageBucket: "recipe-organizer-pwa.firebasestorage.app",
  messagingSenderId: "523889521938",
  appId: "1:523889521938:web:3ff88954b9ba279af22fcb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // 初始化 Authentication

export { db, getDocs, addDoc, collection, deleteDoc, doc, getDoc, updateDoc, auth }; // 匯出 auth