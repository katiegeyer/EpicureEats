const GET_INGREDIENTS = "ingredients/GET_INGREDIENTS";
const CREATE_INGREDIENT = 'ingredients/CREATE_INGREDIENT'
const DELETE_INGREDIENT = 'ingredients/DELETE_INGREDIENT'


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const getIngredientsAction = (ingredients) => ({
    type: GET_INGREDIENTS,
    ingredients
});

const createIngredientAction = (ingredient) => ({
    type: CREATE_INGREDIENT,
    ingredient
})

const deleteIngredientAction = (ingredientId) => ({
    type: DELETE_INGREDIENT,
    ingredientId
})

export const getIngredientsThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/ingredients`)

    if (response.ok) {
        const data = await response.json();
        // console.log('DDDAAATAAALLRECIPES', data)
        if (data.errors) {
            return;
        }

        dispatch(getIngredientsAction(data));
    }
};

export const createIngredientThunk = (recipeId, ingredient) => async (dispatch) => {
    console.log('RECIPE IDDDDDD', recipeId)
    const response = await fetch(`/api/recipes/${recipeId}/ingredients`, {
        method: 'POST',
        headers: {
        // 'X-CSRFToken': getCookie('csrf_token'), // You should define this getCookie function to extract cookie
        'Content-Type': 'application/json'
        },
        body: ingredient
    })

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
        dispatch(createIngredientAction(data))
        return data;
    }
}

export const deleteIngredientThunk = (recipeId, ingredientId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}/ingredients/${ingredientId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(deleteIngredientAction(data))
    }
}

const initialState = { ingredients: {} }

export default function ingredientsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_INGREDIENTS:
            newState = { ...state, ingredients: { ...action.ingredients } }
            action.ingredients.ingredients.forEach(ingredient => newState.ingredients[ingredient.id] = ingredient)
            return newState
        case CREATE_INGREDIENT:
            newState = { ...state }
            newState.ingredients[action.ingredient.id] = action.ingredient
            return newState
        case DELETE_INGREDIENT:
            newState = { ...state, ingredients: { ...state.ingredients } }
            delete newState.ingredients[action.ingredientId]
            return newState
        default:
            return state;
    }
}
