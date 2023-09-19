import React, { useState } from 'react';
import firebase from './firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            // Authentication successful, you can redirect or update UI as needed
        } catch (error) {
            // Handle Errors here.
            console.error("Error signing in with password and email:", error.message);
            alert(error.message); // Optionally alert the user about the error
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
