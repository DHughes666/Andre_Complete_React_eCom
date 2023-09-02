import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import { auth, signInWithGooglePopup, signInWithGoogleRedirect,
    createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const SignIn = () => {
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getRedirectResult(auth);
                if (response) {
                    const userDocRef = await createUserDocumentFromAuth(response.user);
                }
            } catch (err) {
                console.log(err);
            }

            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }

        fetchData()
    }, [])

    const popUpGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={popUpGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
        </div>
    )
}

export default SignIn;