import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeThunk } from '../../store/recipes';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './SplashPage.css';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";



// function SplashPage() {
//     const sessionUser = useSelector((state) => state.session.user);
//     const recipe = useSelector((state) => state.recipes.singleRecipe);
//     const dispatch = useDispatch();
//     const [showOverlay, setShowOverlay] = useState(false);
//     const { id } = useParams();

//     // return (
//     //     <div className="splash-container">
//     //         <div className="splash-header">
//     //             <h1>Welcome to Epicure Eats</h1>
//     //             {/* {recipe.preview_image} */}
//     //             <p>Discover, cook, enjoy.</p>
//     //         </div>
//     //         <div className="splash-image">
//     //             <img src='https://bestbeefrecipes.com/wp-content/uploads/2022/06/loaded-burgers-featured.jpg'
//     //                 alt="Placeholder"
//     //                 onClick={() => setShowOverlay(true)}
//     //             />
//     //             {showOverlay && <div className="recipe-card-sp" />}
//     //             <div className="recipe-card-sp">
//     //                 <h2>Hamburgers</h2>
//     //                 <p>Hamburgers, an iconic culinary delight that has captivated taste buds for generations</p>
//     //                 <p>Peter Quill</p>
//     //             </div>
//     //         </div>

//     //     </div>
//     // )
//     return (
//         <div className="splash-container">
//             <div className="splash-header">
//                 <h1>Welcome to Epicure Eats</h1>
//                 <p>Discover, cook, enjoy.</p>
//             </div>
//             <br />
//             <div className="splash-image">
//                 <img
//                     src='https://www.pnas.org/cms/10.1073/pnas.1913308116/asset/053e8f99-6de4-4c07-b7fc-64424aff27b7/assets/graphic/pnas.1913308116fig01.jpeg'
//                     alt="Placeholder"
//                     onClick={() => setShowOverlay(true)}
//                 />
//                 {showOverlay && (
//                     <div onClick={() => setShowOverlay(false)}>
//                         <div className="shade">
//                             {/* <div className="recipe-card-sp"> */}
//                                 <h2>finding more than just recipes</h2>
//                                 <p>there is something profoundly satisfying about sharing a meal.  eating together, breaking bread together, is one of the oldest and most fundamentally unifying of human experiences.</p>
//                                 <p>barbara coloroso</p>
//                             </div>
//                         </div>
//                     // </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default SplashPage;
function SplashPage() {
    const [showOverlay, setShowOverlay] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="splash-container">
            <div className="splash-header">
                <h1>Welcome to Epicure Eats</h1>
                <p>Discover, cook, enjoy.</p>
            </div>
            <br />
            <div className="splash-image"
                onMouseEnter={() => setShowOverlay(true)}
                onMouseLeave={() => setShowOverlay(false)}
            >
                <img
                    src='https://www.pnas.org/cms/10.1073/pnas.1913308116/asset/053e8f99-6de4-4c07-b7fc-64424aff27b7/assets/graphic/pnas.1913308116fig01.jpeg'
                    alt="Placeholder"
                    onClick={() => setShowOverlay(true)}
                />
                {showOverlay && !sessionUser && (
                    <div onClick={() => setShowOverlay(false)}>
                        <div className="shade"></div>
                        <div className="recipe-card-sp">
                            <h2>Join Epicure Eats and Explore a World of Recipes</h2>
                            <p>Sign up to gain access to a diverse range of recipes. Discover flavors you never knew existed and elevate your cooking game to the next level.</p>
                            <OpenModalButton
                                className="signup-login-buttons"
                                buttonText="Sign Up"
                                modalComponent={<SignupFormModal />}
                            />
                            <br />
                            <br />
                            <h2>Already a Member? Log In to Continue Your Culinary Journey</h2>
                            <p>Have an account? Log in to find new recipes, save your favorites, and share your culinary creations with our community.</p>
                            <OpenModalButton
                                className="signup-login-buttons"
                                buttonText="Log In"
                                modalComponent={<LoginFormModal />}
                            />
                        </div>
                    </div>
                )}
                {showOverlay && sessionUser && (
                    <div onClick={() => setShowOverlay(false)}>
                        <div className="shade"></div>
                        <div className="recipe-card-sp">
                            <h2>Welcome Back, {sessionUser.username}!</h2>
                            <p>We're glad to see you again. Explore and discover new flavors or revisit your favorite recipes.</p>
                            <NavLink to="/recipes" className="signup-login-buttons">Explore Recipes</NavLink>
                        </div>
                    </div>
                )}

            </div>
            <br />
            <div className="recipe-para">
                <h2>Finding More Than Just Recipes</h2>
                <p>There is something profoundly satisfying about sharing a meal. Eating together, breaking bread together, is one of the oldest and most fundamentally unifying of human experiences.</p>
                <p>Barbara Coloroso</p>
            </div>
            <br />
            <br />

            <div className='splash-page-footer'>
                <div className='splash-page-footer-inner'>
                    Find out more about us: <a href='https://github.com/katiegeyer' target="_blank">Katie's Github</a>

                </div>
            </div>
        </div>

    )
}


export default SplashPage;
