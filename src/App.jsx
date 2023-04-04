import React, { useEffect, useState, PureComponent} from 'react'
import './App.css'
import MovieInfo from './Components/MovieInfo'
import Footer from './Components/Footer'
import Card from './Components/Card'
import RatingsChart from './Components/RatingsChart'

function App() {
  const ACCESS_KEY = import.meta.env.VITE_MOVIE_API_KEY;

  const [json, setJson] = useState(null);
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);

  // fetch top 20 movies this week
  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=`
        + ACCESS_KEY
      );
      let json = await response.json();
      setJson(json);
      setList(json.results);
      setFilteredResults(json.results);
      dataStatistics(json.results);
    }
    fetchMovieData().catch(console.error);
  }, []);

  // master filter function
  const filterFunction = (searchValue, lowerRange, upperRange) => {
    let filteredData = list;
    let useFilter = false;
    if (searchValue !== "") {
      filteredData = filteredData.filter( function(movie) {
        return (movie.title.toLowerCase()).includes(searchValue.toLowerCase())
      })
      useFilter = true;
    }
    
    if (lowerRange != 0 || upperRange != 10) {
      filteredData = filteredData.filter( function(movie) {
        return (movie.vote_average <= upperRange && movie.vote_average >= lowerRange)
      })
      useFilter = true;
    }
    
    if (useFilter) {
      setFilteredResults(filteredData);
      dataStatistics(filteredData);
    } else {
      setFilteredResults(list);
      dataStatistics(list);
    }
  
    
  }

  // filter by title
  const [searchInput, setSearchInput] = useState("");
  const filterTitles = searchValue => {
    setSearchInput(searchValue);
    filterFunction(searchValue, lowerStarRange, upperStarRange);
  };

  // filter by vote average/"stars"
  const [upperStarRange, setUpperStarRange] = useState(10);
  const [lowerStarRange, setLowerStarRange] = useState(0);

  const filterStars = (lowerRange, upperRange) => {
    setUpperStarRange(upperRange);
    setLowerStarRange(lowerRange);
    filterFunction(searchInput, lowerRange, upperRange);
  }


  // data statistics
  const [voteAvgTotal, setVoteAvgTotal] = useState(0);
  const [voteCountTotal, setVoteCountTotal] = useState(0);
  const [ratedOverall, setRatedOverall] = useState(["", ""]);
  const dataStatistics = (filteredData) => {
    // calculate average rating of movies
    let voteAvg = 0;
    let lowestAvg = 0, highestAvg = 0;
    let lowestTitle = "", highestTitle = "";

    if (filteredData.length <= 0) voteAvg = 0;
    else {
      lowestAvg = filteredData[0].vote_average;
      highestAvg = filteredData[0].vote_average;
      lowestTitle = filteredData[0].title;
      highestTitle = filteredData[0].title;
      
      for (let item = 0; item < filteredData.length; item++) {
        let avg = filteredData[item].vote_average
        voteAvg += avg;
        if (avg < lowestAvg) {
          lowestTitle = filteredData[item].title;
          lowestAvg = avg;
        } else if (avg > highestAvg) {
          highestTitle = filteredData[item].title;
          highestAvg = avg;
        }
      }
      voteAvg /= filteredData.length;
      
    }
    setVoteAvgTotal(voteAvg.toFixed(3));
    setRatedOverall([lowestTitle, highestTitle]);
    
    // calculate average number of votes cast across movies
    let voteCount = 0;
    if (filteredData.length <= 0) voteCount = 0;
    else {
      for (const item in filteredData) {
        voteCount += filteredData[item].vote_count;
      }
      voteCount/= filteredData.length;
    }
    setVoteCountTotal(voteCount.toFixed(0));
    
  }

  return (
    <div className="App">
      <div className="main">
        <h1>Flick Flix 🎥</h1>
        Explore the most popular movies this week. 
        <br></br>

        <div className="cards-container">
          <Card heading="Average Rating" subheading={voteAvgTotal}/>
          <Card heading="Average Votes" subheading={voteCountTotal}/>
          <Card heading="Lowest Rated Title" subheading={ratedOverall[0]}/>
          <Card heading="Highest Rated Title" subheading={ratedOverall[1]}/>
        </div>

        <div className="charts-container">
          <RatingsChart
            list={filteredResults}
          />
        </div>
        

        <div className="input-container">
          Filter:&nbsp;<input
            type="text"
            placeholder="Search Titles"
            onChange={(inputString) => filterTitles(inputString.target.value)}
          />
        </div>

        <div className="input-container">
          Ratings:&nbsp;
          <input
            className="starRange"
            type="number"
            value={lowerStarRange}
            step="0.01"
            min="0"
            max="10"
            onChange={(inputString) => filterStars(inputString.target.value, upperStarRange)}
          />
          <input
            className="starRange"
            type="number"
            value={upperStarRange}
            step="0.01"
            min="0"
            max="10"
            onChange={(inputString) => filterStars(lowerStarRange, inputString.target.value)}
          />
        </div>

        <ul>
          {searchInput.length > 0 || lowerStarRange != 0 || upperStarRange != 10
            ? filteredResults.map((index) => 
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
              
              ) : list && list.map((index) =>
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
          )}
          
        </ul>
      </div>
      
      <Footer/>
    </div>
  )
}

export default App
