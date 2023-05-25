import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCommentThunk } from '../../store/comments';

function CommentForm({ recipeId }) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, we assume createComment is a redux thunk that dispatches an action to add a comment
        dispatch(createCommentThunk(recipeId, { text: comment }));
        setComment(''); // Clear the comment box after submitting
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Add a comment:
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Post Comment</button>
        </form>
    );
}

export default CommentForm;
