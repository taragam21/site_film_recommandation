from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from unittest import result
from flask import Flask, jsonify


import numpy as np
import pandas as pd
import ast
import nltk
import sys


app = Flask(__name__)


def convert(obj):
    L = []
    for i in ast.literal_eval(obj):
        L.append(i['name'])
    return L


def convert3(obj):
    L = []
    counter = 0
    for i in ast.literal_eval(obj):
        if counter != 3:
            L.append(i['name'])
            counter += 1
        else:
            break
    return L


def fetch_director(obj):
    L = []
    for i in ast.literal_eval(obj):
        if i['job'] == 'Director':
            L.append(i['name'])
            break
    return L


def stem(text):
    y = []
    for i in text.split():
        y.append(ps.stem(i))
    return " ".join(y)


# read movies and credit .csv file
movies = pd.read_csv('tmdb_5000_movies.csv')
credits = pd.read_csv('tmdb_5000_credits.csv')

# merge both csv file on the basis of movie_id
movies = movies.merge(credits, on='movie_id')

movies.rename(columns={'title_x': 'title'}, inplace=True)
movies.drop('title_y', inplace=True, axis=1)


# only put selected column in group which will help us forming recommendation system
movies = movies[['movie_id', 'title', 'overview',
                 'genres', 'keywords', 'cast', 'crew']]

movies.isnull().sum()
movies.dropna(inplace=True)  # drop duplicate items

movies.duplicated().sum()


movies['genres'] = movies['genres'].apply(convert)
movies['keywords'] = movies['keywords'].apply(convert)
movies['cast'] = movies['cast'].apply(convert3)
movies['crew'] = movies['crew'].apply(fetch_director)


movies['overview'] = movies['overview'].apply(lambda x: x.split())
movies['genres'] = movies['genres'].apply(
    lambda x: [i.replace(" ", "") for i in x])  # remove space from each word
movies['cast'] = movies['cast'].apply(
    lambda x: [i.replace(" ", "") for i in x])
movies['overview'] = movies['overview'].apply(
    lambda x: [i.replace(" ", "") for i in x])
movies['crew'] = movies['crew'].apply(
    lambda x: [i.replace(" ", "") for i in x])
movies['keywords'] = movies['keywords'].apply(
    lambda x: [i.replace(" ", "") for i in x])

movies['tags'] = movies['overview']+movies['genres'] + \
    movies['keywords']+movies['cast']+movies['crew']


new_df = movies[['movie_id', 'title', 'tags']]

new_df['tags'] = new_df['tags'].apply(lambda x: " ".join(x))


cv = CountVectorizer(max_features=5000, stop_words='english')
vectors = cv.fit_transform(new_df['tags']).toarray()
cv.get_feature_names_out()
ps = PorterStemmer()

new_df['tags'] = new_df['tags'].apply(stem)

similarity = cosine_similarity(vectors)


@app.route('/movie/<string:movie>', methods=['GET'])
def recommend(movie):
    movie_index = new_df[new_df['title'] == movie].index[0]
    distances = similarity[movie_index]
    moviesList = sorted(list(enumerate(distances)),
                        reverse=True, key=lambda x: x[1])[1:6]
    mv1 = str(new_df.iloc[moviesList[0][0]].movie_id)
    mv2 = str(new_df.iloc[moviesList[1][0]].movie_id)
    mv3 = str(new_df.iloc[moviesList[2][0]].movie_id)
    mv4 = str(new_df.iloc[moviesList[3][0]].movie_id)
    mv5 = str(new_df.iloc[moviesList[4][0]].movie_id)
    result = {
        "movie_name1": mv1,
        "movie_name2": mv2,
        "movie_name3": mv3,
        "movie_name4": mv4,
        "movie_name5": mv5,
    }

    return jsonify(result)

    # for i in moviesList:
    #     print(new_df.iloc[i[0]].title)
# recommend("Hulk")
if __name__ == "__main__":
    app.run(port=5000, debug=True)
