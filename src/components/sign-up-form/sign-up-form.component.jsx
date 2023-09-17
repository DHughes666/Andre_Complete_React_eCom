import { useState } from 'react'

import { createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import { SignUpContainer, H2Tag } from './sign-up-form.styles';

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email, 
                password
            );
                  
            await createUserDocumentFromAuth(user, { displayName} );
            resetFormFields();
            console.log("Sign up successfull");
          
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Email already in');
            } else {
                console.log('User creation unsuccessful ', error.message);
            }
        }
        
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
       <SignUpContainer>
        <H2Tag>Don't have an account?</H2Tag>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput 
                label="Display Name"
                inputOptions = {{
                    type:'text',
                    required: true,
                    onChange: handleChange,
                    name: 'displayName',
                    value: displayName
                }}
            />

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

            <FormInput 
                label="Confirm Password"
                inputOptions = {{
                    type:'password',
                    required: true,
                    onChange: handleChange,
                    name: 'confirmPassword',
                    value: confirmPassword
                }}
            />

            <Button type='submit'>Sign Up</Button>
        </form>
       </SignUpContainer> 
    )
}

export default SignUpForm;