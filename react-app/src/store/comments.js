// Action Types
const SET_COMMENTS = 'comments/SET_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

// Action Creators
export const getCommentsAction = (comments) => ({
    type: SET_COMMENTS,
    comments
});
export const createCommentAction = (comment) => ({
    type: ADD_COMMENT,
    comment
});
export const updateCommentAction = (comment) => ({
    type: UPDATE_COMMENT, comment
});
export const deleteCommentAction = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
});

// Thunks
export const fetchCommentsThunk = (recipeId) => async dispatch => {
    const response = await fetch(`/api/recipes/${recipeId}/comments`);
    const comments = await response.json();
    console.log('commentsTHUNK', comments)
    dispatch(getCommentsAction(comments));
};

export const createCommentThunk = (recipeId, comment) => async dispatch => {
    const response = await fetch(`/api/recipes/${recipeId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data.errors
        }
        dispatch(createCommentAction(data));
        return data
    };
}

export const editCommentThunk = (recipeId, comment) => async dispatch => {
    const response = await fetch(`/api/recipes/${recipeId}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    const updatedComment = await response.json();
    dispatch(updateCommentAction(updatedComment));
};

export const removeCommentThunk = (recipeId, commentId) => async dispatch => {
    await fetch(`/api/recipes/${recipeId}/comments/${commentId}`, { method: 'DELETE' });
    dispatch(deleteCommentAction(commentId));
};

// Reducer
const initialState = {comments : []};

export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COMMENTS:
            newState = { ...state, comments: { ...action.comments} }
            action.comments.comments.forEach(comment => newState.comments[comment.id] = comment)
        case ADD_COMMENT:
            return { ...state, [action.comment.id]: action.comment };
        case UPDATE_COMMENT:
            return { ...state, [action.comment.id]: action.comment };
        case DELETE_COMMENT:
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
}
