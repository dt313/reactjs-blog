import defaultFn from '~/utils/defaultFn';

export default function requireAuthFn(isAuthenticated = false, succesCallback = defaultFn, failedCallback = defaultFn) {
    if (isAuthenticated) {
        succesCallback();
    } else failedCallback();
}
