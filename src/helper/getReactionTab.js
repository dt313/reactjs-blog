import { FaCaretDown } from 'react-icons/fa';
import getReactionIcon from './getReactionIcon';
import getReactionIconList from './getReactionIconList';

const getCountPerType = (list = [], type) => {
    return list.filter((r) => r.type === type).length;
};

const ListCountPerType = (list = [], type) => {
    return list.filter((r) => r.type === type);
};

const getTabObject = (list, type, test = false) => {
    if (test) {
        return {
            name: type,
            icon: getReactionIcon(type),
            type: type,
            additionIcon: null,
            count: 20,
            list: [
                {
                    reacted_user: {
                        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKP6d-nCnssMuzmdXrf4l_zi4BwMo9re9E9zAYTBBVYYwkTHjk=s96-c',
                        username: 'Hello',
                    },
                    type: type,
                },
                {
                    reacted_user: {
                        avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKP6d-nCnssMuzmdXrf4l_zi4BwMo9re9E9zAYTBBVYYwkTHjk=s96-c',
                        username: 'Hello',
                    },
                    type: type,
                },
            ],
        };
    }
    return {
        name: type,
        icon: getReactionIcon(type),
        type: type,
        additionIcon: null,
        count: getCountPerType(list, type),
        list: ListCountPerType(list, type),
    };
};
export default function getReactionTabs(list, size) {
    const listIcon = list.length ? getReactionIconList(list) : [];
    let newTabs = [];
    if (listIcon.length <= size) {
        newTabs = listIcon.map((type) => {
            return getTabObject(list, type);
        });
    } else {
        const newListIcon = listIcon.slice(0, size - 1);
        const remainList = listIcon.slice(size - 1);

        newTabs = newListIcon.map((type) => {
            return getTabObject(list, type);
        });

        newTabs = [
            ...newTabs,
            {
                name: 'Xem thêm',
                icon: null,
                type: 'MORE',
                additionIcon: FaCaretDown,
                count: 0,
                tabs: remainList.map((type) => getTabObject(list, type)),
            },
        ];
    }

    return [
        {
            name: 'Tất cả',
            type: 'ALL',
            icon: null,
            additionIcon: null,
            count: 0,
            list: list,
        },
        ...newTabs,
    ];
}
