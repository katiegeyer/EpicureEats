

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRecipesThunk } from '../../store/recipes'
import RecipeCard from '../RecipeCard';
import CreateRecipeForm from '../CreateRecipeForm'
import OpenModalButton from "../OpenModalButton";
import './RecipePage.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router-dom';


const RecipePage = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    const recipes = useSelector(state => Object.values(state.recipes.allRecipes));

    useEffect(() => {
        dispatch(getAllRecipesThunk());
    }, [dispatch]);

    useEffect(() => {
        if (query === '') {
            setFilteredRecipes(recipes);
        } else {
            setFilteredRecipes(recipes.filter((recipe) =>
                recipe.recipe_name.toLowerCase().includes(query.toLowerCase()) ||
                recipe.description.toLowerCase().includes(query.toLowerCase()) ||
                recipe.type.toLowerCase().includes(query.toLowerCase())
            ));
        }
    }, [query, recipes]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    // define settings for slider
    // const settings = {
    //     dots: true,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     arrows: true,
    // };
    const settings = {
        centerMode: true,
        // prevArrow: <button type="button" class="slick-prev">Previous</button>,
        centerPadding: '60px',
        arrows: true,
        dots: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    // centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    // centerMode: true,
                    // centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    }

    return (
        <>
            {/* <div className="nav-link-container"> */}
            {/* <NavLink to="/" className="return-home-link"></NavLink> */}
            {/* </div> */}
            <div className="banner">
                <h1>Epicure Eats</h1>
            </div>
            {/* {sessionUser &&
                <OpenModalButton
                    buttonText="Post a Recipe"
                    onItemClick={() => { }}
                    modalComponent={<CreateRecipeForm />}
                />
            } */}
            {/* <div className="recipes-list">
                <Slider {...settings}>
                    {recipes.map(recipe =>
                        <div key={recipe.id}>
                            <RecipeCard recipe={recipe} />
                        </div>
                    )}
                </Slider>
            </div> */}

            {/* <div>
                <input type="text" value={query} onChange={handleInputChange} placeholder="Search recipes..." />
            </div> */}
            <div className="recipes-list">
                <Slider {...settings}>
                    {filteredRecipes.map(recipe =>
                        <div key={recipe.id}>
                            <RecipeCard recipe={recipe} />
                        </div>
                    )}
                </Slider>
            </div>
            {/* <br />
            < br />
            <br /> */}
        </>
    );
};

export default RecipePage;
