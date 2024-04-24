import axios from '~/config/axios';

export const login = async ({ data }) => {
    try {
        const res = await axios.post('/login', data);
        return res.data;
    } catch (error) {
        console.log('Service', error);
    }
};

export const logout = async () => {
    try {
        const res = await axios.post('/logout');
        return res.data;
    } catch (error) {
        console.log('Service', error);
    }
};
