import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCommentThunk, fetchCommentsThunk } from '../../store/comments';
import moment from 'moment';
import './Comments.css';

function Comments({ recipeId }) {
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [userName, setUserName] = useState('');

    const fetchComments = async () => {
        const data = await dispatch(fetchCommentsThunk(recipeId));
        if (Array.isArray(data.comments)) {
            setComments(data.comments);
        } else {
            console.warn("data fetched not an array", data);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [dispatch, recipeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newComment = {
            user_name: userName,
            text: commentText,
            recipe_id: recipeId,
        };
        await dispatch(createCommentThunk(recipeId, newComment));
        setCommentText('');
        setUserName('');
        fetchComments();
    };

    return (
        <div className="comments-container">
            <h1>Leave a Review</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="name-input"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    placeholder="Enter your display name"
                />
                <input
                    className="comment-input"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Add a review..."
                />
                <br />
                <button className="submit-button" type="submit">Submit</button>
            </form>
            <div className="comments-list">
                {comments && comments.map(comment => (
                    <div key={comment.id} className="comment-card">
                        <div className="comment-header">
                            <h4>{comment.user_name}</h4>
                            <h5>{moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}</h5>
                        </div>
                        <p className="comment-text">{comment.comment}</p>
                    </div>
                ))}
            </div>
        </div >
    );
}

export default Comments;


// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { createCommentThunk, fetchCommentsThunk } from '../../store/comments';
// import { getRecipeThunk } from '../../store/recipes';

// function Comments({ recipeId }) {
//     const dispatch = useDispatch();
//     const [comments, setComments] = useState([]);
//     const sessionUser = useSelector((state) => state.session.user);
//     const current_user = sessionUser.id;
//     console.log('current', current_user)


//     // const comments = useSelector(state => state.comments) || [];
//     // console.log(comments)
//     // const comments = com.comments
//     // console.log('these are the comnments', comments)
//     // const recipe = useSelector(state => state.recipes.singleRecipe)
//     // const recipeId = recipe.id
//     console.log(recipeId)
//     const [commentText, setCommentText] = useState('');
//     const [userName, setUserName] = useState('')
//     const [commentTime, setCommentTime] = useState('')

//     // useEffect(async () => {
//     //     const data = await dispatch(fetchCommentsThunk(recipeId));
//     //     console.log('data fetched', data);
//     //     if (Array.isArray(data.comments)) {
//     //         setComments(data.comments);
//     //     } else {
//     //         console.warn("data fetched not an array", data)
//     //             ;
//     //     }
//     // }, [dispatch, recipeId]);

//     const fetchComments = async () => {
//         const data = await dispatch(fetchCommentsThunk(recipeId));
//         console.log('data fetched', data);
//         if (Array.isArray(data.comments)) {
//             setComments(data.comments);
//         } else {
//             console.warn("data fetched not an array", data);
//         }
//     }

//     useEffect(() => {
//         fetchComments();
//     }, [dispatch, recipeId]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newComment = { user_name: userName, text: commentText, recipe_id: recipeId, user_id: current_user, created_at: commentTime };
//         dispatch(createCommentThunk(recipeId, newComment));
//         setCommentText('');
//         fetchComments();
//     };

//     // console.log('comments', comments);

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     value={userName}
//                     onChange={e => setUserName(e.target.value)}
//                     placeholder="Enter your name."
//                 />
//                 <input
//                     value={commentText}
//                     onChange={e => setCommentText(e.target.value)}
//                     placeholder="Add a comment..."
//                 />
//                 <button type="submit">Submit</button>
//             </form>
//             <div>
//                 {comments && comments.map(comment => (
//                     <div key={comment.id}>
//                         <h4>{comment.user_name}</h4>
//                         <h5>{comment.created_at}</h5>
//                         <p>{comment.comment}</p>

//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Comments;
