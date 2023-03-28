import { useEffect, useState } from 'react'
import './App.css'
import MovieInfo from './Components/MovieInfo'
import Footer from './Components/Footer'
import { updateExpression } from 'babel-types';

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

  // filter results to user input
  const [filteredResults, setFilteredResults] = useState([]);


  // filter by title
  const [searchInput, setSearchInput] = useState("");
  const searchTitles = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.results.filter( function(movie) {
        return (movie.title.toLowerCase()).includes(searchValue.toLowerCase())
      })
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.results));
    }
  };

  // filter by vote average/"stars"
  const [upperStarRange, setUpperStarRange] = useState(10);
  const [lowerStarRange, setLowerStarRange] = useState(0);

  const filterStars = (lowerRange, upperRange) => {
    setUpperStarRange(upperRange);
    setLowerStarRange(lowerRange);
    if (lowerRange != 0 || upperRange != 10) {
      const filteredData = list.results.filter( function(movie) {
        return (movie.vote_average <= upperRange && movie.vote_average >= lowerRange)
      })
      setFilteredResults(filteredData);
      console.log(filteredData);
    } else {
      setFilteredResults(Object.keys(list.results));
    }
  }
  
  return (
    <div className="App">
      <div className="main">
        <h1>Flick Flix 🎥</h1>
        Explore the 20 most popular movies this week. 
        <br></br>

        <input
          type="text"
          placeholder="Search Titles"
          onChange={(inputString) => searchTitles(inputString.target.value)}
        />

        <br></br>
        <input
          type="number"
          placeholder={lowerStarRange}
          onChange={(inputString) => filterStars(inputString.target.value, upperStarRange)}
        />
        <input
          type="number"
          placeholder={upperStarRange}
          onChange={(inputString) => filterStars(lowerStarRange, inputString.target.value)}
        />


        <ul>
          {searchInput.length > 0 || lowerStarRange != 0 || upperStarRange != 10
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
