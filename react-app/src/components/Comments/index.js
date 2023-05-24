import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCommentThunk, fetchCommentsThunk } from '../../store/comments';
import { getRecipeThunk } from '../../store/recipes';

function Comments() {
    const dispatch = useDispatch();
    const com = useSelector(state => state.comments) || [];
    const comments = com.comments
    console.log('these are the comnments', comments)
    const recipe = useSelector(state => state.recipes.singleRecipe)
    const recipeId = recipe.id
    console.log(recipeId)
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        dispatch(fetchCommentsThunk(recipeId));
    }, [dispatch, recipeId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = { text: commentText, recipe_id: recipeId };
        dispatch(createCommentThunk(newComment));
        setCommentText('');
    };
    console.log('comments',  comments);

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
                {comments && comments.map(comment => (
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


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { createCommentThunk, fetchCommentsThunk } from '../../store/comments';
// import { getRecipeThunk } from '../../store/recipes';

// function Comments() {
//     const dispatch = useDispatch();
//     const comments = useSelector(state => state.comments);
//     const recipe = useSelector(state => state.recipes.singleRecipe)
//     const recipeId = recipe.id
//     console.log(recipeId)
//     const [commentText, setCommentText] = useState('');

//     useEffect(() => {
//         dispatch(fetchCommentsThunk(recipeId));
//     }, [dispatch, recipeId]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newComment = { text: commentText, recipe_id: recipeId };
//         dispatch(createCommentThunk(newComment));
//         setCommentText('');
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     value={commentText}
//                     onChange={e => setCommentText(e.target.value)}
//                     placeholder="Add a comment..."
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//             <div>
//                 {comments.map(comment => (
//                     <div key={comment.id}>
//                         <h4>{comment.user_name}</h4>
//                         <p>{comment.text}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Comments;
