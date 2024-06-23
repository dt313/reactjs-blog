import { visit } from 'unist-util-visit';
const UNDERLINE_REGEX = /~(.*)~/g;

const extractPosition = (string, start, end) => {
    const startLine = string.slice(0, start).split('\n');
    const endLine = string.slice(0, end).split('\n');

    return {
        start: {
            line: startLine.length,
            column: startLine[startLine.length - 1].length + 1,
        },
        end: {
            line: endLine.length,
            column: endLine[endLine.length - 1].length + 1,
        },
    };
};

const extractText = (string, start, end) => ({
    type: 'text',
    data: { hName: 'ins' },
    value: string.slice(start, end),
    position: extractPosition(string, start, end),
});

const underlinePlugin = () => {
    function transformer(tree) {
        console.log(tree);
        visit(tree, 'text', (node, position, parent) => {
            const definition = [];
            let lastIndex = 0;

            const matches = node.value.matchAll(UNDERLINE_REGEX);

            for (const match of matches) {
                const value = match[1];
                const type = 'underline';
                const tagName = 'ins';

                if (match.index !== lastIndex) {
                    definition.push(extractText(node.value, lastIndex, match.index));
                }

                definition.push({
                    type,
                    tagName,
                    children: [
                        extractText(
                            node.value,
                            match.index + 1, // 1 is start ~
                            match.index + value.length + 1, // 1 is start ~
                        ),
                    ],
                    position: extractPosition(
                        node.value,
                        match.index,
                        match.index + value.length + 2, // 2 is start and end ~
                    ),
                });

                lastIndex = match.index + value.length + 2; // 2 is start and end ~
            }

            if (lastIndex !== node.value.length) {
                const text = extractText(node.value, lastIndex, node.value.length);
                definition.push(text);
            }

            const last = parent.children.slice(position + 1);
            parent.children = parent.children.slice(0, position);
            parent.children = parent.children.concat(definition);
            parent.children = parent.children.concat(last);
        });
    }

    return transformer;
};

export default underlinePlugin;
