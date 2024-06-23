export default function getTableType(type) {
    switch (type) {
        case 'article':
            return 'ARTICLE';
        case 'question':
            return 'QUESTION';
    }
}
