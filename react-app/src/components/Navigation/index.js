import React from 'react';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useSelector } from 'react-redux';
import CreateRecipeForm from '../CreateRecipeForm';
import ProfileButton from './ProfileButton';
import { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import RecipeCard from '../RecipeCard';
import './Navigation.css';

const alertClickHandler = () => {
    return alert('Feature Coming Soon!')
}

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]); // New state for search results

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = async () => {
        const response = await fetch(`/api/recipes/search?q=${query}`);
        const data = await response.json();
        setResults(data.recipes); // Set the results state to the new data
    };

    const settings = {
        centerMode: true,
        centerPadding: '60px',
        arrows: true,
        dots: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: true,
                    slidesToShow: 1
                }
            }
        ]
    };


    return (
        <>
            {sessionUser &&
                <nav className="navbar">
                    <NavLink className="nav-logo" exact to="/">Epicure Eats</NavLink>
                    <div className="nav-search">
                        <input type="text" placeholder="Search feature coming soon!" />
                    </div>
                    {/* <div className="nav-search">
                        <input type="text" value={query} onChange={handleInputChange} />
                        <button onClick={handleSearch}>Search</button>
                        <div className="recipes-list">
                            <Slider {...settings}>
                                {results.map(recipe =>
                                    <div key={recipe.id}>
                                        <RecipeCard recipe={recipe} />
                                    </div>
                                )}
                            </Slider>
                        </div>
                    </div> */}
                    <div className="nav-links">
                        {/* <div onClick={() => alertClickHandler()} >Your Grocery List</div>
                        <div onClick={() => alertClickHandler()} >Your Recipe Box</div>
                        {isLoaded && (
                            <ProfileButton user={sessionUser} />
                        )} */}
                        <OpenModalButton
                            buttonText="Post a Recipe"
                            onItemClick={() => { }}
                            modalComponent={<CreateRecipeForm />}
                        />
                        {isLoaded && (
                            <ProfileButton user={sessionUser} />
                        )}
                    </div>
                </nav>
            }
            {!sessionUser &&
                <nav className="navbar">
                    <NavLink className="nav-logo" exact to="/">Epicure Eats</NavLink>
                    {/* <OpenModalButton
                        buttonText="Sign Up"
                        // onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                    />
                    <OpenModalButton
                        buttonText="Log In"
                        // onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                    /> */}
                </nav>
            }

        </>
    );
}

export default Navigation;
