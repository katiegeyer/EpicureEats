// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { createRecipeThunk } from "../../store/recipes";
// import { useModal } from "../../context/Modal";
// import './CreateRecipeForm.css'; // Remember to import your CSS

// function CreateRecipeForm() {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const sessionUser = useSelector((state) => state.session.user);
//     const { closeModal } = useModal();
//     const [recipeName, setRecipeName] = useState("");
//     const [recipeOwner, setRecipeOwner] = useState("");
//     const [type, setType] = useState("");
//     const [cookTime, setCookTime] = useState("");
//     const [previewImg, setPreviewImg] = useState("");
//     const [description, setDescription] = useState("");
//     const [errors, setErrors] = useState([]);
//     //instead of using formdata, create a POJO and stringify it to be JSON value
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const recipe = new FormData();
//         recipe.append('recipe_name', recipeName);
//         recipe.append('recipe_owner', recipeOwner);
//         recipe.append('type', type);
//         recipe.append('cook_time', cookTime);
//         recipe.append('preview_img', previewImg);
//         recipe.append('description', description || "")

//         console.log('type', type)

//         const data = await dispatch(createRecipeThunk(recipe));
//         // if (data) {
//         //     setErrors(data);
//         // }
//         // history.push(`/recipes/${data.id}`)
//         // closeModal()
//         if (data && 'id' in data) {
//             history.push(`/recipes/${data.id}`)
//             closeModal()
//         } else {
//             setErrors(data);
//         }

//         console.log(recipeName, recipeOwner, type, cookTime, previewImg)
//     };

//     return (
//         <div className="CreateRecipeForm">
//             <h1>Post New Recipe</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Recipe Name
//                     <input
//                         type="text"
//                         value={recipeName}
//                         onChange={(e) => setRecipeName(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Recipe Owner
//                     <input
//                         type="text"
//                         value={recipeOwner}
//                         onChange={(e) => setRecipeOwner(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Type
//                     <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
//                         <option></option>
//                         <option value="Non-vegetarian">Non-Vegetarian</option>
//                         <option value="Vegetarian">Vegetarian</option>
//                         <option value="Vegan">Vegan</option>
//                     </select>
//                 </label>
//                 <label>
//                     Cook Time
//                     <input
//                         type="text"
//                         value={cookTime}
//                         onChange={(e) => setCookTime(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Description
//                     <input
//                         type="text"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label>
//                     Image of Dish
//                     <input
//                         type="url"
//                         value={previewImg}
//                         onChange={(e) => setPreviewImg(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <button type="submit">Enter</button>
//             </form>
//         </div>
//     );
// }

// export default CreateRecipeForm;

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRecipeThunk } from "../../store/recipes";
import { useModal } from "../../context/Modal";
import './CreateRecipeForm.css'; // Remember to import your CSS

function CreateRecipeForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    const [recipeName, setRecipeName] = useState("");
    const [recipeOwner, setRecipeOwner] = useState("");
    const [type, setType] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [description, setDescription] = useState("");
    const [err, setErr] = useState({});
    const [displayErr, setDisplayErr] = useState(false);

    //instead of using formdata, create a POJO and stringify it to be JSON value
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!recipeName) errors.recipeName = "Recipe Name cannot be empty";
        if (!recipeOwner) errors.recipeOwner = "Recipe Owner cannot be empty";
        if (!type) errors.type = "Type is required";
        if (!cookTime) errors.cookTime = "Cook Time is required";
        if (!previewImg) errors.previewImg = "Preview Image is required";
        if (!description) errors.description = "Description is required";

        if (Object.keys(errors).length > 0) {
            setErr(errors);
            setDisplayErr(true);
        } else {
            const recipe = new FormData();
            recipe.append('recipe_name', recipeName);
            recipe.append('recipe_owner', recipeOwner);
            recipe.append('type', type);
            recipe.append('cook_time', cookTime);
            recipe.append('preview_img', previewImg);
            recipe.append('description', description || "")

            const data = await dispatch(createRecipeThunk(recipe));

            if (data && 'id' in data) {
                history.push(`/recipes/${data.id}`)
                closeModal()
            } else {
                setErr(data);
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-modal">
                <h1>Post New Recipe</h1>

                <form onSubmit={handleSubmit}>
                    <label>
                        Recipe Name
                        <br />

                        <input
                            type="text"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            required
                        />
                        {displayErr === true && err.recipeName && (<div className="errors">Recipe Name cannot be empty</div>)}
                        <br />

                    </label>
                    <label>
                        Recipe Owner
                        <br />

                        <input
                            type="text"
                            value={recipeOwner}
                            onChange={(e) => setRecipeOwner(e.target.value)}
                            required
                        />
                        {displayErr === true && err.recipeOwner && (<div className="errors">Recipe Owner cannot be empty</div>)}
                        <br />


                    </label>
                    <label>
                        Type
                        <br />

                        <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)} required>
                            <option></option>
                            <option value="Non-vegetarian">Non-Vegetarian</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Vegan">Vegan</option>
                        </select>
                        {displayErr === true && err.type && (<div className="errors">Type is required</div>)}
                        <br />


                    </label>
                    <label>
                        Cook Time
                        <br />

                        <input
                            type="text"
                            value={cookTime}
                            onChange={(e) => setCookTime(e.target.value)}
                            required
                        />
                        {displayErr === true && err.cookTime && (<div className="errors">Cook Time is required</div>)}
                        <br />


                    </label>
                    <label>
                        Description
                        <br />

                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        {displayErr === true && err.description && (<div className="errors">Description is required</div>)}
                        <br />

                    </label>
                    <label>
                        Image of Dish
                        <br />

                        <input
                            type="url"
                            value={previewImg}
                            onChange={(e) => setPreviewImg(e.target.value)}
                            required
                        />
                        {displayErr === true && err.previewImg && (<div className="errors">Preview Image is required</div>)}
                        <br />


                    </label>
                    <br />

                    <button type="submit">Enter</button>
                </form>
            </div>
        </div>
    );
}

export default CreateRecipeForm;
