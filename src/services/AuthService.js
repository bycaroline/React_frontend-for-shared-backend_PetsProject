import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            return true;
        }
        return false;
    } catch (error) {
        console.error('Login failed', error);
        return false;

    }
};

export const signup = async (username, password, isAdmin) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, { username, password, isAdmin });
        const { message } = response.data;
        if (response.status === 201 || response.status === 200) {
            console.log("Användare registerarad")
            return { success: true, message: message || 'User registered successfully.' }
        }
    }
    catch (error) {
        console.error('Registreraing misslyckades', error);
        return { success: false, message: error.response?.data?.message || 'An error occurred during registration.' };
    }

}


export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; //!! används för att säkerställa att true returneras om det finns en token och false om ingen token finns.
}