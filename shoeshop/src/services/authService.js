import axios from 'axios';

const API_URL = '/api/auth/';

const login = (email, password) => {
    // Mock API call
    return new Promise((resolve, reject) => {
        if (email === 'test@example.com' && password === 'password') {
            resolve({ email });
        } else {
            reject('Invalid credentials');
        }
    });
};

const authService = {
    login,
};

export default authService;
