import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBCpPR5x-TNXzm8gqLsvMgOEhJrnBY2urg",
    authDomain: "cronometro-7440f.firebaseapp.com",
    databaseURL: "https://cronometro-7440f-default-rtdb.firebaseio.com",
    projectId: "cronometro-7440f",
    storageBucket: "cronometro-7440f.appspot.com",
    messagingSenderId: "1009170111107",
    appId: "1:1009170111107:web:d4333613ae538b225cd9b6"
  };
  

  const app = initializeApp(firebaseConfig);
export default getFirestore(app)


