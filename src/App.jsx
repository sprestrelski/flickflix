import { useState } from 'react'
import './App.css'
import APIForm from './Components/APIForm'

function App() {
  const ACCESS_KEY = import.meta.env.VITE_MOVIE_API_KEY;
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);

  const submitForm = () => {
    makeMovieQuery();  
  }

  const makeMovieQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let sort_by = "popularity.desc"
    let without_genres = "";
    let vote_average_gte = "";
    let vote_average_lte = "";
    let query = `https://api.themoviedb.org/3/discover/movie?sort_by=${sort_by}&api_key=${ACCESS_KEY}&without_genres=${without_genres}&vote_average.gte=${vote_average_gte}&vote_average.lte=${vote_average_lte}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();

    const page_index = Math.floor(Math.random(1312));
    const results_index = Math.floor(Math.random() * 20);

    const poster_url = "https://image.tmdb.org/t/p/" + "w500" + json.results[results_index].poster_path;
    setCurrentImage(poster_url);
    setPrevImages((images) => [...images, poster_url]);
  }



  return (
    <div className="App">
      <h1>Flick Flix 🎥</h1>
      Flick through the top 10,000 most popular movies and discover new favorites.
      <APIForm 
        onSubmit={submitForm}  
      />

      {currentImage ? (
        <img
          className="moviePoster"
          src={currentImage}
          alt="movie poster returned"
        />
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default App
