// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA_mqTWRoMT0BAsdG1oTEr7iCYM0cAwPaM',
  authDomain: 'alpha-project-270953.firebaseapp.com',
  projectId: 'alpha-project-270953',
  storageBucket: 'alpha-project-270953.firebasestorage.app',
  messagingSenderId: '21366782642',
  appId: '1:21366782642:web:6415ffdb32bfdd6a80a7ab',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()
