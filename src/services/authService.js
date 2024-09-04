import axios from '~/config/axios';

export const login = async (data) => {
    try {
        const res = await axios.post('/auth/login', data);
        return res?.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed to login');
    }
};

export const logout = async (token) => {
    try {
        const res = await axios.post('/auth/logout', { token });
        return res.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed to logut');
    }
};

export const refreshToken = async (token) => {
    try {
        const res = await axios.post('/auth/refresh', { token });
        return res.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed');
    }
};
