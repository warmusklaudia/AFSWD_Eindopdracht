import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  Auth,
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app: FirebaseApp = initializeApp(firebaseConfig)
const auth: Auth = getAuth(app)
setPersistence(auth, browserLocalPersistence)

export default () => {
  // Initialize Firebase

  return { app, auth }
}
