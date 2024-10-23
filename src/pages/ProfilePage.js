import React from 'react';
import HeaderAuthenticated from "../components/HeaderAuthenticated";
import UpdateUserButton from "../components/UpdateUserButton";
import DeletePetButton from "../components/DeletePetButton";
import UpdatePasswordButton from "../components/UpdatePasswordButton";
import AddPetButton from "../components/AddPetButton";
const ProfilePage = () => {
    return (
        <div style={styles.container}>
            {/* Header för autentiserade användare */}
            <div style={styles.headerWrapper}>
                <HeaderAuthenticated />
            </div>

            {/* Lista över olika alternativ (uppdatera användare, uppdatera lösenord, radera husdjur) */}
            <div style={styles.listContainer}>
                <div style={styles.list}>
                    <UpdateUserButton />
                </div>
                <div style={styles.list}>
                    <UpdatePasswordButton />
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