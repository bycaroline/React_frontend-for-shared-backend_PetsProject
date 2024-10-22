import React from 'react'
import { Link } from 'react-router-dom'
import HeaderAuthenticated from "../components/HeaderAuthenticated";
import UpdateUserButton from "../components/UpdateUserButton";
import DeletePetButton from "../components/DeletePetButton";


const ProfilePage = () => {
    return (
        <div style={styles.container}>
            <div style={styles.headerWrapper}>
                <HeaderAuthenticated />
            </div>
            <div style={styles.listContainer}>
                <div style={styles.list}>
                    <UpdateUserButton />
                </div>
                <div style={styles.list}>
                    <DeletePetButton />
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    headerWrapper: {
        width: '100%',
    },
    listContainer: {
        display: 'flex',
        alignItems: 'left', // Vänsterjustera listContainer
        justifyContent: 'center', // Centrera listContainer
        margin: '20px',
        width: '80%',
        maxWidth: '1200px',
    },
    list: {
        flex: 1,
        margin: '0 40px', // Minska avståndet mellan listorna till 20px
        minWidth: '300px',
        textAlign: 'center', // Centrera innehållet inom varje lista
    },
};


export default ProfilePage;