import { useState } from 'react'

import { signInWithGooglePopup, signInAuthWithEmailAndPassword, 
     } from '../../utils/firebase/firebase.utils'

import { SignInContainer, H2Tag, ButtonsContainer } from './sign-in-form.styles';

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

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
        await signInWithGooglePopup();
        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthWithEmailAndPassword(
                email, 
                password
            );
            
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
       <SignInContainer>
        <H2Tag>Already have an account?</H2Tag>
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

            <ButtonsContainer>
                <Button type='submit'>Sign In</Button>
                <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button'
                onClick={signInWithGoogle}>Google sign in</Button>
            </ButtonsContainer>
            
        </form>
       </SignInContainer> 
    )
}

export default SignInForm;