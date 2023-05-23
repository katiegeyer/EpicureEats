import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipesThunk } from '../../store/recipes'
import RecipeCard from '../RecipeCard';
import CreateRecipeForm from '../CreateRecipeForm'
import OpenModalButton from "../OpenModalButton";
// import { useParams } from 'react-router-dom';
import './RecipePage.css'

const RecipePage = () => {
    const dispatch = useDispatch();
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes));

    // console.log('state', state);

    useEffect(() => {
        dispatch(getAllRecipesThunk());
    }, [dispatch]);

    return (
        <>
            <div className="banner">
                <h1>Epicure Eats</h1>
            </div>
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
