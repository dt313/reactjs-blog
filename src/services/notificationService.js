import axios from '~/config/axios';

export const getAllNotificationsByUser = async ({ id, pageSize, pageNumber }) => {
    try {
        const res = await axios.get(`/notifications/${id}?pageNumber=${pageNumber}&&pageSize=${pageSize}`);
        return res?.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed to fetch the notification');
    }
};

export const createNotification = async (data) => {
    try {
        const res = await axios.post(`/notifications`, data);
        return res?.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed to create notification');
    }
};

export const readNotification = async (id) => {
    try {
        const res = await axios.get(`/notifications/read/${id}`);
        return res?.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed to read notification');
    }
};

export const readAllNotificationByUser = async (id) => {
    try {
        const res = await axios.get(`/notifications/read`);
        return res.data;
    } catch (error) {
        throw new Error(error?.message || 'Failed to  read notifications');
    }
};
