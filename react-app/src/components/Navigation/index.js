import React from 'react';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            {sessionUser &&
                <nav className="navbar">
                    <NavLink className="nav-logo" exact to="/">Epicure Eats</NavLink>
                    <div className="nav-search">
                        <input type="text" placeholder="Search Recipes" />
                    </div>
                    <div className="nav-links">
                        <NavLink to="/grocery-list">Your Grocery List</NavLink>
                        <NavLink to="/recipe-box">Your Recipe Box</NavLink>
                        {isLoaded && (
                            <ProfileButton user={sessionUser} />
                        )}
                    </div>
                </nav>
            }
            {!sessionUser &&
                <nav className="navbar">
                    <NavLink className="nav-logo" exact to="/">Epicure Eats</NavLink>
                    <OpenModalButton
                        buttonText="Sign Up"
                        // onItemClick={closeMenu}
                        modalComponent={<SignupFormModal />}
                    />
                    <OpenModalButton
                        buttonText="Log In"
                        // onItemClick={closeMenu}
                        modalComponent={<LoginFormModal />}
                    />
                </nav>
            }
            
        </>
    );
}

export default Navigation;
