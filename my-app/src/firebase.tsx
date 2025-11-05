import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYCpUTqqS-dA4koI1PlGf4eilnB3uM49Y",
  authDomain: "movielisting-c1d1d.firebaseapp.com",
  projectId: "movielisting-c1d1d",
  storageBucket: "movielisting-c1d1d.firebasestorage.app",
  messagingSenderId: "415878562167",
  appId: "1:415878562167:web:35f94e4eba3db6d70be172",
  measurementId: "G-C68WJVDTGJ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider  };
