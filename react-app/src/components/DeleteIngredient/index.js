import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { deleteIngredientThunk, getIngredientsThunk } from "../../store/ingredients"
import { useModal } from "../../context/Modal"
import { useHistory } from "react-router-dom"
import './DeleteIngredient.css'
import { useParams } from 'react-router-dom';


const DeleteIngredient = () => {
    const history = useHistory()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const recipeId = useParams()

    // console.log("SONGIDDDD", songId)
    // const songId = useSelector(state => state)

    useEffect(() => {
        dispatch(getIngredientsThunk(recipeId));
    }, [dispatch, recipeId]);
    const recipeIngredients = useSelector(state => state.ingredients);
    const recipeIng = recipeIngredients.ingredients
    const ingredientId = recipeIng.id
    console.log('INGRWERKJLKFA', recipeIng)




    // singleIngredient
    const deleteClick = (e) => {
        if (ingredientId) {
            dispatch(deleteIngredientThunk(recipeId, ingredientId))
            closeModal()
            window.location.replace(`/recipes/${recipeId}`)
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


export default DeleteIngredient
