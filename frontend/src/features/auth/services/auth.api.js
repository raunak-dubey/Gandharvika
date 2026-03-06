import axios from 'axios'

const authApi = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true
})

const handleError = (err, fallback) => {
    if (err.response?.data?.message) {
        throw new Error(err.response.data.message);
    }

    if (err.request) {
        throw new Error("Network error. Check your connection.");
    }

    throw new Error(fallback);
};

export const loginApi = async (identifier, password) => {
    try {
        const response = await authApi.post('/login', {
            identifier, password
        });

        return response.data;
    } catch (err) {
        handleError(err, "Login Failed. Please try again.");
    }
};

export const registerApi = async (username, email, password) => {
    try {
        const response = await authApi.post('/register', {
            username, email, password
        });

        return response.data;
    } catch (err) {
        handleError(err, "Registration Failed. Please try again.");
    }
};

export const logoutApi = async () => {
    try {
        const response = await authApi.post('/logout');
        return response.data;
    } catch (err) {
        handleError(err, "Logout Failed. Please try again.");
    }
};

export const getMeApi = async () => {
    try {
        const response = await authApi.get('/get-me');
        return response.data;
    } catch (err) {
        handleError(err, "Get User Failed. Please try again.");
    }
};