export default function convertDataToTree(id, data) {
    const childrens = data.filter((p) => p.commentableId === id);

    return {
        id: id,
        childrens: childrens,
    };
}
