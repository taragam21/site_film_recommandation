from datetime import datetime
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

app = FastAPI()

# Connect to MongoDB
client = MongoClient("mongodb+srv://bayo:MongoDb_bayo@cluster0.rb2g1tq.mongodb.net/?retryWrites=true&w=majority")

db = client["E_commerce"]
collection = db["movies"]


# CORS configuration
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Read all movies 
@app.get("/movies")
async def get_movies():
    movies = list(collection.find().limit(2))
    return json.loads(json.dumps(movies, default=str))

# Read a movie 
@app.get("/movies/{movie_id}")
async def get_movie(movie_id: int):
    movie = collection.find_one({"id": movie_id})
    if movie:
        return json.loads(json.dumps(movie, default=str))
    return {"error": "Movie not found"}

# 
@app.get("/movies/genres/{genre}")
async def get_movies_by_genre(genre: str):
    movies = list(collection.find({"genres": genre}))
    return json.loads(json.dumps(movies, default=str))

@app.get("/movies/title/{title}")
async def get_movies_by_title(title: str):
    movies = list(collection.find({"original_title": title}))
    return json.loads(json.dumps(movies, default=str))

@app.get("/movies/year/{year}")
async def get_movies_by_year(year: int):
    print(year)
    format = '%Y-%m-%d'
    query = {datetime.strptime("release_date",format).date().year: year}
    movies = list(collection.find(query)) 
    print(movies)
  #  movies = list(collection.find({"release_date": /^"year"/})) 
    return movies

@app.get("/movies/keywords/{keywords}")
async def get_movies_by_keywords(keywords: str):
  #  movies = list(collection.find({"keywords": {"$in": keywords[f"{keywords}"]}}))
    movies = list(collection.find({"keywords":  {"$in": [f"/{keywords}/"]} })) 
    return json.loads(json.dumps(movies, default=str))

@app.get("/movies/vote_average/{vote_average}")
async def get_movies_by_vote_average(vote_average: float):
    movies = list(collection.find({"vote_average": vote_average})) 
    return json.loads(json.dumps(movies, default=str))

@app.get("/movies/vote_count/{vote_count}")
async def get_movies_by_vote_count(vote_count: int):
    movies = list(collection.find({"vote_count": vote_count}))
    return json.loads(json.dumps(movies, default=str))

@app.get("/movies/prodC/{production_countries}")
async def get_movies_by_PRODC(production_countries: str):
    print(production_countries)
    movies = list(collection.find({"production_countries.iso_3166_1": f"{production_countries}"}))
    return json.loads(json.dumps(movies, default=str))

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8300) 
