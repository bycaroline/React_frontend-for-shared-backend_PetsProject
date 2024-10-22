import React from 'react'; // Importing React
import DeletePetButton from '../components/DeletePetButton'; // Importing the DeletePetButton component
import UpdateUserComponent from '../components/UpdateUserComponent'; // Importing the UpdateUser
import UpdatePasswordButton from '../components/UpdatePasswordButton'; // Importing the UpdatePasswordButton

const TestPage = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Test Page for Pet Deletion, User Update, and Password Update</h1>

            <p>Den här sidan låter dig ta bort ett husdjur genom att ange husdjurets ID.</p>
            <DeletePetButton /> {/* Rendering the DeletePetButton component */}

            <hr /> {/* Adding a separator line */}

            <h2>Uppdatera användarens roll</h2> {/* Section title for updating user role */}
            <UpdateUserComponent /> {/* Rendering the UpdateUserComponent */}

            <hr /> {/* Adding another separator line */}

            {/* updating user password */}
            <UpdatePasswordButton /> {/* Rendering the UpdatePasswordButton */}
        </div>
    );
};

export default TestPage; // Exporting the TestPage component for use in other parts of the application
