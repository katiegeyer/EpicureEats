// Action Types
const SET_COMMENTS = 'comments/SET_COMMENTS';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

// Action Creators
export const setComments = (comments) => ({ type: SET_COMMENTS, comments });
export const addComment = (comment) => ({ type: ADD_COMMENT, comment });
export const updateComment = (comment) => ({ type: UPDATE_COMMENT, comment });
export const deleteComment = (id) => ({ type: DELETE_COMMENT, id });

// Thunks
export const fetchComments = (recipeId) => async dispatch => {
    const response = await fetch(`/api/recipes/${recipeId}/comments`);
    const comments = await response.json();
    dispatch(setComments(comments));
};

export const createComment = (recipeId, comment) => async dispatch => {
    const response = await fetch(`/api/recipes/${recipeId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    const newComment = await response.json();
    dispatch(addComment(newComment));
};

export const editComment = (recipeId, comment) => async dispatch => {
    const response = await fetch(`/api/recipes/${recipeId}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });
    const updatedComment = await response.json();
    dispatch(updateComment(updatedComment));
};

export const removeComment = (recipeId, id) => async dispatch => {
    await fetch(`/api/recipes/${recipeId}/comments/${id}`, { method: 'DELETE' });
    dispatch(deleteComment(id));
};

// Reducer
const initialState = {};

export default function commentsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_COMMENTS:
            return { ...state, ...action.comments };
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
