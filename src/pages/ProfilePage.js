import React, { useState } from 'react';
import HeaderAuthenticated from "../components/HeaderAuthenticated";
import UpdatePetModal from "../components/UpdatePetModal";
import UpdateUserModal from "../components/UpdateUserModal";
import DeletePetModal from "../components/DeletePetModal";
import UpdatePasswordModal from "../components/UpdatePasswordModal";
import AddPetModal from "../components/AddPetModal";
import DeleteUserModal from "../components/DeleteUserModal"; // Importera DeleteUserModal
import pets from '../assets/pets.jpeg';

const ProfilePage = () => {
    const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
    const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false);
    const [isDeletePetModalOpen, setIsDeletePetModalOpen] = useState(false);
    const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);
    const [isUpdatePetModalOpen, setIsUpdatePetModalOpen] = useState(false); // State for UpdatePetModal
    const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false); // State for DeleteUserModal

    const openUpdateUserModal = () => setIsUpdateUserModalOpen(true);
    const closeUpdateUserModal = () => setIsUpdateUserModalOpen(false);

    const openUpdatePasswordModal = () => setIsUpdatePasswordModalOpen(true);
    const closeUpdatePasswordModal = () => setIsUpdatePasswordModalOpen(false);

    const openDeletePetModal = () => setIsDeletePetModalOpen(true);
    const closeDeletePetModal = () => setIsDeletePetModalOpen(false);

    const openAddPetModal = () => setIsAddPetModalOpen(true);
    const closeAddPetModal = () => setIsAddPetModalOpen(false);

    const openUpdatePetModal = () => setIsUpdatePetModalOpen(true); // Function to open UpdatePetModal
    const closeUpdatePetModal = () => setIsUpdatePetModalOpen(false); // Function to close UpdatePetModal

    const openDeleteUserModal = () => setIsDeleteUserModalOpen(true); // Function to open DeleteUserModal
    const closeDeleteUserModal = () => setIsDeleteUserModalOpen(false); // Function to close DeleteUserModal

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
                    <button style={styles.navButton} onClick={openAddPetModal}>Lägg till husdjur</button>
                    <button style={styles.navButton} onClick={openUpdatePetModal}>Uppdatera husdjur</button>
                    <button style={styles.navButton} onClick={openDeletePetModal}>Ta bort husdjur</button>
                    <button style={styles.navButton} onClick={openDeleteUserModal}>Ta bort användare</button> {/* Knapp för DeleteUserModal */}
                </div>

                {/* Huvudinnehåll */}
                <div style={styles.mainContent}>
                    <h2 style={styles.title}>Välkommen till din profil</h2>
                    <p style={styles.description}>I menyn till vänster kan du hantera dina inställningar och husdjur.</p>

                    {/* Modaler */}
                    <UpdateUserModal isModalOpen={isUpdateUserModalOpen} closeModal={closeUpdateUserModal} />
                    <UpdatePasswordModal isModalOpen={isUpdatePasswordModalOpen} closeModal={closeUpdatePasswordModal} />
                    <DeletePetModal isModalOpen={isDeletePetModalOpen} closeModal={closeDeletePetModal} />
                    <AddPetModal isModalOpen={isAddPetModalOpen} closeModal={closeAddPetModal} />
                    <UpdatePetModal isModalOpen={isUpdatePetModalOpen} closeModal={closeUpdatePetModal} /> {/* Added UpdatePetModal */}
                    <DeleteUserModal show={isDeleteUserModalOpen} handleClose={closeDeleteUserModal} /> {/* Added DeleteUserModal */}

                    {/* Bild längst ner */}
                    <div style={styles.imageContainer}>
                        <img src={pets} alt="Våra husdjur" style={styles.image} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Stilar för komponenten
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
    },
    headerWrapper: {
        // Om det behövs kan du lägga till stilar för header
    },
    contentWrapper: {
        display: 'flex',
        flex: 1,
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
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
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Justera innehållet till toppen
    },
    title: {
        marginBottom: '20px', // Lägg till mellanrum under titeln
    },
    description: {
        marginBottom: '40px', // Lägg till mellanrum under beskrivningen
    },
    imageContainer: {
        marginTop: '40px', // Lägg till mellanrum över bilden
        textAlign: 'center',
    },
    image: {
        display: 'block',
        margin: 'auto',
        width: '80%', // Justera storlek på bilden om så önskas
        maxWidth: '600px', // Max bredd för bilden
    },
};

export default ProfilePage;
