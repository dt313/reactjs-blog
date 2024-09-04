export default function sortByTime(array) {
    return array.sort((a, b) => a.created_at - b.create_at);
}
