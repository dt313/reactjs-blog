import axios from '~/config/axios';

export const login = async (data) => {
    try {
        const res = await axios.post('/auth/login', data);
        return res?.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const logout = async (token) => {
    try {
        const res = await axios.post('/auth/logout', { token });
        return res.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};
