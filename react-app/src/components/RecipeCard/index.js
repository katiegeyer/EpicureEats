
import './RecipeCard.css';
import DeleteRecipe from '../DeleteRecipe';
import OpenModalButton from '../OpenModalButton';

const RecipeCard = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <img className="recipe-card__image" src={recipe.preview_img} alt={recipe.recipe_name} />
            <h2 className="recipe-card__title">{recipe.recipe_name}</h2>
            <p className="recipe-card__type">{recipe.type}</p>
            <p className="recipe-card__cook-time">{recipe.cook_time}</p>
            <p className="recipe-card__owner">{recipe.recipe_owner}</p>
            <OpenModalButton
                buttonText="Delete"
                recipeId={recipe.id}
                modalComponent={<DeleteRecipe recipeId={recipe.id} />}
            />
        </div>
    );
};

export default RecipeCard;
