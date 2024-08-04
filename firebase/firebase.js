import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATdIDYUQrLu6DWTc4SWy9SCbxTFynYvkM",
  authDomain: "pantry-tracker-6da0d.firebaseapp.com",
  projectId: "pantry-tracker-6da0d",
  storageBucket: "pantry-tracker-6da0d.appspot.com",
  messagingSenderId: "710034957466",
  appId: "1:710034957466:web:98f337f23bd0ac18a82b23",
  measurementId: "G-R06FHS7KVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);