import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RecipeCard from "../RecipeCard";
import ErrorPage from "../ErrorPage";

function Search() {
    const history = useHistory();
    const recipes = useSelector(state => Object.values(state.recipes.allRecipes));
    const recipesArray = Object.values(recipes);

    // add loading state
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // when recipes changes, update loading state
        setIsLoading(!recipesArray.length);
    }, [recipesArray]);

    // if (isLoading) return <div>Loading...</div>
    // if (!recipesArray.length) return <ErrorPage />

    return (
        <div className="search-page">
            <h1>Recipe Results</h1>
            <div className="search-results">
                {recipesArray.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)}
            </div>
        </div>
    )


    // if (!recipesArray.length) return <ErrorPage />
    // return (
    //     <div className="search-page">
    //         <h1>Recipe Results</h1>
    //         <div className="search-results">
    //             {recipesArray.map(recipe => <RecipeCard recipe={recipe} key={recipe.id} />)}
    //         </div>
    //     </div>
    // )
}

export default Search;
