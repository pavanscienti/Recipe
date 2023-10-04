import { useState } from "react"
import axios from "axios"
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies,_] = useCookies(["access_token"])
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value, })
  }
  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients, })
  }

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
  }


  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes",{...recipe},
      {
        headers:{ authorization:cookies.access_token}
      })
      alert("recipe created")
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }


  console.log(recipe)
  return (
    <div className="create-recipe" style={{ flex: 1, justifyContent: "center", alignItems: 'center', width: "100%" }}>
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: 'column', width: "50%", margin: "auto", padding: "5px" }}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">ingredients</label>
        {recipe.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}

        <button onClick={addIngredient} type="button">add Ingredients</button>
        <label htmlFor="instructions">instructions</label>
        <textarea typeof="text" name="instructions" onChange={handleChange}>

        </textarea>
        <label htmlFor="imageUrl">Image Url</label>
        <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />
        <label htmlFor="cookingTime">cookingTime</label>
        <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  )
}
