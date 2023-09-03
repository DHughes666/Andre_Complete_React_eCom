import { useState } from 'react'
import './sign-in-form.styles.scss';

import { signInWithGooglePopup, signInAuthWithEmailAndPassword, 
    createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthWithEmailAndPassword(
                email, password);
            console.log(response);
            resetFormFields();          
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('User not found');
                    break;
                default:
                    console.log(error);
            }
        }
        
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
       <div className='sign-up-container'>
        <h2>Already have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput 
                label="Email"
                inputOptions = {{
                    type:'email',
                    required: true,
                    onChange: handleChange,
                    name: 'email',
                    value: email
                }}
            />

            <FormInput 
                label="Password"
                inputOptions = {{
                    type:'password',
                    required: true,
                    onChange: handleChange,
                    name: 'password',
                    value: password
                }}
            />

            <div className='buttons-container'>
                <Button type='submit'>Sign In</Button>
                <Button buttonType='google' type='button'
                onClick={signInWithGoogle}>Google sign in</Button>
            </div>
            
        </form>
       </div> 
    )
}

export default SignInForm;