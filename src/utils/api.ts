import axios from 'axios';
const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

console.log(api, 'api');

export default api;
