import React from 'react';
import HeaderAuthenticated from '../components/HeaderAuthenticated';


const HomePage = () => {


    return (
        <div>
            <HeaderAuthenticated />
            <h1>Du har loggat in och är nu på startsidan</h1>
            <PetList />
            <UserList />
        </div>
    )
};

export default HomePage;