// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBgYBSzZCDsgQSurLZDP1GCw1g0aVLKEnw',
  authDomain: 'chat-c0740.firebaseapp.com',
  projectId: 'chat-c0740',
  storageBucket: 'chat-c0740.appspot.com',
  messagingSenderId: '709541071321',
  appId: '1:709541071321:web:93277db6ab1bb61f8571c8'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)
