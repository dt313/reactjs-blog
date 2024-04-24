import { LOGIN, LOGOUT } from '../actions/authAction';

import { token } from '~/utils';

const initialState = {
    isAuthtication: !!token.getAccessToken(),
    user: {},
};

console.log('init :', token.getAccessToken());

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            const user = action.payload;
            return {
                ...state,
                isAuthtication: true,
                user: user,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthtication: false,
                user: {},
            };
        default:
            return state;
    }
};

export default authReducer;
