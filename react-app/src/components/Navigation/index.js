import React from 'react';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useSelector } from 'react-redux';
import CreateRecipeForm from '../CreateRecipeForm';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const alertClickHandler = () => {
    return alert('Feature Coming Soon!')
}

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);


    return (
        <>
            {sessionUser &&
                <nav className="navbar">
                    <NavLink className="nav-logo" exact to="/">Epicure Eats</NavLink>
                    <div className="nav-search">
                        <input type="text" placeholder="Search feature coming soon!" />
                    </div>
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
