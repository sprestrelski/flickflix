import React, {useEffect, useState} from "react";


const MovieInfo = ({id, image, title, voteAvg, voteCount, releaseDate, overview }) => {
    const poster_url = "https://image.tmdb.org/t/p/" + "w500" + image;
    const movie_url = "https://www.themoviedb.org/movie/" + id;

    return (
        <div className="movieInfo">

            <div className="movie">
              <a href={movie_url} target="_blank" rel="noreferrer">
                <img
                    className="moviePoster"
                    src={poster_url}
                    alt="movie poster returned"
                />
              </a>
            </div>

            <div className="movie">
              <div className="movieHeader">
                <h2>{title}</h2>
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