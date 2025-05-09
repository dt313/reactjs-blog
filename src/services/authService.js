import axios from '~/config/axios';
import setError from '~/helper/setError';

export const login = async (data) => {
    try {
        const res = await axios.post('/auth/login', data);
        return res?.data;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to login');
    }
};

export const logout = async (token) => {
    try {
        const res = await axios.post('/auth/logout', { token });
        return res.data;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to logut');
    }
};

export const refreshToken = async (token) => {
    try {
        const res = await axios.post('/auth/refresh', { token });
        return res.data;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed');
    }
};
