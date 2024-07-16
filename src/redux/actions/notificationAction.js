export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const INITIAL_NOTIFICATIONS = 'INITIAL_NOTIFICATIONS';
export const READ_NOTIFICATION = 'READ_NOTIFICATION';
export const READ_ALL_NOTIFICATION = 'READ_ALL_NOTIFICATION';
export const SET_STOMP_CLIENT = 'SET_STOMP_CLIENT';

export function addNotification(newNotification) {
    return {
        type: ADD_NOTIFICATION,
        data: newNotification,
    };
}

export function initialNotifications(notifications) {
    return {
        type: INITIAL_NOTIFICATIONS,
        notifications,
    };
}

export function readNotification(id) {
    return {
        type: READ_NOTIFICATION,
        id: id,
    };
}

export function readAllNotification() {
    return {
        type: READ_ALL_NOTIFICATION,
    };
}
