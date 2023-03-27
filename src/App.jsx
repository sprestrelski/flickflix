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
    console.log(list);
  }, []);

  const makeMovieQuery = async () => {

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

  return (
    <div className="App">
      <div className="main">
        <h1>Flick Flix 🎥</h1>
        Explore the 20 most popular movies this week. 

        <ul>
          {list && Object.entries(list.results).map(([index]) =>
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
            // <li key={list.results[index].id}>{list.results[index].title}</li>
          )}
        </ul>
      </div>
      
      <Footer/>
    </div>
  )
}

export default App
