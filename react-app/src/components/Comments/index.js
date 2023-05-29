import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCommentThunk, fetchCommentsThunk, removeCommentThunk } from '../../store/comments';
import moment from 'moment';
import OpenModalButton from '../OpenModalButton';
import DeleteComment from '../DeleteComment';
import './Comments.css';

function Comments({ recipeId }) {
    const dispatch = useDispatch();
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [userName, setUserName] = useState('');
    const [displayErr, setDisplayErr] = useState(false)
    const [err, setErr] = useState({});



    const comment = useSelector(state => state.comments.comments)
    const sessionUser = useSelector((state) => state.session.user);
    const commentUserId = comment.map(c => c.user_id);
    console.log('COMENT OWNER', commentUserId)
    console.log('session', sessionUser.id)

    // useEffect(() => {
    //     const errors = {}
    //     if (!commentText) errors.comment = "Comment cannot be empty"
    //     if (commentText.length < 5) errors.commentLength = "Comment must be greater than 5 characters"
    //     if (!userName) errors.user_name = "Display name is required"
    //     setErr(errors)
    // }, [commentText, userName])


    const fetchComments = async () => {
        if (!recipeId) return;
        const data = await dispatch(fetchCommentsThunk(recipeId));
        if (Array.isArray(data.comments)) {
            setComments(data.comments);
        } else {
            console.warn("data fetched not an array", data);
        }
    }
    console.log('COMEOSOFKJASFSDF', comment.id)
    console.log('Comment IDs:', comment.map(c => c.id));
    console.log('recipe ID', recipeId)

    useEffect(() => {
        fetchComments();
    }, [dispatch, recipeId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!commentText) errors.comment = "Comment cannot be empty";
        if (commentText.length < 5) errors.commentLength = "Comment must be greater than 5 characters";
        if (!userName) errors.user_name = "Display name is required";
        if (Object.keys(errors).length > 0) {
            setErr(errors);
            console.log('errorssss', errors);
            setDisplayErr(true);
        }
        else {
            const newComment = {
                user_name: userName,
                text: commentText,
                recipe_id: recipeId,
            };
            await dispatch(createCommentThunk(recipeId, newComment));
            setCommentText('');
            setUserName('');
            setErr({});
            fetchComments();
        };
        if (typeof recipeId === 'undefined') {
            console.error('recipeId is undefined!');
        }
    }

    return (
        <div className="comments-container">
            <h1>Leave a Review</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className="name-input"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    placeholder="Enter your display name"
                /> {displayErr === true && err.user_name && (<div className="errors">Must include Display Name</div>)}
                <input
                    className="comment-input"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Add a review..."
                />
                {displayErr === true && err.commentLength && (<div className="errors">Review must be greater than 5 characters</div>)}
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
                        {sessionUser.id == comment.user_id &&
                            <OpenModalButton
                                buttonText="Delete"
                                commentId={comment.id}
                                modalComponent={<DeleteComment recipeId={recipeId} commentId={comment.id} />}
                            />
                        }
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
