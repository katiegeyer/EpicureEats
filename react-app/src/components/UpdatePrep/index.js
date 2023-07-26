import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePreparationThunk, getPreparationsThunk } from "../../store/preparations";
import { useModal } from "../../context/Modal";

function UpdatePreparationForm({ preparation, preparationId, recipeId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const prep = useSelector(state => state.preparations[preparation]);

    const [step_number, setStepNumber] = useState('');
    const [instruction, setInstruction] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const fetchPreparationDetails = async () => {
            await dispatch(getPreparationsThunk(recipeId, preparationId));
        };
        fetchPreparationDetails();
    }, [dispatch, preparationId]);

    // useEffect(() => {
    //     if (preparationId) {
    //         setStepNumber(preparation.step_number);
    //         setInstruction(preparation.instruction);
    //     }
    // }, [preparation]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPreparation = [{
            step_number: step_number,
            instruction: instruction,
        }];
        const data = await dispatch(updatePreparationThunk(recipeId, preparationId, updatedPreparation));
        if (data.status == 'error') {
            setErrors(data);
        }
        closeModal();
    }

    return (
        <div className="UpdatePreparationForm">
            <h1>Update Preparation</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Step Number
                    <input
                        type="number"
                        value={step_number}
                        onChange={(e) => setStepNumber(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Instruction
                    <textarea
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Update</button>
            </form>
            {/* {errors && errors.map((error, idx) => <div key={idx}>{error}</div>)} */}
        </div>
    );
}

export default UpdatePreparationForm;
