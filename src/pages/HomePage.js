import React from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import pets from '../assets/pets.jpeg';
import { useState } from 'react';

const HomePage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    const handleLoginClick = () => {
        setIsVisible(true)
        setIsLogin(true);
    };

    const handleSignupClick = () => {
        setIsVisible(true)
        setIsLogin(false);
    };

    return (
        <div>
            <header>
                <div class="collapse bg-dark" id="navbarHeader">
                </div>
                <div class="navbar navbar-dark bg-dark shadow-sm">
                    <div class="container">
                        <a href="#" class="navbar-brand d-flex align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                            <strong>Våra husdjur</strong>
                        </a>
                    </div>
                </div>
            </header>
            <main>
                <section class="py-5 text-center container">
                    <div class="row py-lg-5">
                        <div class="col-lg-6 col-md-8 mx-auto">
                            <h1 class="fw-light">Våra Husdjur</h1>
                            <p class="lead text-muted">Här hittar du alla våra kära husdjur. Registera dig och logga in för att lägga till ditt husdjur. Alla husdjur är välkomna! </p>
                            <div>
                                {isVisible && (isLogin ? <Login /> : <Signup />)}
                                <div>
                                    <a href="#" className="btn btn-primary my-2" onClick={handleLoginClick}>
                                        Logga in
                                    </a>
                                    <a href="#" className="btn btn-secondary my-2" onClick={handleSignupClick}>
                                        Registrera
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="album py-5 bg-light">
                    <img src={pets}
                        style={{ display: 'block', margin: 'auto' }} />
                </div>

            </main>

        </div>
    )
};

export default HomePage;