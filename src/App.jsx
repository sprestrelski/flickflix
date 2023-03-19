import { useState } from 'react'
import './App.css'
import APIForm from './Components/APIForm'
import Footer from './Components/Footer'
import Gallery from './Components/Gallery'

function App() {
  const ACCESS_KEY = import.meta.env.VITE_MOVIE_API_KEY;
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState([]);
  const [prevTitles, setPrevTitles] = useState([]);
  
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [genres, setGenres] = useState([]);
  const [voteAvg, setVoteAvg] = useState(0);
  const [voteCount, setVoteCount] = useState(0);
  const pageIndex = 100;

  
  const submitForm = () => {
    makeMovieQuery();  
  }

  // function
  //  make and return the query
  //  try calling it, if it breaks return specific word and try again
  //     if results = 0 then return no results
  //  set x
  const makeMovieQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let sort_by = "popularity.desc"
    let without_genres = "";
    let vote_average_gte = "";
    let vote_average_lte = "";

    let page = Math.floor(Math.random() * pageIndex) + 1;
    let query = `https://api.themoviedb.org/3/discover/movie?sort_by=${sort_by}&api_key=${ACCESS_KEY}&page=${page}&without_genres=${without_genres}&vote_average.gte=${vote_average_gte}&vote_average.lte=${vote_average_lte}&include_adult=false&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    const num_results = json.results.length;

    if (num_results == 0) {
      //json.total_pages
    }

    const results_index = Math.floor(Math.random() * num_results);
    const result = json.results[results_index];
    
    const poster_url = "https://image.tmdb.org/t/p/" + "w500" + result.poster_path;
    
    setTitle(result.title);
    setOverview(result.overview);
    setVoteAvg(result.vote_average);
    setVoteCount(result.vote_count);
    setCurrentImage(poster_url);
    setPrevImages((images) => [...images, poster_url]);
    setPrevTitles((titles) => [...titles, result.title]);
  }



  return (
    <div className="App">
      <div className="main">
        <h1>Flick Flix 🎥</h1>
        Flick through popular movies and discover new favorites.
        
        <APIForm 
          onSubmit={submitForm}  
        />

        {currentImage ? (
          <div className="movieInfo">

            <div className="movie">
              <div className="movieHeader">
                <h2>{title}</h2>
                <h4>{voteAvg}/10 ⭐ | {voteCount} votes</h4>
              </div>
              <div className="movieOverview">
                <p>{overview}</p>
              </div>
            </div>

            <div className="movie">
              <img
                className="moviePoster"
                src={currentImage}
                alt="movie poster returned"
              />
            </div>

          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="left-sidebar">
        <Gallery images={prevImages} titles={prevTitles}/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
