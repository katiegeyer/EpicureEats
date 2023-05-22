import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipeThunk } from "../../store/recipes";
import { useModal } from "../../context/Modal";
import './CreateRecipeForm.css'; // Remember to import your CSS

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}

function CreateRecipeForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    const [csrf_token, setCsrfToken] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [recipeOwner, setRecipeOwner] = useState("");
    const [type, setType] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
    const [errors, setErrors] = useState([]);



    useEffect(() => {
        // Get the csrf_token from the cookies
        const csrf_token = getCookie('csrf_token');
        setCsrfToken(csrf_token);
    }, []);

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
        const recipe = new FormData();
        recipe.append('csrf_token', csrf_token);
        console.log('csrf_token', csrf_token)
        recipe.append('recipe_name', recipeName);
        recipe.append('recipe_owner', recipeOwner);
        recipe.append('type', type);
        recipe.append('cook_time', cookTime);
        recipe.append('preview_img', previewImg);
        ingredients.forEach((ingredient, index) => {
            console.log('hi')
            recipe.append(`ingredients[${index}][name]`, ingredient.name);
            console.log('ingredient name', ingredient.name)
            recipe.append(`ingredients[${index}][quantity]`, ingredient.quantity);
            console.log('ingredient name', ingredient.quantity)
        });


        console.log('type', type)

        const data = await dispatch(createRecipeThunk(recipe));
        if (data) {
            setErrors(data);
        }
        history.push(`/recipes/${data.id}`)
        closeModal()

        console.log(recipeName, recipeOwner, type, cookTime, previewImg)
        console.log('ingredient', ingredients);

    };

    return (
        <div className="CreateRecipeForm">
            <h1>Post New Recipe</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Recipe Name
                    <input
                        type="text"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Recipe Owner
                    <input
                        type="text"
                        value={recipeOwner}
                        onChange={(e) => setRecipeOwner(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Type
                    <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option></option>
                        <option value="Non-vegetarian">Non-Vegetarian</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                    </select>
                </label>
                <label>
                    Cook Time
                    <input
                        type="text"
                        value={cookTime}
                        onChange={(e) => setCookTime(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Image of Dish
                    <input
                        type="url"
                        value={previewImg}
                        onChange={(e) => setPreviewImg(e.target.value)}
                        required
                    />
                </label>
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

export default CreateRecipeForm;
