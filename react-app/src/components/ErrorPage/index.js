import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./ErrorPage.css"

function ErrorPage() {
    const history = useHistory();
    return (
        <div className="error-page">
            <h1>No Recipes Found</h1>
            <button onClick={() => history.push("/")} className="recipe-return">Back To Recipes</button>
        </div>
    )
}

export default ErrorPage;
