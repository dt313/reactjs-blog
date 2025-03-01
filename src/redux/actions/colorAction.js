import { tokenUtils } from '~/utils';
export const CHANGE_THEME = 'CHANGE_THEME';
export const CHANGE_PRIMARY_COLOR = 'CHANGE_PRIMARY_COLOR';
export function changeTheme(payload) {
    return {
        type: CHANGE_THEME,
    };
}

export function changePrimaryColor(color) {
    return {
        type: CHANGE_PRIMARY_COLOR,
        payload: color,
    };
}
