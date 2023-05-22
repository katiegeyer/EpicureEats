// import { Statement } from "sqlite3";

// const GET_ALLRECIPES = "recipes/GET_ALLRECIPES";
// const GET_RECIPE = "recipe/GET_RECIPE"
// const CREATE_RECIPE = 'recipe/CREATE_RECIPE'
// const UPDATE_RECIPE = 'recipe/UPDATE_RECIPE'
// const DELETE_RECIPE = 'recipe/DELETE_RECIPE'

// export const getAllRecipesAction = (recipes) => ({
//     type: GET_ALLRECIPES,
//     recipes
// });

// const getRecipeAction = (recipe) => ({
//     type: GET_RECIPE,
//     recipe
// })

// const createRecipeAction = (recipe) => ({
//     type: CREATE_RECIPE,
//     recipe
// })

// const updateRecipeAction = (recipe) => ({
//     type: UPDATE_RECIPE,
//     recipe
// })

// const deleteRecipeAction = (recipeId) => ({
//     type: DELETE_RECIPE,
//     recipeId
// })


// export const getAllRecipesThunk = () => async (dispatch) => {
//     const response = await fetch("/api/recipes/")
//     // console.log("responseeeeeeeeeeeeeeee", response)
//     if (response.ok) {
//         const data = await response.json();
//         // console.log('DDDAAATAAALLRECIPES', data)
//         if (data.errors) {
//             return;
//         }
//         // console.log("dataaaaaaaaaaaaaaaa", data)

//         dispatch(getAllRecipesAction(data));
//     }
// };

// export const createRecipeThunk = (recipe) => async (dispatch) => {
//     const response = await fetch('/api/recipes/new', {
//         method: 'POST',
//         body: recipe
//     })

//     if (response.ok) {
//         const data = await response.json();
//         if (data.errors) {
//             return data.errors
//         }
//         dispatch(createRecipeAction(data))
//     }
// }

// export const getRecipeThunk = (recipeId) => async (dispatch) => {
//     // console.log("THE IDDDD ", id)
//     const response = await fetch(`/api/recipes/${recipeId}`)
//     // console.log("THE RESPONSE ", response)
//     if (response.ok) {
//         const data = await response.json();
//         if (data.errors) {
//             return
//         }
//         // console.log("DATAAAA ", data)
//         dispatch(getRecipeAction(data))
//     }
// }

// // export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
// // 	const response = await fetch(`/api/recipes/${recipeId}`, {
// // 		method: 'DELETE',
// // 		body: recipeId
// // 	})
// // 	if (response.ok) {
// // 		const data = await response.json()
// // 		if (data.errors) {
// // 			return data.errors
// // 		}
// // 		dispatch(deleteRecipeAction(data))
// // 	}
// // }
// export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
//     const response = await fetch(`/api/recipes/${recipeId}`, {
//         method: 'DELETE'
//     })
//     if (response.ok) {
//         const data = await response.json()
//         if (data.errors) {
//             return data.errors
//         }
//         dispatch(deleteRecipeAction(data))
//     }
// }

// export const updateRecipeThunk = (recipeId, updatedRecipe) => async (dispatch) => {
//     console.log("TEST this", recipeId)

//     // const response = await fetch(`/api/recipes/${recipeId}`, {
//     //     method: 'PUT',
//     //     body: updatedRecipe,
//     // });
//     const response = await fetch(`/api/recipes/${recipeId}`, {
//         method: 'PUT',
//         body: JSON.stringify(updatedRecipe),
//     });
//     console.log(response)


//     if (response.ok) {
//         const data = await response.json();
//         console.log("DATAAA", data)


//         if (data.errors) {
//             // console.log("TEST 6")
//             return data.errors
//         }
//         // console.log("TEST 4")
//         dispatch(updateRecipeAction(data))
//         console.log("DATAAA", data)
//         return data
//     }
// }

// const initialState = { allRecipes: {}, singleRecipe: {} }

// export default function recipesReducer(state = initialState, action) {
//     let newState;
//     console.log("ACTIONN ", action)
//     switch (action.type) {
//         case GET_ALLRECIPES:
//             console.log('ACTION', action)
//             newState = { ...state, allRecipes: { ...action.allRecipes } }
//             action.recipes.recipes.forEach(recipe => newState.allRecipes[recipe.id] = recipe)
//             console.log("NEW STATEEEE ", newState)
//             return newState
//         case GET_RECIPE:
//             newState = { ...state, singleRecipe: { ...action.recipe } }
//             return newState
//         // case ADD_RECIPE_TO_BOX:
//         //     newState = { ...state }
//         //     newState.singleRecipe = { ...action.recipe }
//         //     return newState
//         // case UPDATE_RECIPE: {
//         //     newState = {
//         //         ...state,
//         //         singleRecipe: {
//         //             ...state.singleRecipe,
//         //         },
//         //     };
//         //     newState[action.recipe.id] = action.recipe;
//         //     return newState;
//         // }
//         // case UPDATE_RECIPE: {
//         //     newState = {
//         //         ...state,
//         //         allRecipes: {
//         //             ...state.allRecipes,
//         //             [action.updatedRecipe.id]: action.updatedRecipe,
//         //         },
//         //         singleRecipe: {
//         //             ...action.updatedRecipe,
//         //         },
//         //     };
//         //     return newState;
//         // }
//         case UPDATE_RECIPE: {
//             console.log("ACTIONN UPDATE", action)

//             newState = {
//                 ...state,
//                 singleRecipe: {
//                     ...state.singleRecipe,
//                 },
//                 allRecipes: {
//                     ...state.allRecipes,
//                     [action.recipe.id]: action.recipe,
//                 },
//             };
//             return newState;
//         }



//         case CREATE_RECIPE:
//             newState = { ...state }
//             newState.singleRecipe = { ...action.recipe }
//             newState.allRecipes[action.recipe.id] = action.recipe
//             return newState
//         case DELETE_RECIPE:
//             newState = { ...state, allRecipes: { ...state.allRecipes } }
//             delete newState.allRecipes[action.recipeId]
//             return newState
//         default:
//             return state;
//     }
// }

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

const updateRecipeAction = (updatedRecipe) => ({
    type: UPDATE_RECIPE,
    updatedRecipe
})

const deleteRecipeAction = (recipeId) => ({
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
    // console.log("THE IDDDD ", id)
    const response = await fetch(`/api/recipes/${recipeId}`)
    // console.log("THE RESPONSE ", response)
    if (response.ok) {
        const data = await response.json();
        console.log('THIS IS THE DATA', data)
        if (data.errors) {
            return
        }
        // console.log("DATAAAA ", data)
        dispatch(getRecipeAction(data))
        return data;
    }
}

// export const deleteRecipeThunk = (recipeId) => async (dispatch) => {
// 	const response = await fetch(`/api/recipes/${recipeId}`, {
// 		method: 'DELETE',
// 		body: recipeId
// 	})
// 	if (response.ok) {
// 		const data = await response.json()
// 		if (data.errors) {
// 			return data.errors
// 		}
// 		dispatch(deleteRecipeAction(data))
// 	}
// }
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
    console.log("TEST this", recipeId)

    const response = await fetch(`/api/recipes/${recipeId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedRecipe),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('this is what i need', data)

        if (data.errors) {
            // console.log("TEST 6")
            return data.errors
        }
        // console.log("TEST 4")
        dispatch(updateRecipeAction(data))
        console.log('Dispatching update action')
        return data
    }
}


const initialState = { allRecipes: {}, singleRecipe: {} }

export default function recipesReducer(state = initialState, action) {
    let newState;
    console.log("ACTIONN ", action)
    switch (action.type) {
        case GET_ALLRECIPES:
            console.log('ACTION', action)
            newState = { ...state, allRecipes: { ...action.allRecipes } }
            action.recipes.recipes.forEach(recipe => newState.allRecipes[recipe.id] = recipe)
            // console.log("NEW STATEEEE ", newState)
            return newState
        case GET_RECIPE:
            newState = { ...state, singleRecipe: { ...action.recipe } }
            return newState
        // case ADD_RECIPE_TO_BOX:
        //     newState = { ...state }
        //     newState.singleRecipe = { ...action.recipe }
        //     return newState
        // case UPDATE_RECIPE: {
        //     console.log('test')
        //     newState = {
        //         ...state,
        //         singleRecipe: {
        //             ...state.singleRecipe,
        //         },
        //     };
        //     newState[action.updatedRecipe.id] = action.updatedRecipe;
        //     // console.log("NEW STATEEEE ", newState)

        //     return newState;
        // }
        case UPDATE_RECIPE: {
            console.log(action)
            console.log('test')
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
        default:
            return state;
    }
}
