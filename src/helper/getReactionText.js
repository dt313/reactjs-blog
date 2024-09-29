export default function getReactionText(type) {
    switch (type) {
        case 'LOVE':
            return 'Đã yêu thích';
        case 'LIKE':
            return 'Đã thích';
        case 'SAD':
            return 'Buồn';
        case 'WOW':
            return 'Wow';
        case 'CARE':
            return 'Thương thương';
        case 'ANGRY':
            return 'Giận';
        case 'HAHA':
            return 'Haha';
        default:
            return 'Thích';
    }
}
