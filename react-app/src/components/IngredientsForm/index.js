import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientThunk } from "../../store/ingredients";
import { useModal } from "../../context/Modal";
import './IngredientsForm.css'; // Remember to import your CSS

// function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     console.log('value cookie', value)
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) {
//         return parts.pop().split(';').shift();
//     }
// }

function IngredientsForm({ ingredient }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    // const [csrf_token, setCsrfToken] = useState("");
    const [ingredient_name, setIngredientName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const [errors, setErrors] = useState([]);



    // useEffect(() => {
    //     // Get the csrf_token from the cookies
    //     const csrf_token = getCookie('csrf_token');
    //     setCsrfToken(csrf_token);
    // }, []);

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
        console.log(e.target[0].value)
        const recipe = new FormData();
        // recipe.append('csrf_token', csrf_token);
        // console.log('csrf_token', csrf_token)
        ingredients.forEach((ingredient, index) => {
            console.log('hi')
            recipe.append(`ingredients[${index}][name]`, ingredient.name);
            console.log('ingredient name', ingredient.name)
            recipe.append(`ingredients[${index}][quantity]`, ingredient.quantity);
            console.log('ingredient quantity', ingredient.quantity)
        });
        // recipe.append('ingredients', ingredients)


        // console.log('type', type)

        const data = await dispatch(createIngredientThunk(ingredient));
        if (data) {
            setErrors(data);
        }
    
        closeModal();
        // console.log(recipeName, recipeOwner, type, cookTime, previewImg)
        console.log('ingredient', ingredients);

    };

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
