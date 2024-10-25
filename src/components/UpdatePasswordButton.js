import React, { useState } from 'react'; // Importerar React och useState för state-hantering
import UpdatePasswordService from '../services/UpdatePasswordService'; // Importerar tjänsten för att uppdatera lösenord

const UpdatePasswordButton = () => {
    const [newPassword, setNewPassword] = useState(''); // State för nytt lösenord
    const [confirmNewPassword, setConfirmNewPassword] = useState(''); // State för att bekräfta nytt lösenord
    const [message, setMessage] = useState(''); // State för att visa meddelande till användaren

    // Funktion som hanterar lösenordsuppdatering
    const handleUpdatePassword = async () => {
        // Hämta token från localStorage
        const token = localStorage.getItem('token');
        // Kontrollera om det nya lösenordet och bekräftelsen matchar
        if (newPassword !== confirmNewPassword) {
            setMessage('Lösenorden matchar inte.'); // Visar felmeddelande om lösenorden inte matchar
            return;
        }

        // Skapa DTO med nytt lösenord och bekräftelse
        const passwordDto = {
            newPassword: newPassword, // Skicka det nya lösenordet
            confirmNewPassword: confirmNewPassword // Skicka bekräftelselösenordet
        };

        try {
            // Använder tjänsten för att uppdatera lösenordet
            await UpdatePasswordService.updatePassword(passwordDto, token);

            // Återställer formuläret och visar ett lyckat meddelande
            setMessage('Lösenordet har uppdaterats!');
            setNewPassword(''); // Tömmer fältet för nytt lösenord
            setConfirmNewPassword(''); // Tömmer fältet för att bekräfta lösenord
        } catch (error) {
            // Visar ett felmeddelande om något går fel
            setMessage(error.response?.data?.message || 'Något gick fel vid uppdateringen.');
        }
    };

    return (
        <div>
            <h2>Uppdatera Lösenord</h2>
            <div>
                <input
                    type="password"
                    placeholder="Nytt lösenord"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Bekräfta nytt lösenord"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
            </div>
            <button onClick={handleUpdatePassword}>Uppdatera Lösenord</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdatePasswordButton;
