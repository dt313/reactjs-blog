export const INIT_COMMENT_TREE = 'INIT_COMMENT_TREE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const LOAD_MORE_COMMENT = 'LOAD_MORE_COMMENT';
export const INIT_REPLY_COMMENT = 'INIT_REPLY_COMMENT';
export const REACTION_COMMENT = 'REACTION_COMMENT';
export const ADD_REPLY_COMMENT = 'ADD_REPLY_COMMENT';
export const DELETE_REPLY_COMMENT = 'DELETE_REPLY_COMMENT';
export const LOAD_MORE_REPLY_COMMENT = 'LOAD_MORE_REPLY_COMMENT';

export function initCommentTree(id, data) {
    return {
        type: INIT_COMMENT_TREE,
        data: {
            id,
            childrens: data,
        },
    };
}

export function addComment(newComment) {
    return {
        type: ADD_COMMENT,
        data: newComment,
    };
}

export function addReplyComment(parentId, newComment) {
    return {
        type: ADD_REPLY_COMMENT,
        parentId,
        data: newComment,
    };
}

export function deleteComment(commentId) {
    return {
        type: DELETE_COMMENT,
        id: commentId,
    };
}

export function deleteReplyComment(parentId, commentId) {
    return {
        type: DELETE_REPLY_COMMENT,
        id: commentId,
        parentId,
    };
}

export function loadMoreComment(newComments) {
    return {
        type: LOAD_MORE_COMMENT,
        data: newComments,
    };
}

export function loadMoreReplyComment(parentId, newComments) {
    return {
        type: LOAD_MORE_REPLY_COMMENT,
        parentId,
        data: newComments,
    };
}

export function initReplyComment(id, replyComments) {
    return {
        type: INIT_REPLY_COMMENT,
        id: id,
        data: replyComments,
    };
}

export function reactionComment(id, reation = null) {
    return {
        type: REACTION_COMMENT,
        id: id,
        reaction: reation,
    };
}
