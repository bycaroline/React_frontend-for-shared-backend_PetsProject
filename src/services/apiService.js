import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://192.168.0.15:8080/api', // Bas-URL för API:et
});

apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiService;
