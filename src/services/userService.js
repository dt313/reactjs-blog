import axios from '~/config/axios';
import setError from '~/helper/setError';
import { tokenUtils } from '~/utils';

export const getAllUsers = async () => {
    try {
        const res = await axios.get('/users');
        return res;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to get users');
    }
};

export const createUser = async (data) => {
    try {
        const res = await axios.post('/users', data);
        return res;
    } catch (error) {
        let err = setError(error);

        throw new Error(err || 'Failed to register');
    }
};

export const getMyInfomation = async () => {
    try {
        const res = await axios.get('/users/me');
        return res;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to fetch infomation');
    }
};

export const getInfomationByUsername = async (username) => {
    try {
        const res = await axios.get(`/users/${username}`);
        return res;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to fetch infomation');
    }
};

export const updateInfomation = async (id, infomation) => {
    try {
        const res = await axios.put(`/users/${id}`, infomation);
        return res;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to update infomation');
    }
};

export const uploadAvatar = async (id, file) => {
    try {
        const res = await axios.put(
            `/users/upload-avatar/${id}`,
            { file },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${tokenUtils.getAccessToken()}`,
                },
            },
        );
        return res;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to update infomation');
    }
};

export const resetPassword = async (token, password) => {
    try {
        const res = await axios.put(`/users/reset-password?token=${token}`, { password });
        return res;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to update infomation');
    }
};
