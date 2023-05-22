// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getRecipeThunk } from '../../store/recipes';
// import IngredientsForm from '../IngredientsForm';
// import OpenModalButton from '../OpenModalButton';
// import RecipeCard from '../RecipeCard';
// import './GetOneRecipe.css'
// import { NavLink } from 'react-router-dom';


// function RecipeDetails() {
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const recipe = useSelector((state) => state.recipes.singleRecipe);
//     const sessionUser = useSelector((state) => state.session.user);
//     const owner = recipe.recipe_owner;
//     const current_user = sessionUser.id;
//     //   const recipeIngredients = useSelector((state) => state)

//     useEffect(() => {
//         dispatch(getRecipeThunk(id));
//     }, [dispatch, id]);

//     console.log('recipe id', recipe.id)
//     return (
//         <>
//             <div className="banner">
//                 <h1>Epicure Eats</h1>
//             </div>
//             <OpenModalButton
//                 buttonText="Add Your Ingredients"
//                 onItemClick={() => {

//                 }}
//                 modalComponent={<IngredientsForm key={recipe.id} />}
//             />
//             <div className="recipes-list">
//                 <RecipeCard key={recipe.id} recipe={recipe} />
//             </div>
//         </>
//     )
// }

// export default RecipeDetails;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipeThunk } from '../../store/recipes';
import IngredientsForm from '../IngredientsForm';
import OpenModalButton from '../OpenModalButton';
import RecipeCard from '../RecipeCard';
import './GetOneRecipe.css'
import { NavLink } from 'react-router-dom';

function RecipeDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const recipe = useSelector((state) => state.recipes.singleRecipe);
    const sessionUser = useSelector((state) => state.session.user);
    const owner = recipe.recipe_owner;
    const current_user = sessionUser.id;
    //   const recipeIngredients = useSelector((state) => state)

    useEffect(() => {
        dispatch(getRecipeThunk(id));
    }, [dispatch, id]);

    console.log('recipe id', recipe.id)
    return (
        <>
            <div className="banner">
                <h1>Epicure Eats</h1>
            </div>
            <OpenModalButton
                buttonText="Add Your Ingredients"
                onItemClick={() => {

                }}
                modalComponent={<IngredientsForm key={recipe.id} />}
            />
            <div className="recipe">
                <RecipeCard key={recipe.id} recipe={recipe} />
            </div>
            <div className="ingredients-card">
                <h2>Ingredients</h2>
                {/* ingredients will go here */}
            </div>
            <div className="preparations-card">
                <h2>Preparation</h2>
                {/* preparation steps will go here */}
            </div>
        </>
    )
}

export default RecipeDetails;
