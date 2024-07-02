import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const FirebaseInitilaiz = () => {
  initializeApp(firebaseConfig);
};

export default FirebaseInitilaiz;
