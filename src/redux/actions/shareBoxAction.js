export const OPEN_SHAREBOX = 'OPEN_SHAREBOX';
export const CLOSE_SHAREBOX = 'CLOSE_SHAREBOX';

export function open(href) {
    return {
        type: OPEN_SHAREBOX,
        href,
    };
}

export function close() {
    return {
        type: CLOSE_SHAREBOX,
    };
}
