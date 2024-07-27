
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

app = Flask(__name__)
CORS(app)

# Load and preprocess the dataset
df = pd.read_csv(r"final_data.csv")  # Adjust the path as needed
df['ingredients'] = df['ingredients'].apply(lambda x: x.lower().strip('"').strip("'"))
df['name'] = df['name'].apply(lambda x: x.lower())
df['steps'] = df['steps'].apply(lambda x: x.strip('"').strip("'"))
df['combined_features'] = df['name'] + ' ' + df['ingredients']

# Feature extraction
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['combined_features'])

def suggest_recipes(dish_name, ingredients, max_cooking_time, top_n=5):
    user_input = f"{dish_name.lower()} {' '.join(ingredients).lower()}"
    user_input_vec = tfidf.transform([user_input])
    cosine_sim_user = linear_kernel(user_input_vec, tfidf_matrix)
    sim_scores_user = list(enumerate(cosine_sim_user[0]))
    sim_scores_user = sorted(sim_scores_user, key=lambda x: x[1], reverse=True)

    recipe_indices_user = [i[0] for i in sim_scores_user if df.iloc[i[0]]['minutes'] <= max_cooking_time][:top_n]
    return df.iloc[recipe_indices_user]

def clean_ingredients(ingredients):
    cleaned_ingredients = ingredients.strip("[]").replace("'", "").replace('"', '').split(', ')
    cleaned_ingredients = [ingredient.capitalize() for ingredient in cleaned_ingredients]
    return ', '.join(cleaned_ingredients)

def clean_steps(steps):
    cleaned_steps = steps.strip("[]").replace("'", "").replace('"', '').split(', ')
    cleaned_steps = [step.capitalize() for step in cleaned_steps]
    return '. '.join(cleaned_steps)

@app.route('/suggest', methods=['POST'])
def suggest():
    data = request.json
    dish_name = data.get('dish_name', '')
    ingredients = data.get('ingredients', [])
    max_cooking_time = data.get('max_cooking_time', 0)

    suggested_recipes = suggest_recipes(dish_name, ingredients, max_cooking_time)
    recipes_list = []
    for _, row in suggested_recipes.iterrows():
        recipes_list.append({
            "name": row['name'].title(),
            "ingredients": clean_ingredients(row['ingredients']),
            "steps": clean_steps(row['steps']),
            "minutes": row['minutes']
        })

    return jsonify(recipes_list)

if __name__ == '__main__':
    app.run()
