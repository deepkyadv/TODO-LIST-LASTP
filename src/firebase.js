import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDJPtzace0T_CEYEp3WKuaYfJkUQivRDjA",
  authDomain: "mytodos-cd17f.firebaseapp.com",
  projectId: "mytodos-cd17f",
  storageBucket: "mytodos-cd17f.appspot.com",
  messagingSenderId: "70123116169",
  appId: "1:70123116169:web:860d4a550eab0b7f3c5858"
};

export const app = initializeApp(firebaseConfig);