import { tokenUtils } from '~/utils';
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
                            replies_count: el.replies_count + 1,
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
                            replies_count: el.replies_count - 1,
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
            const newChild = [...state.childrens, ...setCommentNodeList(action.data)];
            const uniqueArray = uniqBy(newChild, 'id');
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
                            replies: sortBy(uniqBy([...data, ...el.replies], 'id'), (el) => el.created_at),
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
            return {
                ...state,
                childrens: newTree,
            };

        case REACTION_COMMENT:
            const calculateReactionCount = (currentType, reactedType, count) => {
                if (currentType === 'NULL' && reactedType !== 'NULL') {
                    return count + 1;
                } else if (currentType !== 'NULL' && reactedType === 'NULL') {
                    return count - 1;
                } else {
                    return count;
                }
            };

            const setReactions = (list, currentType, reactedType) => {
                // handle reaction icons
                let newReactions;
                if (currentType === 'NULL' && reactedType !== 'NULL') {
                    return [...list, action.reaction];
                } else if (currentType !== 'NULL' && reactedType === 'NULL') {
                    newReactions = list.filter((r) => r.reacted_user.id !== tokenUtils.getUserId());
                    return newReactions;
                } else {
                    newReactions = list.filter((r) => r.id !== action.reaction.id);
                    return [...newReactions, action.reaction];
                }
            };

            const reactionComment = (arr, id, reactedType) => {
                return arr.map((el) => {
                    if (el.id === id) {
                        return {
                            ...el,
                            is_reacted: reactedType !== 'NULL' ? true : false,
                            reacted_type: reactedType,
                            reaction_count: calculateReactionCount(el.reacted_type, reactedType, el.reaction_count),
                            reactions: setReactions(el.reactions, el.reacted_type, reactedType),
                        };
                    } else if (el.replies) {
                        return {
                            ...el,
                            replies: reactionComment(el.replies, id, reactedType),
                        };
                    }
                    return el;
                });
            };

            newTree = reactionComment(state.childrens, action.id, action.reaction?.type || 'NULL');
            return {
                ...state,
                childrens: newTree,
            };

        default:
            return state;
    }
};

export default commentReducer;
