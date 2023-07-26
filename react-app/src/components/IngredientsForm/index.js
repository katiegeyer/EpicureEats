import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientThunk } from "../../store/ingredients";
import { getIngredientsThunk } from "../../store/ingredients";
import { useModal } from "../../context/Modal";
import './IngredientsForm.css'; // Remember to import your CSS
import recipesReducer, { getRecipeThunk } from "../../store/recipes";


function IngredientsForm({ ingredient, updateRecipe, setUpdate }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const recipe = useSelector(state => state.recipes.singleRecipe);
    const recipeId = recipe.id
    const { closeModal } = useModal();
    // const recipeIngredients = useSelector(state => state.ingredients);
    // console.log('recipe ingred', recipeIngredients.ingredients)
    // const [csrf_token, setCsrfToken] = useState("");
    const [ingredients, setIngredients] = useState([]);
    // const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);


    const [errors, setErrors] = useState([]);

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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(e.target[0].value)
    //     const ingred = new FormData();
    //     // recipe.append('csrf_token', csrf_token);
    //     // console.log('csrf_token', csrf_token)
    //     ingredients.forEach((ingredient, index) => {
    //         console.log('hi')
    //         ingred.append(`ingredients[${index}][name]`, ingredient.name);
    //         console.log('ingredient name', ingredient.name)
    //         ingred.append(`ingredients[${index}][quantity]`, ingredient.quantity);
    //         console.log('ingredient quantity', ingredient.quantity)
    //     });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ingred = {
            ingredients: ingredients.map((ingredient) => ({
                name: ingredient.name,
                quantity: ingredient.quantity,
                id: ingredient.id
            }))
        };
        // console.log('ingredients values', Object.values(ingred.ingredients));
        // console.log('ingred', ingred)
        // console.log('ingredients', ingred.ingredients);
        // console.log('payload', { ingredients: ingred.ingredients });

        const data = await dispatch(createIngredientThunk(recipeId, ingred.ingredients));
        if (data.status == 'error') {
            setErrors(data);
        } else {
            setUpdate(prev => !prev); // This will cause the RecipeDetails component to re-render
        }
        // const data = await dispatch(createIngredientThunk(recipeId, ingred.ingredients));
        // if (data.status == 'error') {
        //     setErrors(data);
        // }
        // else {
        //     ingredients.find(ingredient => {
        //         ingredient.id === data.data[0].id
        //     })
        // }
        console.log('datadata', data)
        // window.location(`/recipes/${recipeId}`)
        closeModal();
    }

    return (
        <div className="login-page-ing">
            <div className="login-modal">
                <h1>Add Ingredients</h1>
                <form onSubmit={handleSubmit}>
                    {/* {{ form.csrf_token }} */}
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <label>
                                Ingredient:
                                {/* <br /> */}
                                <input
                                    type="text"
                                    name="name"
                                    value={ingredient.name}
                                    onChange={(event) => handleIngredientChange(index, event)}
                                    required
                                />
                            </label>
                            {/* <br /> */}
                            <label>
                                Quantity:
                                {/* <br /> */}
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
                    <br />
                    <button type="button" onClick={handleAddIngredient}>
                        Add Ingredient
                    </button>

                    <button type="submit">Enter</button>
                </form>
            </div>
        </div>
    );
}

export default IngredientsForm;
