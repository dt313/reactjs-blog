import { LOGIN, LOGOUT } from '../actions/authAction';

import { tokenUtils } from '~/utils';

const initialState = {
    isAuthentication: !!tokenUtils.getAccessToken(),
    userId: parseInt(tokenUtils.getUserId()) || null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const userId = action.payload;
            return {
                ...state,
                isAuthentication: true,
                userId: parseInt(userId),
            };
        case LOGOUT:
            return {
                ...state,
                isAuthentication: false,
                userId: null,
            };
        default:
            return state;
    }
};

export default authReducer;
