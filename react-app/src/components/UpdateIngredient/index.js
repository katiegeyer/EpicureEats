import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientThunk } from "../../store/ingredients";  // Import the update thunk
import { useModal } from "../../context/Modal";
// import './IngredientsForm.css';
import { getRecipeThunk } from "../../store/recipes";

function IngredientsForm({ ingredient }) {
    const dispatch = useDispatch();
    const recipe = useSelector(state => state.recipes.singleRecipe);
    const recipeIngredients = useSelector(state => state.ingredients.ingredients);
    const recipeId = recipe.id
    const { closeModal } = useModal();
    const [ingredients, setIngredients] = useState(recipeIngredients || [{ name: "", quantity: "" }]);

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setIngredients(recipeIngredients);
    }, [recipeIngredients]);

    const handleIngredientChange = (index, event) => {
        const values = [...ingredients];
        if (event.target.name === "name") {
            values[index].name = event.target.value;
        } else {
            values[index].quantity = event.target.value;
        }
        setIngredients(values);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { name: "", quantity: "" }]);
    };

    const handleRemoveIngredient = (index) => {
        const values = [...ingredients];
        values.splice(index, 1);
        setIngredients(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ingred = {
            ingredients: ingredients.map((ingredient) => ({
                name: ingredient.name,
                quantity: ingredient.quantity
            }))
        };

        const data = await dispatch(createIngredientThunk(recipeId, ingred.ingredients));
        if (data) {
            setErrors(data);
        }
        closeModal();
    }

    return (
        <div className="CreateRecipeForm">
            <h1>Add Ingredients</h1>
            <form onSubmit={handleSubmit}>
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <label>
                            Ingredient
                            <input
                                type="text"
                                name="name"
                                value={ingredient.name}
                                onChange={(event) => handleIngredientChange(index, event)}
                                required
                            />
                        </label>
                        <label>
                            Quantity
                            <input
                                type="text"
                                name="quantity"
                                value={ingredient.quantity}
                                onChange={(event) => handleIngredientChange(index, event)}
                                required
                            />
                        </label>
                        <button type="button" onClick={() => handleRemoveIngredient(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddIngredient}>
                    Add Ingredient
                </button>

                <button type="submit">Enter</button>
            </form>
        </div>
    );
}

export default IngredientsForm;
