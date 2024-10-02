import { OPEN_SHAREBOX, CLOSE_SHAREBOX } from '../actions/shareBoxAction';

const initialState = {
    isOpen: false,
};

const shareBoxReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_SHAREBOX:
            return {
                isOpen: true,
            };
        case CLOSE_SHAREBOX:
            return {
                isOpen: false,
            };
        default:
            return state;
    }
};

export default shareBoxReducer;
