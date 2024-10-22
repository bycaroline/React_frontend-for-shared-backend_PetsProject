import axios from 'axios';

const apiService = axios.create({
    // baseURL: 'http://localhost:8080/api', // Bas-URL för API:et
    baseURL: 'http://husdjursregister1-env.eba-gzkbcjgw.eu-north-1.elasticbeanstalk.com/api'
});

apiService.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiService;
