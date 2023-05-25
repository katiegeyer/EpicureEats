import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPreparationThunk } from "../../store/preparations";
import { useModal } from "../../context/Modal";
// import './PreparationForm.css'; // Remember to create a CSS file for this component
import { getRecipeThunk } from "../../store/recipes";

function PreparationForm({ preparation, setUpdate }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const recipe = useSelector(state => state.recipes.singleRecipe);
    const recipeId = recipe.id
    const { closeModal } = useModal();

    const [steps, setSteps] = useState([{ step_number: "", instruction: "" }]);
    const [errors, setErrors] = useState([]);

    const handleStepChange = (index, event) => {
        const values = [...steps];
        if (event.target.name === "step_number") {
            values[index].step_number = event.target.value;
        } else {
            values[index].instruction = event.target.value;
        }
        setSteps(values);
    };

    const handleAddStep = () => {
        setSteps([...steps, { step_number: "", instruction: "" }]);
    };

    const handleRemoveStep = (index) => {
        const values = [...steps];
        values.splice(index, 1);
        setSteps(values);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const stepObj = {
            steps: steps.map((step) => ({
                step_number: step.step_number,
                instruction: step.instruction
            }))
        };

        const data = await dispatch(createPreparationThunk(recipeId, stepObj.steps));
        if (data.status == 'error') {
            setErrors(data);
        } else {
            setUpdate(prev => !prev); // This will cause the RecipeDetails component to re-render
        }
        closeModal();
    }

    return (
        <div className="CreateRecipeForm">
            <h1>Add Steps</h1>
            <form onSubmit={handleSubmit}>
                {steps.map((step, index) => (
                    <div key={index}>
                        <label>
                            Step Number
                            <input
                                type="number"
                                name="step_number"
                                value={step.step_number}
                                onChange={(event) => handleStepChange(index, event)}
                                required
                            />
                        </label>
                        <label>
                            Instruction
                            <textarea
                                name="instruction"
                                value={step.instruction}
                                onChange={(event) => handleStepChange(index, event)}
                                required
                            />
                        </label>
                        <button type="button" onClick={() => handleRemoveStep(index)}>
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddStep}>
                    Add Step
                </button>

                <button type="submit">Enter</button>
            </form>
        </div>
    );
}

export default PreparationForm;
