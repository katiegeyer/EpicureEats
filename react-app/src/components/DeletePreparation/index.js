import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { deletePreparationThunk, getPreparationsThunk } from "../../store/preparations"
import { useModal } from "../../context/Modal"
import { useHistory } from "react-router-dom"
// import './DeleteIngredient.css'
import { useParams } from 'react-router-dom';


const DeletePreparation = ({ recipeId, preparationId }) => {
    const history = useHistory()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    // const params = useParams()

    // console.log("SONGIDDDD", songId)
    // const songId = useSelector(state => state)

    useEffect(() => {
        dispatch(getPreparationsThunk(recipeId));
    }, [dispatch, recipeId]);
    // const recipeIngredients = useSelector(state => state.ingredients);
    // console.log('recipesssss', recipeIngredients)
    // const recipeIng = recipeIngredients.ingredients
    // const ingredientId = recipeIng.id
    // console.log('INGRWERKJLKFA', recipeIng)
    // const ingredientId = params.ingredientId;
    // const recipeId = params.recipeId;


    // singleIngredient
    const deleteClick = (e) => {
        if (preparationId !== undefined) {
            dispatch(deletePreparationThunk(recipeId, preparationId))
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


export default DeletePreparation
