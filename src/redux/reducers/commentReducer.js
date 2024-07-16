import {
    INIT_COMMENT_TREE,
    ADD_COMMENT,
    LOAD_MORE_COMMENT,
    DELETE_COMMENT,
    INIT_REPLY_COMMENT,
    REACTION_COMMENT,
    ADD_REPLY_COMMENT,
    DELETE_REPLY_COMMENT,
    LOAD_MORE_REPLY_COMMENT,
} from '../actions/commentAction';
import { uniqBy, sortBy } from 'lodash';

const setCommentNode = (data) => {
    return {
        ...data,
        page: 1,
        isSeeMore: false,
    };
};

const setCommentNodeList = (arr) => {
    const newTree = arr.map((node) => {
        return setCommentNode(node);
    });
    return newTree;
};

const initialState = {
    id: '',
    childrens: [],
    page: 1,
};

const commentReducer = (state = initialState, action) => {
    let newTree = [];
    switch (action.type) {
        case INIT_COMMENT_TREE:
            return {
                ...state,
                id: action.data.id,
                childrens: setCommentNodeList(action.data.childrens),
                page: 1,
            };

        case INIT_REPLY_COMMENT:
            const initReplies = (arr, id, data) => {
                return arr.map((el) => {
                    if (el.id === id) {
                        return {
                            ...el,
                            replies: el.replies
                                ? [...el.replies, ...setCommentNodeList(data)]
                                : [...setCommentNodeList(data)],
                            isSeeMore: true,
                        };
                    } else if (el.replies) {
                        return {
                            ...el,
                            replies: initReplies(el.replies, id, data),
                        };
                    }
                    return el;
                });
            };

            newTree = initReplies(state.childrens, action.id, action.data);
            return {
                ...state,
                childrens: newTree,
            };

        case ADD_COMMENT:
            return {
                ...state,
                childrens: [setCommentNode(action.data), ...state.childrens],
            };

        case ADD_REPLY_COMMENT:
            const addReplyComment = (arr, id, data) => {
                return arr.map((el) => {
                    if (el.id === id) {
                        return {
                            ...el,
                            replies: el.replies ? [...el.replies, data] : [data],
                            repliesCount: el.repliesCount + 1,
                            isSeeMore: true,
                        };
                    } else if (el.replies) {
                        return {
                            ...el,
                            replies: addReplyComment(el.replies, id, data),
                        };
                    }
                    return el;
                });
            };

            newTree = addReplyComment(state.childrens, action.parentId, setCommentNode(action.data));
            return {
                ...state,
                childrens: newTree,
            };

        case DELETE_COMMENT:
            return {
                ...state,
                childrens: state.childrens.filter((comment) => comment.id !== action.id),
            };

        case DELETE_REPLY_COMMENT:
            const deleteReplyComment = (arr, parentId, id) => {
                return arr.map((el) => {
                    if (el.id === parentId) {
                        return {
                            ...el,
                            replies: el.replies.filter((n) => n.id !== id),
                            repliesCount: el.repliesCount - 1,
                        };
                    } else {
                        return {
                            ...el,
                            replies: deleteReplyComment(el.replies, parentId, id),
                        };
                    }
                });
            };

            newTree = deleteReplyComment(state.childrens, action.parentId, action.id);
            return {
                ...state,
                childrens: newTree,
            };

        case LOAD_MORE_COMMENT:
            console.log(action.data);
            const newChild = [...state.childrens, ...setCommentNodeList(action.data)];
            const uniqueArray = uniqBy(newChild, 'id');
            console.log('UNIQ: ', uniqueArray);
            return {
                ...state,
                page: state.page + 1,
                childrens: uniqueArray,
            };

        case LOAD_MORE_REPLY_COMMENT:
            const loadMoreReplyComment = (arr, id, data) => {
                return arr.map((el) => {
                    if (el.id === id) {
                        return {
                            ...el,
                            replies: sortBy(uniqBy([...data, ...el.replies], 'id'), (el) => el.createdAt),
                            isSeeMore: true,
                            page: el.page + 1,
                        };
                    } else if (el.replies) {
                        return {
                            ...el,
                            replies: loadMoreReplyComment(el.replies, id, data),
                        };
                    }
                    return el;
                });
            };

            newTree = loadMoreReplyComment(state.childrens, action.parentId, setCommentNodeList(action.data));
            console.log('newTREE', newTree);
            return {
                ...state,
                childrens: newTree,
            };

        case REACTION_COMMENT:
            const reactionComment = (arr, id, isReacted) => {
                return arr.map((el) => {
                    if (el.id === id) {
                        return {
                            ...el,
                            is_reacted: isReacted,
                            reactionCount: isReacted ? el.reactionCount + 1 : el.reactionCount - 1,
                        };
                    } else if (el.replies) {
                        return {
                            ...el,
                            replies: reactionComment(el.replies, id, isReacted),
                        };
                    }
                    return el;
                });
            };

            newTree = reactionComment(state.childrens, action.id, action.isReacted);
            return {
                ...state,
                childrens: newTree,
            };

        default:
            return state;
    }
};

export default commentReducer;
