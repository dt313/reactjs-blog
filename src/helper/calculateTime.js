import { formatDistanceToNow } from 'date-fns';
import vi from 'date-fns/locale/vi';
export default function calculateTime(date = null) {
    const startTime = new Date(date);
    let time = formatDistanceToNow(startTime, { addSuffix: true, locale: vi });

    return time;
}
