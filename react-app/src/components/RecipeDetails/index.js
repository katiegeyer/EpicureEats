import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipesThunk } from '../../store/recipes'
import RecipeCard from '../RecipeCard';
import IngredientsForm from '../IngredientsForm';
import OpenModalButton from "../OpenModalButton";
// import { useParams } from 'react-router-dom';
import './RecipePage.css'

const RecipePage = () => {
    const dispatch = useDispatch();
    const recipe = useSelector(state => Object.values(state.recipes.singleRecipe));

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
                buttonText="Add Your Ingredients"
                onItemClick={() => {

                }}
                modalComponent={<IngredientsForm />}
            />
            <div className="recipes-list">
                <RecipeCard key={recipe.id} recipe={recipe} />
            </div>
        </>
    );
};

export default RecipePage;