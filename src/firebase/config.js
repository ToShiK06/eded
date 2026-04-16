import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	 apiKey: "AIzaSyCSelopBtoZjlfnTIqHF1eSaXdj-NdDXt0",
  authDomain: "danyaos4.firebaseapp.com",
  projectId: "danyaos4",
  storageBucket: "danyaos4.firebasestorage.app",
  messagingSenderId: "1011898454972",
  appId: "1:1011898454972:web:5b113662d683a04c7811b9"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
