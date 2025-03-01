import {
    ADD_NOTIFICATION,
    INITIAL_NOTIFICATIONS,
    LOAD_NOTIFICATIONS,
    READ_ALL_NOTIFICATION,
    READ_NOTIFICATION,
} from '../actions/notificationAction';

const initialState = {
    total: 0,
    countOfUnReaded: 0,
    notifications: [],
    page: 1,
    isEnd: false,
};

const notificationReducer = (state = initialState, action) => {
    let newNotifications = [];
    switch (action.type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                counnoticationCountter: state.noticationCount + 1,
                notifications: [action.data, ...state.notifications],
                countOfUnReaded: state.countOfUnReaded + 1,
            };

        case INITIAL_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications,
                total: action.notifications?.length || 0,
                countOfUnReaded: action.notifications?.filter((n) => n.is_readed === false).length,
            };
        case READ_NOTIFICATION:
            newNotifications = state.notifications.map((noti) => {
                if (noti.id === action.id) {
                    return { ...noti, is_readed: true };
                } else return noti;
            });
            return {
                ...state,
                notifications: newNotifications,
                countOfUnReaded: state.countOfUnReaded - 1,
            };

        case READ_ALL_NOTIFICATION:
            newNotifications = state.notifications.map((noti) => ({ ...noti, is_readed: true }));
            return {
                ...state,
                notifications: newNotifications,
                countOfUnReaded: 0,
            };
        case LOAD_NOTIFICATIONS:
            const unreadNotis = action.notifications?.filter((n) => n.is_readed === false).length;

            return {
                ...state,
                notifications: [...state.notifications, ...action.notifications],
                page: state.page + 1,
                countOfUnReaded: unreadNotis + state.countOfUnReaded,
                isEnd: action.notifications.length === 0,
            };

        default:
            return state;
    }
};

export default notificationReducer;
