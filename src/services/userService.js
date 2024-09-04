import axios from '~/config/axios';

export const getAllUsers = async () => {
    try {
        const res = await axios.get('/users');
        return res;
    } catch (error) {
        throw new Error(error?.message || 'Failed to get users');
    }
};

export const createUser = async (data) => {
    try {
        const res = await axios.post('/users', data);
        return res;
    } catch (error) {
        throw new Error(error?.message || 'Failed to register');
    }
};

export const getMyInfomation = async () => {
    try {
        const res = await axios.get('/users/me');
        return res;
    } catch (error) {
        throw new Error(error?.message || 'Failed to fetch infomation');
    }
};

export const getInfomationByUsername = async (username) => {
    try {
        const res = await axios.get(`/users/${username}`);
        return res;
    } catch (error) {
        throw new Error(error?.message || 'Failed to fetch infomation');
    }
};
