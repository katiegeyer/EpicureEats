import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRecipeThunk } from "../../store/recipes";
import { getRecipeThunk } from "../../store/recipes";
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';

import { useParams } from "react-router-dom";


function UpdateRecipeForm({ recipeId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    const history = useHistory();


    // const { id: recipeId } = useParams();
    console.log('id', recipeId)
    const singleRecipe = useSelector((state) => state.recipes.singleRecipe);



    // useEffect(() => {
    //     const fetchRecipeDetails = async () => {
    //         const singleRecipe = dispatch(getRecipeThunk(recipeId));
    //         if (singleRecipe) {
    //             setRecipeName(singleRecipe.recipe_name)
    //             setRecipeOwner(singleRecipe.recipe_owner)
    //             setType(singleRecipe.type)
    //             setCookTime(singleRecipe.cook_time)
    //             setPreviewImg(singleRecipe.preview_img || '')
    //         }
    //     }
    //     fetchRecipeDetails();
    // }, [dispatch, recipeId]);



    // const [recipe_name, setRecipeName] = useState(singleRecipe.recipe_name);
    // const [recipe_owner, setRecipeOwner] = useState(singleRecipe.recipe_owner);
    // const [type, setType] = useState(singleRecipe.type);
    // const [cook_time, setCookTime] = useState(singleRecipe.cook_time);
    // const [preview_img, setPreviewImg] = useState(singleRecipe.preview_img);
    const [recipe_name, setRecipeName] = useState('');
    const [recipe_owner, setRecipeOwner] = useState('');
    const [type, setType] = useState('');
    const [cook_time, setCookTime] = useState('');
    const [description, setDescription] = useState('')
    const [preview_img, setPreviewImg] = useState('');

    const [errors, setErrors] = useState([]);
    // console.log('name', preview_img)

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            await dispatch(getRecipeThunk(recipeId));
        };
        fetchRecipeDetails();
    }, [dispatch, recipeId]);

    console.log('single recipe', singleRecipe)
    useEffect(() => {
        if (singleRecipe) {
            setRecipeName(singleRecipe.recipe_name);
            setRecipeOwner(singleRecipe.recipe_owner);
            setType(singleRecipe.type);
            setCookTime(singleRecipe.cook_time);
            setDescription(singleRecipe.description);
            setPreviewImg(singleRecipe.preview_img || '');
        }
    }, [singleRecipe]);

    // useEffect(() => {
    //     const fetchRecipeDetails = async () => {
    //         const singleRecipe = dispatch(getRecipeThunk(recipeId));
    //         if (singleRecipe) {
    //             setRecipeName(singleRecipe.recipe_name)
    //             setRecipeOwner(singleRecipe.recipe_owner)
    //             setType(singleRecipe.type)
    //             setCookTime(singleRecipe.cook_time)
    //             setPreviewImg(singleRecipe.preview_img || '')
    //         }
    //     }
    //     fetchRecipeDetails();
    // }, [dispatch, recipeId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = new FormData()
        updatedFormData.append('recipe_name', recipe_name)
        updatedFormData.append('recipe_owner', recipe_owner)
        updatedFormData.append('type', type)
        updatedFormData.append('cook_time', cook_time)
        updatedFormData.append('description', description)
        updatedFormData.append('preview_img', preview_img)
        // const updatedRecipe = {
        //     recipe_name: recipe_name,
        //     recipe_owner: recipe_owner,
        //     type: type,
        //     cook_time: cook_time,
        //     preview_img: preview_img,
        // };
        console.log('FORM DATA', updatedFormData)
        for (let [key, value] of updatedFormData.entries()) {
            console.log(key, value);
        }
        const data = await dispatch(updateRecipeThunk(recipeId, updatedFormData));
        if (data) {
            setErrors(data);
        }
        // await dispatch(updateRecipeThunk(recipeId));
        closeModal();
        // history.push(`/recipes/${recipeId}`);
    };
    console.log('single', singleRecipe)


    return (
        <div className="login-page">
            <div className="login-modal">
                <h1>Update Recipe</h1>
                <br />

                <form onSubmit={handleSubmit}>
                    <label>
                        Recipe Name
                        <br />

                        <input
                            type="text"
                            value={recipe_name}
                            onChange={(e) => setRecipeName(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <br />

                    <label>
                        Recipe Owner
                        <br />

                        <input
                            type="text"
                            value={recipe_owner}
                            onChange={(e) => setRecipeOwner(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <br />


                    <label>
                        Type
                        <br />

                        <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)} required>
                            <option></option>
                            <option value="Non-vegetarian">Non-Vegetarian</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                        </select>
                    </label>
                    <br />
                    <br />

                    <label>
                        Cook Time
                        <br />

                        <input
                            type="text"
                            value={cook_time}
                            onChange={(e) => setCookTime(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Description
                        <br />

                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Image of Dish
                        <br />

                        <input
                            type="url"
                            value={preview_img}
                            onChange={(e) => setPreviewImg(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <br />
                    <br />

                    <button type="submit">Enter</button>
                </form>
            </div>
        </div>

    );
}

export default UpdateRecipeForm;
