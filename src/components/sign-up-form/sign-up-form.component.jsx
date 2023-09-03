import { useState } from 'react'

import { createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'

import FormInput from '../form-input/form-input.component'

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
                email, password);
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
       <div>
        <h1>Sign up with your email and password</h1>
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

            {/* <FormInput 
                label="Email"
                type="email"
                required
                onChange={handleChange}
                name="email"
                value={email}
            />

            <FormInput 
                label="Password"
                type="password"
                required
                onChange={handleChange}
                name="password"
                value={password}
            />

            <FormInput 
                label="Confirm Password"
                type="password"
                required
                onChange={handleChange}
                name="confirmPassword"
                value={confirmPassword}
            /> */}

            <button type="submit">Sign Up</button>
        </form>
       </div> 
    )
}

export default SignUpForm;