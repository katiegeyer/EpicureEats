import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipesThunk } from '../../store/recipes'
import RecipeCard from '../RecipeCard';
import CreateRecipeForm from '../CreateRecipeForm'
import OpenModalButton from "../OpenModalButton";
// import { useParams } from 'react-router-dom';

const RecipePage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes));
    
    // console.log('state', state);

    useEffect(() => {
        dispatch(getAllRecipesThunk());
    }, [dispatch]);

    return (
        <>
        <OpenModalButton
        buttonText="Post a Recipe"
        onItemClick={() => {

        }}
        modalComponent={<CreateRecipeForm />}
      />
        <div className="recipes-list">
            {recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </div>
        </>
    );
};

export default RecipePage;


// import { getAllRecipesThunk } from '../../store/recipes'
// import './RecipePage.css'
// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

// const RecipePage = () => {
//     const dispatch = useDispatch()
//     const allRecipes = useSelector((state) => state.recipes.allRecipes)
//     const sessionUser = useSelector((state) => state.session.user)
//     const userRecipes = useSelector((state) => state.recipes.singleRecipe)
//     const recipes = Object.values(allRecipes)
//     // console.log(allRecipes)


//     useEffect(() => {
//         dispatch(getAllRecipesThunk())
//         // dispatch(getRecipeThunk(sessionUser.id))
//     }, [dispatch])

//     // console.log('SOOOOOOOOOOONNNNNGGGGZZZZ', allSongs)

//     return (
//         <>
//                         <h1>
//                             Recipes
//                         </h1>
//                         <div>
//                     {recipes.map((recipe) => (
//                         <SingleRecipeCard
//                             recipe={recipe}
//                             key={recipe.id}
//                             sessionUser={sessionUser}
//                             userRecipes={userRecipes}
//                         />
//                     ))}
//                 </div>
//         </>
//     )
// }

// export default RecipePage
