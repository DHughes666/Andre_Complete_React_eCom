import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect,
        signInWithPopup, 
        GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAGoYxcl6j1qvS7yET9nLrHKstVs841BY",
    authDomain: "crown-clothing-db-afc94.firebaseapp.com",
    projectId: "crown-clothing-db-afc94",
    storageBucket: "crown-clothing-db-afc94.appspot.com",
    messagingSenderId: "424271249767",
    appId: "1:424271249767:web:c3bf8b4b99124074122fc2"
};

  // Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
