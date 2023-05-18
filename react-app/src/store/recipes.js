const GET_ALLRECIPES = "recipes/GET_ALLRECIPES";
const GET_RECIPE = "recipe/GET_RECIPE"
const CREATE_RECIPE = 'recipe/CREATE_RECIPE'
const UPDATE_RECIPE = 'recipe/UPDATE_RECIPE'
const DELETE_RECIPE = 'recipe/DELETE_RECIPE'

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

const updateRecipeAction = (recipe) => ({
    type: UPDATE_RECIPE,
    recipe
})

const deleteSongAction = (recipeId) => ({
    type: DELETE_RECIPE,
    recipeId
})


export const getAllRecipesThunk = () => async (dispatch) => {
    const response = await fetch("/api/recipes/")
    // console.log("responseeeeeeeeeeeeeeee", response)
    if (response.ok) {
        const data = await response.json();
        // console.log('DDDAAATAAALLRECIPES', data)
        if (data.errors) {
            return;
        }
        // console.log("dataaaaaaaaaaaaaaaa", data)

        dispatch(getAllRecipesAction(data));
    }
};

const initialState = { allRecipes: {}, singleRecipes: {} }

export default function recipesReducer(state = initialState, action) {
    let newState;
    console.log("ACTIONN ", action)
    switch (action.type) {
        case GET_ALLRECIPES:
            console.log('ACTION', action)
            newState = { ...state, allRecipes: { ...action.allRecipes } }
            action.recipes.recipes.forEach(recipe => newState.allRecipes[recipe.id] = recipe)
            console.log("NEW STATEEEE ", newState)
            return newState
        // case GET_RECIPE:
        //     newState = { ...state, singleRecipe: { ...action.recipe } }
        //     return newState
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
        //     newState[action.recipe.id] = action.recipe;
        //     return newState;
        // }

        // case CREATE_RECIPE:
        //     newState = { ...state }
        //     newState.singleRecipe = { ...action.recipeId }
        //     newState.allRecipes[action.recipeId.id] = action.recipeId
        //     return newState
        // case DELETE_RECIPE:
        //     newState = { ...state, allRecipes: { ...state.allRecipes } }
        //     delete newState.allRecipes[action.recipeId]
        //     return newState
        default:
            return state;
    }
}
