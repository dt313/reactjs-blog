import axios from '~/config/axios';

export const getAllNotificationsByUser = async ({ id, pageSize, pageNumber }) => {
    try {
        const res = await axios.get(`/notifications/${id}?pageNumber=${pageNumber}&&pageSize=${pageSize}`);
        return res?.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const createNotification = async (data) => {
    try {
        const res = await axios.post(`/notifications`, data);
        return res?.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const readNotification = async (id) => {
    try {
        const res = await axios.get(`/notifications/read/${id}`);
        return res?.data;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};

export const readAllNotificationByUser = async (id) => {
    try {
        const res = await axios.get(`/notifications/read`);
        return res;
    } catch (error) {
        console.log('Service', error);
        return error.response?.data;
    }
};
