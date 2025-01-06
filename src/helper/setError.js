export default function setError(error) {
    switch (typeof error) {
        case 'string':
            return error;
        case 'object':
            return error.message;
        default:
            return String(error);
    }
}
