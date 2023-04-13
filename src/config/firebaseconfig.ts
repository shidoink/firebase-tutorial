import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCM6z5AXBqYK0KEy7c_L_5XwfnzN2irwiE",
  authDomain: "fir-tutorial-3ccfb.firebaseapp.com",
  projectId: "fir-tutorial-3ccfb",
  storageBucket: "fir-tutorial-3ccfb.appspot.com",
  messagingSenderId: "396458625608",
  appId: "1:396458625608:web:ed8307a5c33e570428e67d",
  measurementId: "G-6GRWCMVD3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)