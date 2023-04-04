import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

const MovieInfo = ({id, image, title, voteAvg, voteCount, releaseDate, overview }) => {
    const poster_url = "https://image.tmdb.org/t/p/" + "w500" + image;
    const movie_url = "https://www.themoviedb.org/movie/" + id;

    return (
        <div className="movieInfo">

            <div className="movie">
              <Link
                to={`/movie/${id}`}
                key={`${id}_poster`}  
              >
                <img
                      className="moviePoster"
                      src={poster_url}
                      alt="movie poster returned"
                  />
              </Link>
            </div>

            <div className="movie">
              <div className="movieHeader">
                <Link
                  to={`/movie/${id}`}
                  key={`${id}_title}`} 
                >
                  <h2>{title} 🔗</h2>
                </Link>
                <h4>{voteAvg}/10 ⭐ | {voteCount} votes | {releaseDate}</h4>
              </div>
              <div className="movieOverview">
                <p>{overview}</p>
              </div>
            </div>
            

          </div>
    );
}

export default MovieInfo;