export default function getDateTimeLocal() {
    const now = new Date();

    now.setMinutes(now.getMinutes() + 10);
    // const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

    return localDateTime;
}
