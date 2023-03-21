import { useState } from 'react'
import './App.css'
import APIForm from './Components/APIForm'
import BanList from './Components/BanList'
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
  const [banVAvg, setBanVAvg] = useState(0);

  const [voteCount, setVoteCount] = useState(0);
  const [banVCount, setBanVCount] = useState(0);

  const [pageIndex, setPageIndex] = useState(100);

  const [banAttrib, setBanAttrib] = useState([]);
  
  const submitForm = () => {
    makeMovieQuery().catch(console.error);  
  }

  const makeMovieQuery = async () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let sort_by = "popularity.desc"
    let without_genres = "";
    let vote_average_gte = banVAvg;
    let vote_count_gte = banVCount;

    let page = Math.floor(Math.random() * pageIndex) + 1;
    let query = `https://api.themoviedb.org/3/discover/movie?sort_by=${sort_by}&api_key=${ACCESS_KEY}&page=${page}&without_genres=${without_genres}&vote_average.gte=${vote_average_gte}&vote_count.gte=${vote_count_gte}&include_adult=false&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    let response = await fetch(query);
    let json = await response.json();

    // handle if there are less pages than we have access to
    if (json.total_pages < page) {
      setPageIndex(json.total_pages);
      page = Math.floor(Math.random() * json.total_pages) + 1;
      query = `https://api.themoviedb.org/3/discover/movie?sort_by=${sort_by}&api_key=${ACCESS_KEY}&page=${page}&without_genres=${without_genres}&vote_average.gte=${vote_average_gte}&vote_count.gte=${vote_count_gte}&include_adult=false&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
      response = await fetch(query);
      json = await response.json();
    }

    console.log(query);

    // get a random result from the page
    const num_results = json.results.length;
    const results_index = Math.floor(Math.random() * num_results);
    const result = json.results[results_index];
    
    // set movie information
    const poster_url = "https://image.tmdb.org/t/p/" + "w500" + result.poster_path;
    setTitle(result.title);
    setOverview(result.overview);
    setVoteAvg(result.vote_average);
    setVoteCount(result.vote_count);
    setCurrentImage(poster_url);
    setGenres(result.genre_ids);
    setPrevImages((images) => [...images, poster_url]);
    setPrevTitles((titles) => [...titles, result.title]);
    console.log(result);
  }

  const voteCountHandler = () => {
    setBanVCount(voteCount);
    setBanAttrib([...banAttrib, "> " + voteCount + " Votes"]);
  };

  const voteAvgHandler = () => {
    setBanVAvg(voteAvg);
    setBanAttrib([...banAttrib, "> " + voteAvg + " Stars"]);
  }

  return (
    <div className="App">
      <div className="main">
        <h1>Flick Flix 🎥</h1>
        Flick through popular movies and discover new favorites.
        
        {currentImage ? (
        <div className="filter-container">
                Don't like these recommendations? Filter to
                <button className="filterButton"
                  onClick={voteAvgHandler}
                >
                  &gt; {voteAvg} Stars
                </button>
                <button className="filterButton"
                  onClick={voteCountHandler}>
                  &gt; {voteCount} Votes
                </button>
        </div>
        ) : (
          <div></div>
        )}

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
      
      {currentImage ? (
        <div className="extras">
          <Gallery images={prevImages} titles={prevTitles}/>
          <BanList bans={banAttrib}/>
        </div>
      
      ) : (
        <div></div>
      )}
      
      <Footer/>
    </div>
  )
}

export default App
