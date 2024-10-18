import React from 'react'
import { isAuthenticated } from '../services/AuthService'
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Logout() {
    const navigate = useNavigate();

    const handleClick = async (e) => {
        localStorage.removeItem('token');
        navigate('/');


    }

    return (
        <div>
            <button onClick={handleClick} type="button" class="btn btn-outline-light">Logga ut</button>
        </div>
    )
}

export default Logout