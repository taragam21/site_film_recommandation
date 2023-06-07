#--------------------- Importing libraries --------------------------------------#

#Importing libraries for content based filtering
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from flask import Flask, jsonify
from ast import literal_eval

import pandas as pd

#Importing libraries for collaborative based filtering
from surprise import Dataset, Reader
from surprise.prediction_algorithms.knns import KNNBasic
import random

app = Flask(__name__)

#------------------- Loading datasets ------------------------------------------#
credits = pd.read_csv('credits.csv', low_memory=False)
keywords = pd.read_csv('keywords.csv', low_memory=False)
links = pd.read_csv('links.csv', low_memory=False)
ratings = pd.read_csv('ratings.csv', low_memory=False)
movies = pd.read_csv('movies_metadata.csv', low_memory=False)

#------------------- Preprocessing data ----------------------------------------#
# merge both csv file on the basis of movie_id
movies['id'] = movies['id'].str.extract('(\d+)')
movies['id'] = movies['id'].astype(float)
movies['id'] = movies['id'].astype(int)
credits.columns = ['cast','crew', 'id']
movies = movies.merge(credits,on='id')

keywords.columns = ['id', 'keywords']
movies = movies.merge(keywords,on='id')

#Dropping duplicate values
movies.drop_duplicates(inplace=True)
movies['title'].drop_duplicates(inplace=True)

# Replace the Nan with ''
movies.fillna('', inplace=True)
# creating tagline
movies['tagline'] = movies['tagline'].fillna('')

# dropping uneccessary feature
data = movies.drop(["homepage", "belongs_to_collection", "imdb_id", "poster_path", "status", "video", "spoken_languages", "title"], axis=1)
# get rid of duplicates with same release date
data.drop_duplicates(subset=["original_title","release_date"], inplace=True)

#------------------- Cleaning data ------------------------------------------#

stemmer = PorterStemmer()

#extracting genre names
data['genres'] = data['genres'].apply(literal_eval)
data['genres'] = data['genres'].apply(lambda x : [i['name'] for i in x])
data['genres'] = data['genres'].apply(lambda x : list(set(x)))
#keywords
data['keywords'] = data['keywords'].apply(literal_eval)
data['keywords'] = data['keywords'].apply(lambda x : [i['name'] for i in x])
data['keywords'] = data['keywords'].apply(lambda x: [stemmer.stem(i) for i in x])
data['keywords'] = data['keywords'].apply(lambda x: [str.lower(i.replace(" ", "")) for i in x])
data['keywords'] = data['keywords'].apply(lambda x : list(set(x)))

data['cast'] = data['cast'].apply(literal_eval)
data['crew'] = data['crew'].apply(literal_eval)
data['top_crew'] = data['cast'].apply(lambda x : [i['name'] for i in x])
# Here we are taking top 2 crews
data['top_crew'] = data['top_crew'].apply(lambda x : x[:2])

# Geting director Name
def get_director(x):
    for i in x:
        if i['job'] == 'Director':
            return i['name']
    return ""
data['director'] = data['crew'].apply(get_director)
imp_cols = ['tagline', 'genres' ,'original_language' ,'keywords' ,'top_crew','director']

#Extracting Digit from column
data['budget']=data['budget'].str.extract('(\d+)')
data['budget']=data['budget'].astype(float)
data['budget']=data['budget'].astype(int)
rev = []
for i in data['vote_count'].values:
    if i != '':
        rev.append(float(i))
    else:
        rev.append(0.0)
    
data['vote_count']=rev

rev = []
for i in data['vote_average'].values:
    if i != '':
        rev.append(float(i))
    else:
        rev.append(0.0)
    
data['vote_average']=rev

rev = []
for i in data['runtime'].values:
    if i != '':
        rev.append(float(i))
    else:
        rev.append(0.0)
    
data['runtime']=rev

data = data.drop(["cast", "crew"], axis=1)

#most voted Movie in the dataset
data.sort_values(by=['vote_count'],ascending=False)[['original_title','vote_count']][:10]

pd.set_option('mode.chained_assignment', None) #disabling SettingWithCopyWarning warning
#Combining all required columns into Onecleaned_data1 = cleaned_data[imp_cols]
cleaned_data = data[imp_cols]

cleaned_data['tagline'] = cleaned_data['tagline'].apply(lambda x : [x])
cleaned_data['original_language'] = cleaned_data['original_language'].apply(lambda x : [x])
cleaned_data['director'] = cleaned_data['director'].apply(lambda x : [x])

cleaned_data['combine'] = cleaned_data['genres'] + cleaned_data['original_language'] +\
                        cleaned_data['keywords'] + cleaned_data['top_crew'] +\
                        cleaned_data['director']
cleaned_data['combine'] = cleaned_data['combine'].apply(lambda x: ' '.join(x))
part_data = cleaned_data.head(20000)

#Transformation of the data in required fashion using Count vectorizer making ngrams
count = CountVectorizer(analyzer='word',ngram_range=(1, 2),min_df=0, stop_words='english')
count_matrix = count.fit_transform(part_data['combine'])
cosine_sim = cosine_similarity(count_matrix, count_matrix)

#----------------------------- Recommendation -------------------------------------- # 
@app.route('/contentMovie/<string:movie>', methods=['GET'])
def get_content_recommendations(movie):
    movie_id = data[data['original_title'] == movie]['id'].iloc[0]
    if movie_id >= len(cosine_sim):
        movie_id = random.randint(1, len(cosine_sim) - 1)
    distances = cosine_sim[movie_id]
    moviesList = sorted(list(enumerate(distances)),
                        reverse=True, key=lambda x: x[1])[1:6]
    mv1 = str(data.iloc[moviesList[0][0]]['id'])
    mv2 = str(data.iloc[moviesList[1][0]]['id'])
    mv3 = str(data.iloc[moviesList[2][0]]['id'])
    mv4 = str(data.iloc[moviesList[3][0]]['id'])
    mv5 = str(data.iloc[moviesList[4][0]]['id'])
    result = {
        "movie_name1": mv1,
        "movie_name2": mv2,
        "movie_name3": mv3,
        "movie_name4": mv4,
        "movie_name5": mv5,
    }

    return jsonify(result)

#------------------------ Collaborative filtering --------------------------------- #
# movie dataframe with votes more than 100
movies['vote_count'] = pd.to_numeric(movies['vote_count'], errors='coerce')
movie_md = movies[movies['vote_count'] > 250][['id', 'original_title']]

# IDs of movies with count more than 55
movie_ids = [int(x) for x in movie_md['id'].values]

# Select ratings of movies with more than 55 counts
ratings = ratings[ratings['movieId'].isin(movie_ids)]

# Reset Index
ratings.reset_index(inplace=True, drop=True)

# Initialize a surprise reader object
reader = Reader(line_format='user item rating', sep=',', rating_scale=(0,5), skip_lines=1)

# Load the data
data_md = Dataset.load_from_df(ratings[['userId','movieId','rating']], reader=reader)

# Build trainset object(perform this only when you are using whole dataset to train)
trainset = data_md.build_full_trainset()

#Declaring the similarity options.
sim_options = {'name': 'cosine',
               'user_based': False}

# KNN algorithm is used to find similar items
sim_item = KNNBasic(sim_options=sim_options, verbose=False, random_state=33)

# Train the algorithm on the trainset, and predict ratings for the testset
sim_item.fit(trainset)

@app.route('/collaborativeMovie', methods=['GET'])
def get_collaborative_recommendations():
    existing_user_ids = data_md['user_id'].unique().tolist()
    user_id = random.choice(existing_user_ids)
    # creating an empty list to store the recommended product ids
    recommendations = []
    
    # creating an user item interactions matrix 
    user_movie_interactions_matrix = ratings.pivot(index='userId', columns='movieId', values='rating')
    
    # extracting those product ids which the user_id has not interacted yet
    non_interacted_movies = user_movie_interactions_matrix.loc[user_id][user_movie_interactions_matrix.loc[user_id].isnull()].index.tolist()
    
    # looping through each of the product ids which user_id has not interacted yet
    for item_id in non_interacted_movies:
        
        # predicting the ratings for those non-interacted product ids by this user
        est = sim_item.predict(user_id, item_id).est
        
        # appending the predicted ratings
        movie_name = movie_md[movie_md['id'] == str(item_id)]['original_title'].values[0]
        recommendations.append((item_id, est))

    # sorting the predicted ratings in descending order
    recommendations.sort(key=lambda x: x[1], reverse=True)
    moviesList = recommendations[1:6]
    mv1 = str(data[data['id'] == moviesList[0][0]]['id'].iloc[0])
    mv2 = str(data[data['id'] == moviesList[1][0]]['id'].iloc[0])
    mv3 = str(data[data['id'] == moviesList[2][0]]['id'].iloc[0])
    mv4 = str(data[data['id'] == moviesList[3][0]]['id'].iloc[0])
    mv5 = str(data[data['id'] == moviesList[4][0]]['id'].iloc[0])
    result = {
        "movie_name1": mv1,
        "movie_name2": mv2,
        "movie_name3": mv3,
        "movie_name4": mv4,
        "movie_name5": mv5,
    }

    return jsonify(result)


if __name__ == "__main__":
    app.run(port=5000, debug=True)
