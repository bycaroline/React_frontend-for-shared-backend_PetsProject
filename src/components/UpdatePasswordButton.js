import React, { useState } from 'react'; // Importerar React och useState för state-hantering
import UpdatePasswordService from '../services/UpdatePasswordService'; // Importerar tjänsten för att uppdatera lösenord

const UpdatePasswordButton = () => {
    const [newPassword, setNewPassword] = useState(''); // State för nytt lösenord
    const [confirmPassword, setConfirmPassword] = useState(''); // State för bekräfta nytt lösenord
    const [message, setMessage] = useState(''); // State för att visa meddelande till användaren

    // Funktion som hanterar lösenordsuppdatering
    const handleUpdatePassword = async () => {
        // Kontrollera om det nya lösenordet och bekräftelsen matchar
        if (newPassword !== confirmPassword) {
            setMessage('Lösenorden matchar inte.'); // Visar felmeddelande om lösenorden inte matchar
            return;
        }

        // Skapa DTO med nytt lösenord och bekräftat lösenord
        const passwordDto = {
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };

        try {
            // Hämtar authToken från localStorage (eller där den är lagrad efter inloggning)
            const token = localStorage.getItem('authToken');

            // Använder tjänsten för att uppdatera lösenordet
            await UpdatePasswordService.updatePassword(passwordDto, token);

            // Återställer formuläret och visar ett lyckat meddelande
            setMessage('Lösenordet har uppdaterats!');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            // Visar ett felmeddelande om något går fel
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

export default UpdatePasswordButton;
