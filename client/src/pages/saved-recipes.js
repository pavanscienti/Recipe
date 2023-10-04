import { useEffect, useState } from "react";
import axios from "axios";
import {useGetUserID} from '../hooks/useGetUserID.js'

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  
  const userID = useGetUserID();
  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes)
      } catch (err) {
        console.log(err);
      }
    };
    fetchSavedRecipe();
  }, []);



  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2> Saved Recipes</h2>
      <div className="row">
        {savedRecipes.map((recipe) => (
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
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
