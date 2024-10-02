export default function getDateTimeLocal({ hours = 0, minutes = 0 }) {
    const now = new Date();

    now.getHours(now.getHours() + hours);
    now.setMinutes(now.getMinutes() + minutes);
    // const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

    return localDateTime;
}
