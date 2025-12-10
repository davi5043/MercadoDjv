
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js"
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } 
    from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"


const firebaseConfig = {
  apiKey: "AIzaSyD3NAAjJnBGFEkP6SedVdnJCl70B9q57q0",
  authDomain: "mercado-1f2f8.firebaseapp.com",
  projectId: "mercado-1f2f8",
  storageBucket: "mercado-1f2f8.firebasestorage.app",
  messagingSenderId: "724183587012",
  appId: "1:724183587012:web:ea595196b6b6a2df475191",
  measurementId: "G-4HFPS9EXQK"
}


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


export { db, collection, addDoc, getDocs, updateDoc, doc, deleteDoc }