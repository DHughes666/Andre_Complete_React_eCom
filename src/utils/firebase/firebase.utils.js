import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, 
        signInWithEmailAndPassword,
        signInWithPopup, 
        createUserWithEmailAndPassword,
        GoogleAuthProvider,
        signOut,
        onAuthStateChanged
    } from 'firebase/auth';

import { getFirestore, doc, getDoc, 
        setDoc, collection, writeBatch } from 'firebase/firestore';

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
export const signInWithGooglePopup = () => signInWithPopup(auth, 
    googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, 
    googleProvider);

export const ecomDB = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(ecomDB, collectionKey);
    const batch = writeBatch(ecomDB);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
     
}

export const createUserDocumentFromAuth = async (userAuth, extraInfo) => {
    if(!userAuth) return;

    const userDocRef = doc(ecomDB, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //if user data does not exist
    //create or set the document with the data from userAuth in my collection
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, email, createdAt, ...extraInfo
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

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(
    auth, callback);