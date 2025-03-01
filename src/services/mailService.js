import axios from '~/config/axios';
import setError from '~/helper/setError';

export const getOpt = async ({ to }) => {
    try {
        const res = await axios.get(`/mail/otp?to=${to}`);
        return res?.data;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to fetch the notification');
    }
};

export const getResetPasswordLink = async ({ to }) => {
    try {
        const res = await axios.get(`/mail/reset-password-link?to=${to}`);
        return res?.data;
    } catch (error) {
        let err = setError(error);
        throw new Error(err || 'Failed to fetch the notification');
    }
};
