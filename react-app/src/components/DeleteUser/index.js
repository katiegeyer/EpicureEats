import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUserThunk } from '../../store/users'; // replace with the correct path to your Redux file


const DeleteUser = () => {
    const dispatch = useDispatch();

    // Assume you have a state in Redux store that holds the current user information
    // and 'id' is one of the properties
    const sessionUser = useSelector((state) => state.session.user);
    const current_user = sessionUser.id;

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            dispatch(deleteUserThunk(current_user));
            // After deleting the user, you might want to redirect to a different page or clear user from local state
            // Depending on your application, you might want to handle this inside the deleteUserThunk itself
        }
        window.location.replace('/')
    };

    return (
        <div>
            <h2>Delete User Account</h2>
            <button onClick={handleDelete}>Delete My Account</button>
        </div>
    );
};

export default DeleteUser;
