

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipeThunk } from '../../store/recipes';
import IngredientsForm from '../IngredientsForm';
import PreparationForm from '../Preparations';
import OpenModalButton from '../OpenModalButton';
import RecipeCard from '../RecipeCard';
import DeleteIngredient from '../DeleteIngredient';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';
import './GetOneRecipe.css'
import { NavLink } from 'react-router-dom';
import UpdateIngredientForm from '../UpdateIngredient';
import Comments from '../Comments';
import { createCommentThunk } from '../../store/comments';
import CommentForm from '../CommentForm';
import DeletePreparation from '../DeletePreparation';
import UpdatePreparationForm from '../UpdatePrep';
import SignupFormModal from '../SignupFormModal'

function RecipeDetails() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const { openModal } = useModal();
    const recipe = useSelector((state) => state.recipes.singleRecipe);
    const sessionUser = useSelector((state) => state.session.user);
    const comment = useSelector((state) => state.comments.comments)
    const commentUserId = comment.map(c => c.user_id);
    console.log('COMENT OWNER', commentUserId)
    const owner = recipe.recipe_owner;
    const current_user = sessionUser?.id;
    const [update, setUpdate] = useState(false);
    let ingredientList = [];

    if (recipe.ingredients && recipe.ingredients.length > 0) {
        ingredientList = recipe.ingredients.map(ingredient => ({
            id: ingredient.id,
            name: ingredient.name,
            quantity: ingredient.quantity
        }));
    }

    console.log('this is the list', ingredientList);
    let preparationList = [];


    if (recipe.preparations && recipe.preparations.length > 0) {
        preparationList = recipe.preparations.map(preparation => ({
            id: preparation.id,
            step: preparation.step_number,
            instruction: preparation.instruction
        }));
    }

    console.log(preparationList);

    //   const recipeIngredients = useSelector((state) => state)

    // useEffect(() => {
    if (!sessionUser) {
        history.push('/')
    }
    // }, [sessionUser, openModal]);

    useEffect(() => {
        dispatch(getRecipeThunk(id));
    }, [dispatch, id, update]);

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
                modalComponent={<IngredientsForm key={recipe.id} setUpdate={setUpdate} />}
            />
            <OpenModalButton
                buttonText="Add Your Steps"
                onItemClick={() => {

                }}
                modalComponent={<PreparationForm key={recipe.id} setUpdate={setUpdate} />}
            />
            <div className="recipe">
                <RecipeCard key={recipe.id} recipe={recipe} className="one_recipe_card" />
            </div>
            <br />
            <div className="ingredients-card">
                <h2>Ingredients</h2>
                <ul>
                    {ingredientList.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.name} - {ingredient.quantity}
                            <OpenModalButton
                                buttonText="Delete"
                                ingredientId={ingredient.id}
                                modalComponent={<DeleteIngredient recipeId={recipe.id} ingredientId={ingredient.id} />}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="preparations-card">
                <h2>Preparation</h2>
                <ul>
                    {preparationList.map((preparation, index) => (
                        <li key={index}>
                            {preparation.step} - {preparation.instruction}
                            <OpenModalButton
                                buttonText="Delete"
                                preparationId={preparation.id}
                                modalComponent={<DeletePreparation recipeId={recipe.id} preparationId={preparation.id} />}
                            />
                            {/* <OpenModalButton
                                buttonText="Update"
                                preparationId={preparation.id}
                                modalComponent={<UpdatePreparationForm recipeId={recipe.id} preparationId={preparation.id} />}
                            /> */}
                        </li>
                    ))}
                </ul>
                <br />
                {/* <Comments recipeId={id} /> */}
                <Comments recipeId={recipe.id} />

            </div>
        </>
    )
}

export default RecipeDetails;
