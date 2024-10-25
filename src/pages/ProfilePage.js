import React, { useState } from 'react'; // Import React and useState hook
import HeaderAuthenticated from "../components/HeaderAuthenticated"; // Importing the header component
import UpdateUserModal from "../components/UpdateUserModal"; // Importing the Update User Modal
import DeletePetModal from "../components/DeletePetModal"; // Importing the Delete Pet Modal
import UpdatePasswordModal from "../components/UpdatePasswordModal"; // Importing the Update Password Modal
import AddPetModal from "../components/AddPetModal"; // Importing the Add Pet Modal


const ProfilePage = () => {
    // State variables to control modal visibility
    const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
    const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false);
    const [isDeletePetModalOpen, setIsDeletePetModalOpen] = useState(false);
    const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false); // State for AddPetModal visibility

    const openUpdateUserModal = () => {
        setIsUpdateUserModalOpen(true);
    };

    const closeUpdateUserModal = () => {
        setIsUpdateUserModalOpen(false);
    };

    const openUpdatePasswordModal = () => {
        setIsUpdatePasswordModalOpen(true);
    };

    const closeUpdatePasswordModal = () => {
        setIsUpdatePasswordModalOpen(false);
    };

    const openDeletePetModal = () => {
        setIsDeletePetModalOpen(true);
    };

    const closeDeletePetModal = () => {
        setIsDeletePetModalOpen(false);
    };

    const openAddPetModal = () => {
        setIsAddPetModalOpen(true); // Open the AddPetModal
    };

    const closeAddPetModal = () => {
        setIsAddPetModalOpen(false); // Close the AddPetModal
    };

    return (
        <div style={styles.container}>
            {/* Vertikal navbar med knappar för olika modaler */}
            <div style={styles.sidebar}>
                <button style={styles.navButton} onClick={openUpdateUserModal}>
                    Uppdatera användare
                </button>
                <button style={styles.navButton} onClick={openUpdatePasswordModal}>
                    Uppdatera Lösenord
                </button>
                <button style={styles.navButton} onClick={openDeletePetModal}>
                    Ta bort Husdjur
                </button>
                <button style={styles.navButton} onClick={openAddPetModal}>
                    Lägg till Husdjur
                </button>
                {/* Add other buttons for other modals similarly */}
            </div>

            {/* Huvudinnehåll */}
            <div style={styles.mainContent}>
                <HeaderAuthenticated />
                <h2>Välkommen till din profil</h2>
                <p>Använd knapparna i menyn till vänster för att hantera dina uppgifter.</p>
            </div>

            {/* Modaler */}
            <UpdateUserModal isModalOpen={isUpdateUserModalOpen} closeModal={closeUpdateUserModal} />
            <UpdatePasswordModal isModalOpen={isUpdatePasswordModalOpen} closeModal={closeUpdatePasswordModal} />
            <DeletePetModal isModalOpen={isDeletePetModalOpen} closeModal={closeDeletePetModal} />
            <AddPetModal isModalOpen={isAddPetModalOpen} closeModal={closeAddPetModal} />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        width: '100%',
        height: '100vh',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#0a0a0a', // Svart bakgrund för sidebar
        padding: '20px',
        width: '200px',
        height: '100vh', // Full höjd
        color: '#fff',
    },
    navButton: {
        backgroundColor: '#426e5f', // Röd bakgrund, eller justera till önskad färg
        color: '#fff', // Vit text
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px', // Runda hörn
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'left', // Texten är vänsterjusterad
        transition: 'background-color 0.3s', // Lägga till en övergång för hover-effekt
    },
    navButtonHover: {
        backgroundColor: '#c9302c', // Mörkare röd för hover
    },
    mainContent: {
        flex: 1,
        padding: '20px',
        textAlign: 'center',
    },
};

export default ProfilePage;

