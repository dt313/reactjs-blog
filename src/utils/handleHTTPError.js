import { useDispatch } from 'react-redux';

const redirectToNotFoundPage = () => {
    if (typeof window !== 'undefined') {
        window.location.href = '/404';
    }
};

const redirectToLoginPage = (path) => {
    if (path) {
        window.location.href = `/login?continue=${path}`;
    } else {
        window.location.href = '/login';
    }
};

export default function handleHTTPError(error) {
    console.log(error);
    switch (error.code) {
        case 9996:
            alert('UnAuthenticated');
            redirectToLoginPage();

        default:
            break;
    }
}
