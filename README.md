# CULLINARY COMPASS

This project is based on suggesting recepie to user based on food, ingredients and time constraint provided by user. 


### The dataset that is used by model is following :- 
[Link to dataset](./Backend/final_data.csv)

[Link to download dataset](https://www.kaggle.com/datasets/shuyangli94/food-com-recipes-and-user-interactions)


For this project we used flask for model integration and after that in frontend we call the api endpoints and then enter the required informations to fetch the recepie based on informations provided.

## Prerequisites:

One must ensure to download [node js](https://nodejs.org/en) and [python](https://www.python.org/downloads/) form the provided link. Then proceed to ahead to run project.


### Steps to start project

#### step 1: Open git bash and run the code
```bash
git clone https://github.com/code-abhash/Cullinary_compass.git
```

#### step 2: After step 1 the repo gets cloned open the project in vs code and create environment variable
```bash
python -m venv env
```
After this split terminals and proceed

#### step 3: Activate env folder
```bash
./env/scripts/activate
```

#### step 4: Then install all the requirements to run project
```bash
pip install -r requirements.txt
```

#### step 5: After this go to backend bolder
```bash
cd Backend
```

## Backend

We first wrote code for model and once it worked fine we integrated it to flask. In backend [*flask*](https://flask.palletsprojects.com/en/3.0.x/) is used for model integration. 

After we are in Backend folder not to run the backend server procced with step 6

#### step 6: To start the backend server
```bash
python app.py
```
After the backend server is started we need to start frontend. To go to Frontend folder run the following code in split terminals

#### step 7: To go in Frontend folder
```bash
cd Frontend
```

#### step 8: Now run this to get inside frontend
```bash
cd frontend
```

## Frontend

Our frontend is made in [react](https://react.dev/learn) & [vite](https://vitejs.dev/guide/) and we used CSS to add styling.

#### step 9: Once we are inside frontend we need to install all the dependencies required to run forntend
```bash
npm i
```

#### step 10: Once all dependencies are installed we need to start frontend for that run this command in terminal
```bash
npm run dev
```


## Some refrences that we used for making model

1. https://towardsdatascience.com/building-a-recipe-recommendation-system-297c229dda7b

2. https://medium.com/@honeyhulya16/recipe-recommendation-based-on-ingredients-ad43833cc5bd

3. https://scikit-learn.org/stable/modules/feature_extraction.html#tfidf-term-weighting

## Some articles used

1. https://www.frontiersin.org/journals/big-data/articles/10.3389/fdata.2021.778417/full

2. https://dl.acm.org/doi/10.1145/3552485.3554941

3. https://arxiv.org/abs/2205.14005

4. https://arxiv.org/abs/1111.3919