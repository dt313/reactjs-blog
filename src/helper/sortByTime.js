export default function sortByTime(array) {
    return array.sort((a, b) => a.createdAt - b.createAt);
}
