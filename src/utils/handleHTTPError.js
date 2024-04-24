const redirectToNotFoundPage = () => {
    if (typeof window !== 'undefined') {
        window.location.href = '/404';
    }
};
export default function handleHTTPError(statusCode, message) {
    switch (statusCode) {
        case 'ERR_BAD_REQUEST':
        // redirectToNotFoundPage();

        default:
            break;
    }
}
