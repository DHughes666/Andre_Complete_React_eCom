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
            const response = await signInAuthWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
            
          
        } catch (error) {
            
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
                <Button buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
            </div>
            
        </form>
       </div> 
    )
}

export default SignInForm;