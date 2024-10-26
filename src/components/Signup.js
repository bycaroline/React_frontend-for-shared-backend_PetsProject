import React, { useState } from 'react';
import { signup } from '../services/AuthService';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username);
        const success = await signup(username, password, isAdmin);
        if (success) {
            console.log('Användare är registrerad');
            alert('Användare är registrerad. Logga in för att gå vidare')
        } else {
            alert('Registrering misslyckades. ')
        }
    }

    return (

        <div class="container">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="username">Användarnamn</label>
                    <input type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        class="form-control"
                        id="email"
                        placeholder="Skriv användarnamn"></input>
                </div>
                <div class="form-group">
                    <label for="pwd">Lösenord:</label>
                    <input type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        class="form-control"
                        id="pwd"
                        placeholder="Skriv lösenord"></input>
                </div>
                <div class="form-group">
                    <label for="admin">Admin</label>
                    <input
                        value={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.value)}

                        class="form-control"
                        placeholder="Skriv true eller false för admin"></input>
                </div>
                <div class="checkbox">

                </div>
                <button type="submit" class="btn btn-info">Registrera</button>
            </form>
        </div>

    );
};

export default Signup;