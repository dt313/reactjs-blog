export const OPEN_SHAREBOX = 'OPEN_SHAREBOX';
export const CLOSE_SHAREBOX = 'CLOSE_SHAREBOX';

export function open() {
    return {
        type: OPEN_SHAREBOX,
    };
}

export function close() {
    return {
        type: CLOSE_SHAREBOX,
    };
}
