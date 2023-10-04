import { useEffect, useState } from "react";
import axios from "axios";
import {useGetUserID} from '../hooks/useGetUserID.js'
import {useCookies} from 'react-cookie'


export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes,setSavedRecipes] = useState([]);
  const [cookies,_] = useCookies(["access_token"])
  const userID = useGetUserID();
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecipe();

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data.savedRecipes)
      } catch (err) {
        console.log(err);
      }
    };

    if (cookies.access_token)fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) =>{
    try {
      const response = await axios.put("http://localhost:3001/recipes",
      {recipeID,userID},
      {
        headers:{ authorization:cookies.access_token}
      }
      );
      setSavedRecipes(response.data.savedRecipes)
    } catch (err) {
      console.log(err);
    }
  }

  const isRecipeSaved = (id) => {
    if (Array.isArray(savedRecipes)) {
      return savedRecipes.includes(id);
    }
    return false;
  };
  

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2>Recipes</h2>
      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-6" key={recipe._id}>
            <div style={{ marginBottom: "20px" }}>  
              <div><strong>Name:</strong> {recipe.name}</div>
              <div>
                <strong>Ingredients:</strong> {recipe.ingredients}
              </div>
              <div>
                <strong>Instructions:</strong> {recipe.instructions}
              </div>
              <div >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  style={{ maxWidth: "300px" }}
                />
              </div>
              <div>
                <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
              </div>
              <button onClick={(click)=>saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)} >{isRecipeSaved(recipe._id)?"Saved":"Save"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
