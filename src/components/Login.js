import React, { useState } from 'react';
import { login } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            navigate('/startsida')
        } else {
            alert('Logga in misslyckades')
        }
    };

    return (

        <div class="container">
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="username">Användarnamn</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="username"
                        class="form-control"
                        id="username"
                        placeholder="Skriv användarnamn"></input>
                </div>
                <div class="form-group">
                    <label for="pwd">Lösenord:</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        class="form-control"
                        id="pwd"
                        placeholder="Skriv lösenord"></input>
                </div>
                <div class="checkbox">

                </div>
                <button type="submit" class="btn btn-info">Logga in</button>
            </form>
        </div>

    );
};

export default Login;