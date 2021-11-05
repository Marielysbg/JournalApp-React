import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };

/* const firebaseConfigTesting = {
    apiKey: "AIzaSyDuWzaViHRvNTSJhhCdypSdjn3FrmsvMfY",
    authDomain: "redux-testing-acfb1.firebaseapp.com",
    projectId: "redux-testing-acfb1",
    storageBucket: "redux-testing-acfb1.appspot.com",
    messagingSenderId: "379956003565",
    appId: "1:379956003565:web:28a4d321b5b21ee311c2e4"
}; */
 
/*   if( process.env.NODE_ENV === 'test' ) {

    initializeApp(firebaseConfigTesting);

  } else {
    initializeApp(firebaseConfig);
  } */
  
  initializeApp(firebaseConfig);

  const db = getFirestore();

  const googleAuthProvider = new GoogleAuthProvider();

  export {
      db,
      googleAuthProvider
  }
