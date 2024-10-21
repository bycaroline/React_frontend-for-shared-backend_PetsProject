import React from 'react';
import HeaderAuthenticated from '../components/HeaderAuthenticated';
import PetList from '../components/PetList';



const StartPage = () => {


    return (
        <div>
            <HeaderAuthenticated />
            <PetList />
        </div>
    )
};

export default StartPage;