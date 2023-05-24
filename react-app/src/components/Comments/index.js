import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, createComment } from '../actions/comments';

function Comments({ recipeId }) {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        dispatch(fetchComments(recipeId));
    }, [dispatch, recipeId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = { text: commentText, recipe_id: recipeId };
        dispatch(createComment(newComment));
        setCommentText('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                {comments.map(comment => (
                    <div key={comment.id}>
                        <h4>{comment.user_name}</h4>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comments;
