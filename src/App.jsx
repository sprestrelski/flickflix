import { useEffect, useState } from 'react'
import './App.css'
import MovieInfo from './Components/MovieInfo'
import Footer from './Components/Footer'
//import Gallery from './Components/Gallery'

// average popularity
// average vote count
// most popular language

function App() {
  const ACCESS_KEY = import.meta.env.VITE_MOVIE_API_KEY;

  const [list, setList] = useState(null);

  // fetch top 20 movies this week
  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=`
        + ACCESS_KEY
      );
      let json = await response.json();
      setList(json);
    }
    fetchMovieData().catch(console.error);
  }, []);

  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.results.filter( function(movie) {
        return (movie.title.toLowerCase()).includes(searchValue.toLowerCase())
      })
      setFilteredResults(filteredData);
      console.log(filteredData);
    } else {
      setFilteredResults(Object.keys(list.results));
    }
  };

  return (
    <div className="App">
      <div className="main">
        <h1>Flick Flix 🎥</h1>
        Explore the 20 most popular movies this week. 
        <br></br>

        <input
          type="text"
          placeholder="Search Titles"
          onChange={(inputString) => searchItems(inputString.target.value)}
        />


        <ul>
          {searchInput.length > 0
            ? filteredResults.map((index) => 
                //<li>{index.title}</li>
                <MovieInfo
                key={index.id}
                id={index.id}
                title={index.title}
                image={index.poster_path}
                voteAvg={index.vote_average}
                voteCount={index.vote_count}
                overview={index.overview}
                releaseDate={index.release_date}
                />
              
              ) : list && Object.entries(list.results).map(([index]) =>
                <MovieInfo
                  key={list.results[index].id}
                  id={list.results[index].id}
                  title={list.results[index].title}
                  image={list.results[index].poster_path}
                  voteAvg={list.results[index].vote_average}
                  voteCount={list.results[index].vote_count}
                  overview={list.results[index].overview}
                  releaseDate={list.results[index].release_date}
                />
          )}
          
        </ul>
      </div>
      
      <Footer/>
    </div>
  )
}

export default App
