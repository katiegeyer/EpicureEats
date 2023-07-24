const GET_ALLRECIPES = "recipes/GET_ALLRECIPES"
const GET_RECIPE = "recipe/GET_RECIPE"
const CREATE_RECIPE = 'recipe/CREATE_RECIPE'
const UPDATE_RECIPE = 'recipe/UPDATE_RECIPE'
const DELETE_RECIPE = 'recipe/DELETE_RECIPE'
const SEARCH_RECIPES = 'recipes/SEARCH_RECIPES';



export const getAllRecipesAction = (recipes) => ({
    type: GET_ALLRECIPES,
    recipes
});

const getRecipeAction = (recipe) => ({
    type: GET_RECIPE,
    recipe
})

const createRecipeAction = (recipe) => ({
    type: CREATE_RECIPE,
    recipe
})

const updateRecipeAction = (updatedRecipe) => ({
    type: UPDATE_RECIPE,
    updatedRecipe
})

const deleteRecipeAction = (recipeId) => ({
    type: DELETE_RECIPE,
    recipeId
})

const searchRecipesAction = (recipes) => ({
    type: SEARCH_RECIPES,
    recipes
});


// export const getAllRecipesThunk = (searchQuery) => async (dispatch) => {
//     const response = await fetch("/api/recipes/")
//     if (response.ok) {
//         const data = await response.json();
//         if (data.errors) {
//             return;
//         }

//         dispatch(getAllRecipesAction(data));
//     }
// };

export const getAllRecipesThunk = (searchQuery = "") => async (dispatch) => {
    let response;

    if (searchQuery) {
        response = await fetch(`/api/recipes/search?q=${searchQuery}`);
    } else {
        response = await fetch("/api/recipes/");
    }

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(getAllRecipesAction(data));
    }
};


export const createRecipeThunk = (recipe) => async (dispatch) => {
    const response = await fetch('/api/recipes/new', {
        method: 'POST',
        body: recipe
    })

    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data.errors
        }
        dispatch(createRecipeAction(data))
        return data;
    }
}

export const getRecipeThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return
        }
        dispatch(getRecipeAction(data))
        return data;
    }
}


export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
        dispatch(deleteRecipeAction(data))
    }
}

export const updateRecipeThunk = (recipeId, updatedRecipe) => async (dispatch) => {

    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PUT',
        body: updatedRecipe,
    });

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return data.errors
        }
        dispatch(updateRecipeAction(data))
        return data
    }
}
export const searchRecipesThunk = (searchQuery) => async (dispatch) => {
    const response = await fetch(`/api/recipes/search?q=${searchQuery}`);

    if (response.ok) {
        const data = await response.json();

        if (data.errors) {
            return;
        }

        dispatch(searchRecipesAction(data.recipes));
    }
};




const initialState = { allRecipes: {}, singleRecipe: {}, searchResults: {} }

export default function recipesReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALLRECIPES:
            newState = { ...state, allRecipes: { ...action.allRecipes } }
            action.recipes.recipes.forEach(recipe => newState.allRecipes[recipe.id] = recipe)
            return newState
        case GET_RECIPE:
            newState = { ...state, singleRecipe: { ...action.recipe } }
            return newState
        // case ADD_RECIPE_TO_BOX:
        //     newState = { ...state }
        //     newState.singleRecipe = { ...action.recipe }
        //     return newState
        // case UPDATE_RECIPE: {
        //     newState = {
        //         ...state,
        //         singleRecipe: {
        //             ...state.singleRecipe,
        //         },
        //     };
        //     newState[action.updatedRecipe.id] = action.updatedRecipe;

        //     return newState;
        // }
        case UPDATE_RECIPE: {
            newState = {
                ...state,
                singleRecipe: action.updatedRecipe
            };
            return newState;
        }



        case CREATE_RECIPE:
            newState = { ...state }
            newState.singleRecipe = { ...action.recipe }
            newState.allRecipes[action.recipe.id] = action.recipe
            return newState
        case DELETE_RECIPE:
            newState = { ...state, allRecipes: { ...state.allRecipes } }
            delete newState.allRecipes[action.recipeId]
            return newState
        case SEARCH_RECIPES:
            newState = { ...state, searchResults: { ...action.recipes } };
            return newState
        // case SET_SEARCH_QUERY:
        //     return { ...state, searchQuery: action.payload }; // new case to handle SET_SEARCH_QUERY action
        // ...
        default:
            return state;
    }
}
