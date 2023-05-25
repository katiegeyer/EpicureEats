import { useDispatch, useSelector } from "react-redux"
import { removeCommentThunk } from "../../store/comments"
import { useModal } from "../../context/Modal"
import { useHistory } from "react-router-dom"
// import './DeleteRecipe.css'
// import { useParams } from 'react-router-dom';


const DeleteComment = ({ commentId, recipeId }) => {
    const history = useHistory()
    console.log('commentididid', commentId)
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    // const recipeId = useParams()

    // console.log("SONGIDDDD", songId)
    // const songId = useSelector(state => state)
    // const deleteClick = (e) => {
    //     if (commentId) {
    //         dispatch(removeCommentThunk(commentId, recipeId))
    //         closeModal()
    //         window.location.replace(`/recipes/${recipeId}`)
    //     }
    // }

    const deleteClick = (e) => {
        console.log('Deleting commentId:', commentId);
        console.log('From recipeId:', recipeId);
        if (commentId) {
            dispatch(removeCommentThunk(recipeId, commentId));
            closeModal();
            window.location.replace(`/recipes/${recipeId}`);
        }
    }

    const keepClick = (e) => {
        closeModal()
    }

    return (
        <div className="confirm-delete-wrapper">
            <div className="confirm-delete-inner-wrapper">
                <div className="confirm-delete-title">Confirm Delete</div>
                <div className="confirm-delete-question">Are you sure you want to remove this item? This action cannot be undone.</div>
                <div className="confirm-delete-buttons">
                    <div className="confirm-delete-delete confirm-buttons" onClick={deleteClick}>{`Delete`}</div>
                    <div className="confirm-delete-cancel confirm-buttons" onClick={keepClick}>{`Cancel`}</div>
                </div>
            </div>
        </div>
    )
}


export default DeleteComment
