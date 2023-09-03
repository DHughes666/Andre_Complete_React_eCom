import { useState } from 'react'

import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);
            console.log(response);
        } catch (err) {
            console.log(err);
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
            <label>Name</label>
            <input type="text" onChange={handleChange} 
            required name='displayName' value={displayName}/>

            <label>Email</label>
            <input type="email" onChange={handleChange} 
            required name='email' value={email}/>

            <label>Password</label>
            <input type="password" onChange={handleChange} 
            required name='password' value={password}/>

            <label>Confirm Password</label>
            <input type="password" onChange={handleChange} 
            required name='confirmPassword' value={confirmPassword}/>

            <button type="submit">Sign Up</button>
        </form>
       </div> 
    )
}

export default SignUpForm;