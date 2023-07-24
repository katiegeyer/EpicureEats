
import React from 'react';
import { NavLink } from 'react-router-dom';
// import { setSearchQuery } from '../actions/searchActions';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useSelector, useDispatch } from 'react-redux';
import CreateRecipeForm from '../CreateRecipeForm';
import ProfileButton from './ProfileButton';
import { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Navigation.css';
import { getAllRecipesThunk } from '../../store/recipes';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const alertClickHandler = () => {
    return alert('Feature Coming Soon!')
}

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("")

    // const handleInputChange = (e) => {
    //     dispatch(setSearchQuery(e.target.value));
    // };

    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     if (searchQuery) {
    //         await dispatch(getAllRecipesThunk(searchQuery));
    //         history.push('/search')
    //     }
    //     setSearchQuery("");
    // }
    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchQuery) {
            await dispatch(getAllRecipesThunk(searchQuery));
            history.push('/search')
        }
        setSearchQuery("");
    }


    return (
        <>
            {sessionUser &&
                <nav className="navbar">
                    <NavLink className="nav-logo" exact to="/">Epicure Eats</NavLink>
                    {/* <form>
                        <div className="nav-search">
                            <input value={searchQuery}
                                className="search-bar"
                                type='search' placeholder="Search..." onChange={e => setSearchQuery(e.target.value)} />
                            <div className='search-icon'>
                                <button onClick={handleSearch} value={searchQuery} className='search-button' type='submit'><i className="fas fa-search fa-lg"></i></button>

                            </div>
                        </div>
                    </form> */}
                    <form onSubmit={handleSearch}>
                        <div className="nav-search">
                            <input value={searchQuery}
                                type='search' placeholder="Search..." onChange={e => setSearchQuery(e.target.value)} />
                            <div className='search-icon'>
                                <button value={searchQuery} className='search-button' type='submit'><i className="fas fa-search fa-lg"></i></button>
                            </div>
                        </div>
                    </form>

                    <div className="nav-links">
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
                    <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                </nav>
            }
        </>
    );
}

export default Navigation;
