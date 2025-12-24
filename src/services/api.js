import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Gateway URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add JWT token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const loginWithGoogle = async (googleToken) => {
    const response = await api.post('/auth/google', { token: googleToken });
    if (response.data) {
        localStorage.setItem('jwt_token', response.data);
    }
    return response.data;
};

export const createReport = async (reportData) => {
    return await api.post('/reports', reportData);
};

export const createBooking = async (bookingData) => {
    return await api.post('/bookings', bookingData);
};

export default api;
