import { uniqBy } from 'lodash';
import getReactionIcon from './getReactionIcon';

export default function getReactionIconList(list) {
    let newList = uniqBy(list, 'type').map((r) => {
        return r.type;
    });
    return newList;
}
