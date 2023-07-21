// actions/searchActions.js

export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const setSearchQuery = (query) => ({
    type: SET_SEARCH_QUERY,
    query,
});

// reducers/searchReducer.js

const initialState = {
    searchQuery: ''
};

// reducer function
export default function recipesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_QUERY:
            return { ...state, searchQuery: action.query }; // Use action.query
        // handle other actions
        default:
            return state;
    }
}
