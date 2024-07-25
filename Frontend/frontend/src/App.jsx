import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [dishName, setDishName] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [maxCookingTime, setMaxCookingTime] = useState('');
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/suggest', {
        dish_name: dishName,
        ingredients: ingredients.map(ingredient => ingredient.trim()),
        max_cooking_time: parseInt(maxCookingTime),
      });
      setRecommendedRecipes(response.data);
    } catch (error) {
      setError('Error Fetching Recepies Of Given Dish Please Try Again!!!');
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  return (
    <div className="app-container">
      <h1>Culinary Compass</h1>
      <div className="form-group">
        <label htmlFor="dishName">Dish Name:</label>
        <input
          type="text"
          id="dishName"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>
      </div>
      <div className="form-group">
        <label htmlFor="maxCookingTime">Max Cooking Time (minutes):</label>
        <input
          type="number"
          id="maxCookingTime"
          value={maxCookingTime}
          onChange={(e) => setMaxCookingTime(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Loading...' : 'Recommend Recipes'}
      </button>

      {error && <p className="error-message">{error}</p>}

      {recommendedRecipes.length > 0 && (
        <div>
          <h2>Recommended Recipes:</h2>
          <ul>
            {recommendedRecipes.map((recipe, index) => (
              <li key={index} className="recipe-item">
                <h3>{recipe.name}</h3>
                <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                <p><strong>Steps:</strong> {recipe.steps}</p>
                <p><strong>Cooking Time:</strong> {recipe.minutes} minutes</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
