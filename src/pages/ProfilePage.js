import React, { useState } from 'react';
import HeaderAuthenticated from "../components/HeaderAuthenticated";

import UpdateUserModal from "../components/UpdateUserModal";
import DeletePetModal from "../components/DeletePetModal";
import UpdatePasswordModal from "../components/UpdatePasswordModal";
import AddPetModal from "../components/AddPetModal";
import pets from '../assets/pets.jpeg';


const ProfilePage = () => {
    const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
    const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false);
    const [isDeletePetModalOpen, setIsDeletePetModalOpen] = useState(false);
    const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);

    const openUpdateUserModal = () => setIsUpdateUserModalOpen(true);
    const closeUpdateUserModal = () => setIsUpdateUserModalOpen(false);

    const openUpdatePasswordModal = () => setIsUpdatePasswordModalOpen(true);
    const closeUpdatePasswordModal = () => setIsUpdatePasswordModalOpen(false);

    const openDeletePetModal = () => setIsDeletePetModalOpen(true);
    const closeDeletePetModal = () => setIsDeletePetModalOpen(false);

    const openAddPetModal = () => setIsAddPetModalOpen(true);
    const closeAddPetModal = () => setIsAddPetModalOpen(false);

    return (
        <div style={styles.container}>
            <div style={styles.headerWrapper}>
                <HeaderAuthenticated />
            </div>

            <div style={styles.contentWrapper}>
                {/* Vertikal sidebar */}
                <div style={styles.sidebar}>
                    <button style={styles.navButton} onClick={openUpdateUserModal}>Uppdatera användare</button>
                    <button style={styles.navButton} onClick={openUpdatePasswordModal}>Uppdatera lösenord</button>
                    <button style={styles.navButton} onClick={openDeletePetModal}>Ta bort husdjur</button>
                    <button style={styles.navButton} onClick={openAddPetModal}>Lägg till husdjur</button>
                </div>

                {/* Huvudinnehåll */}
                <div style={styles.mainContent}>
                    <h2>Välkommen till din profil</h2>
                    <p>I menyn till vänster kan du hantera din profil.</p>

                    {/* Modaler */}
                    <UpdateUserModal isModalOpen={isUpdateUserModalOpen} closeModal={closeUpdateUserModal} />
                    <UpdatePasswordModal isModalOpen={isUpdatePasswordModalOpen} closeModal={closeUpdatePasswordModal} />
                    <DeletePetModal isModalOpen={isDeletePetModalOpen} closeModal={closeDeletePetModal} />
                    <AddPetModal isModalOpen={isAddPetModalOpen} closeModal={closeAddPetModal} />

                    {/* Bild längst ner */}
                    <div style={styles.imageContainer}>
                        <img src={pets} alt="Våra husdjur" style={styles.image} />
                    </div>
                </div>
                <div style={styles.list}>
                    <UpdatePetForm />
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
    },
    headerWrapper: {
        width: '100%',
        backgroundColor: '#333',
        padding: '10px 0',
    },
    contentWrapper: {
        display: 'flex',
        flex: 1,
        width: '100%',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#0a0a0a',
        padding: '20px',
        width: '200px',
        color: '#fff',
    },
    navButton: {
        backgroundColor: '#426e5f',
        color: '#fff',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'left',
        transition: 'background-color 0.3s',
    },
    mainContent: {
        flex: 1,
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'center',
    },
    imageContainer: {
        marginTop: '40px', // Lägger till avstånd ovanför bilden
        paddingBottom: '20px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
    },
};

export default ProfilePage;
