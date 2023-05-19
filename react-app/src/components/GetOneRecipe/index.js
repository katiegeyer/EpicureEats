import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipeThunk } from '../../store/recipes';
import RecipeCard from '../RecipeCard';
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

    return (
        <>

            <p className="recipe-details-page-user-name">
                {owner}
            </p>
            {/* <div className="recipe-details-page">
                {recipe?.map((r) => (
                    <RecipeCard key={r.id} recipe={r} />
                ))}
            </div> */}


        </>
    )
}

export default RecipeDetails;
