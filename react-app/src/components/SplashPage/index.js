import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeThunk } from '../../store/recipes';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


function SplashPage() {
    const sessionUser = useSelector((state) => state.session.user);
    const recipe = useSelector((state) => state.recipes.singleRecipe);
    const dispatch = useDispatch();
    const [showOverlay, setShowOverlay] = useState(false);
    const { id } = useParams();

    // return (
    //     <div className="splash-container">
    //         <div className="splash-header">
    //             <h1>Welcome to Epicure Eats</h1>
    //             {/* {recipe.preview_image} */}
    //             <p>Discover, cook, enjoy.</p>
    //         </div>
    //         <div className="splash-image">
    //             <img src='https://bestbeefrecipes.com/wp-content/uploads/2022/06/loaded-burgers-featured.jpg'
    //                 alt="Placeholder"
    //                 onClick={() => setShowOverlay(true)}
    //             />
    //             {showOverlay && <div className="recipe-card-sp" />}
    //             <div className="recipe-card-sp">
    //                 <h2>Hamburgers</h2>
    //                 <p>Hamburgers, an iconic culinary delight that has captivated taste buds for generations</p>
    //                 <p>Peter Quill</p>
    //             </div>
    //         </div>

    //     </div>
    // )
    return (
        <div className="splash-container">
            <div className="splash-header">
                <h1>Welcome to Epicure Eats</h1>
                <p>Discover, cook, enjoy.</p>
            </div>
            <div className="splash-image">
                <img
                    src='https://bestbeefrecipes.com/wp-content/uploads/2022/06/loaded-burgers-featured.jpg'
                    alt="Placeholder"
                    onClick={() => setShowOverlay(true)}
                />
                {showOverlay && (
                    <div onClick={() => setShowOverlay(false)}>
                        <div className="recipe-card-sp">
                            <h2>Hamburgers</h2>
                            <p>Hamburgers, an iconic culinary delight that has captivated taste buds for generations</p>
                            <p>Peter Quill</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SplashPage;
