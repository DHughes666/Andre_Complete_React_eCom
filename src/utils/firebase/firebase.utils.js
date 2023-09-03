import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect,
        signInWithPopup, createUserWithEmailAndPassword,
        GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, doc, getDoc, 
        setDoc } from 'firebase/firestore';

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
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const ecomDB = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(ecomDB, 'users', userAuth.uid);


    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());

    //if user data does not exist
    //create or set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt
            });
        } catch(err) {
            console.log('error creating the user', err.message);
        }
    }

    return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};