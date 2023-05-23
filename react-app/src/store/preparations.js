const GET_PREPARATIONS = "preparations/GET_PREPARATIONS";
const CREATE_PREPARATION = 'preparations/CREATE_PREPARATION'
const DELETE_PREPARATION = 'preparations/DELETE_PREPARATION'

export const getPreparationsAction = (preparations) => ({
    type: GET_PREPARATIONS,
   preparations
});

const createPreparationAction = (preparation) => ({
    type: CREATE_PREPARATION,
   preparation
})

const deletePreparationAction = (preparationId) => ({
    type: DELETE_PREPARATION,
   preparationId
})

export const getPreparationsThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/preparations`)

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return;
        }

        dispatch(getPreparationsAction(data));
    }
};

export const createPreparationThunk = (recipeId,preparation) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/preparations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({preparations:preparation})
    })

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
        dispatch(createPreparationAction(data))
        return data;
    }
}

export const deletePreparationThunk = (recipeId,preparationId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/preparations/${preparationId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(deletePreparationAction(data))
    }
}

const initialState = {preparations: {} }

export default function preparationsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_PREPARATIONS:
            newState = { ...state, preparations: { ...action.preparations } }
            return newState
        case CREATE_PREPARATION:
            newState = { ...state }
            newState.preparations[action.preparation.id] = action.preparation
            return newState
        case DELETE_PREPARATION:
            newState = { ...state, preparations: { ...state.preparations } }
            delete newState.preparations[action.preparationId]
            return newState
        default:
            return state;
    }
}
