import { OPEN_SHAREBOX, CLOSE_SHAREBOX } from '../actions/shareBoxAction';

const initialState = {
    isOpen: false,
    href: '',
};

const shareBoxReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_SHAREBOX:
            return {
                isOpen: true,
                href: action.href,
            };
        case CLOSE_SHAREBOX:
            return {
                isOpen: false,
                href: '',
            };
        default:
            return state;
    }
};

export default shareBoxReducer;
