import Angry from '~/assets/svg/angry';
import Care from '~/assets/svg/care';
import Haha from '~/assets/svg/haha';
import Like from '~/assets/svg/like';
import Love from '~/assets/svg/love';
import Sad from '~/assets/svg/sad';
import Wow from '~/assets/svg/wow';
import { RiHeart3Line } from 'react-icons/ri';

export default function getReactionIcon(type) {
    switch (type) {
        case 'LIKE':
            return Like;
        case 'LOVE':
            return Love;
        case 'ANGRY':
            return Angry;
        case 'CARE':
            return Care;
        case 'SAD':
            return Sad;
        case 'WOW':
            return Wow;
        case 'HAHA':
            return Haha;
        default:
            return RiHeart3Line;
    }
}
