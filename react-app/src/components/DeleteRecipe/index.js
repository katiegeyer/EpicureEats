import { useDispatch, useSelector } from "react-redux"
import { deleteRecipeThunk } from "../../store/recipes"
import { useModal } from "../../context/Modal"
import { useHistory } from "react-router-dom"
import './DeleteRecipe.css'
// import { useParams } from 'react-router-dom';


const DeleteRecipe = ({ recipeId }) => {
    const history = useHistory()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    // const recipeId = useParams()

    // console.log("SONGIDDDD", songId)
    // const songId = useSelector(state => state)
    const deleteClick = (e) => {
        if (recipeId) {
            dispatch(deleteRecipeThunk(recipeId))
            closeModal()
            window.location.replace('/recipes')
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


export default DeleteRecipe
