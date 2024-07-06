// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // Base URL for JSONPlaceholder API
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
