import { LOGIN, LOGOUT } from '../actions/authAction';

import { tokenUtils } from '~/utils';

const initialState = {
    isAuthtication: !!tokenUtils.getAccessToken(),
    userId: tokenUtils.getUserId() || null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const userId = action.payload;
            return {
                ...state,
                isAuthtication: true,
                userId: userId,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthtication: false,
                userId: {},
            };
        default:
            return state;
    }
};

export default authReducer;
