import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    return (
        <nav className="navbar">
            <NavLink className="nav-logo" exact to="/">Epicure Eats</NavLink>
            <div className="nav-search">
                <input type="text" placeholder="Search Recipes"/>
            </div>
            <div className="nav-links">
                <NavLink to="/grocery-list">Your Grocery List</NavLink>
                <NavLink to="/recipe-box">Your Recipe Box</NavLink>
                {isLoaded && (
                    <ProfileButton user={sessionUser} />
                )}
            </div>
        </nav>
    );
}

export default Navigation;
