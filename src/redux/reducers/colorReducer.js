import { tokenUtils } from '~/utils';
import { CHANGE_PRIMARY_COLOR, CHANGE_THEME } from '../actions/colorAction';

const initTheme = (theme) => {
    if (!tokenUtils.getTheme()) {
        tokenUtils.setTheme('dark');
        return 'dark';
    } else {
        return tokenUtils.getTheme();
    }
};

const initPrimaryColor = (theme) => {
    if (!tokenUtils.getPrimaryColor()) {
        tokenUtils.setPrimaryColor('accent');
        return 'accent';
    } else {
        return tokenUtils.getPrimaryColor();
    }
};

const initialState = {
    theme: initTheme(),
    primaryColor: initPrimaryColor(),
};

const colorReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            tokenUtils.setTheme(state.theme === 'dark' ? 'light' : 'dark');
            return {
                ...state,
                theme: state.theme === 'dark' ? 'light' : 'dark',
            };

        case CHANGE_PRIMARY_COLOR:
            tokenUtils.setPrimaryColor(action.payload);
            return {
                ...state,
                primaryColor: action.payload,
            };

        default:
            return state;
    }
};

export default colorReducer;
