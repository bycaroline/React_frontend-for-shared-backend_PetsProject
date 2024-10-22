import React, { useState } from 'react';
import UpdatePasswordService from '../services/UpdatePasswordService';

const UpdatePasswordButton = () => {
    const [newPassword, setNewPassword] = useState(''); // State för nytt lösenord
    const [confirmPassword, setConfirmPassword] = useState(''); // State för bekräfta nytt lösenord
    const [message, setMessage] = useState(''); // State för att visa meddelande till användaren

    // Funktion that handles the update password button
    const handleUpdatePassword = async () => {
        // Hämtar authToken från localStorage
        const token = localStorage.getItem('authToken');

        // Create a DTO for the password
        const passwordDto = {
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };
        // Kontrollera om det nya lösenordet och bekräftelsen matchar
        if (newPassword !== confirmPassword) {
            setMessage('Lösenorden matchar inte.'); // show error message if passwords do not match
            return;
        }

        try {
            // Använder tjänsten för att uppdatera lösenordet
            await UpdatePasswordService.updatePassword(passwordDto, token);

            // show success message if password is updated och reset the input fields
            setMessage('Lösenordet har uppdaterats!');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setMessage(error.message || 'Något gick fel vid uppdateringen.');
        }
    };

    return (
        <div>
            <h2>Uppdatera Lösenord</h2> {/* Titel på sektionen */}
            <div>
                <input
                    type="password"
                    placeholder="Nytt lösenord" // Input för nytt lösenord
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} // Uppdaterar state för nytt lösenord
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Bekräfta nytt lösenord" // Input för att bekräfta nytt lösenord
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // Uppdaterar state för bekräftat nytt lösenord
                />
            </div>
            <button onClick={handleUpdatePassword}>Uppdatera Lösenord</button> {/* Knapp för att uppdatera lösenordet */}
            {message && <p>{message}</p>} {/* Visar meddelande, antingen ett fel eller ett framgångsmeddelande */}
        </div>
    );
};

export default UpdatePasswordButton; // Exporterar komponenten

