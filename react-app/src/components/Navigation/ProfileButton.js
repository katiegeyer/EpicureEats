import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UpdateProfile from "../UpdateUser";
import DeleteRecipe from "../DeleteRecipe";
import DeleteUser from "../DeleteUser";
import MyRecipes from "../MyRecipes";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')

  };
  const goToMyRecipes = () => {
    history.push('/myrecipes');
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="profile-button-wrapper">
        <button onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li>{user.username}</li>
              <br />
              <li>{user.email}</li>
              <br />
              <li>
                <button onClick={goToMyRecipes}>My Recipes</button>
              </li>
              <br />
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
              <br />
              <OpenModalButton
                buttonText="Delete Account"
                onItemClick={closeMenu}
                modalComponent={<DeleteUser />}
              />

            </>
          ) : (
            <>
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default ProfileButton;
