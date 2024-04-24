import axios from '~/config/axios';

export const getAllUsers = async () => {
    try {
        const res = await axios.get('/users');
        return res;
    } catch (error) {
        console.log('Something Error');
    }
};
