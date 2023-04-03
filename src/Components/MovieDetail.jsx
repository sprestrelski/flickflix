import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
const ACCESS_KEY = import.meta.env.VITE_MOVIE_API_KEY;

const MovieDetail = () => {
    let params = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const getMovieDetail = async () => {
            
            const details = await fetch(
                `https://api.themoviedb.org/3/movie/${params.id}?api_key=`
                + ACCESS_KEY
            );
            
            let detailsJson = await details.json();
            setDetails(detailsJson);
        };
        
        getMovieDetail().catch(console.error);
    }, []);

    return (
        <div>
        { details ? (
            <div>
                <div className="movieInfo" >

                    <div className="movie">
                    <a href={details.movie_url} target="_blank" rel="noreferrer">
                        <img
                            className="moviePoster"
                            src={"https://image.tmdb.org/t/p/w500" + details.poster_path}
                            alt={`Movie poster for ${details.title}`}
                        />
                    </a>
                    </div>

                    <div className="movie">
                    <div className="movieHeader">
                        <h2>{details.title}</h2>
                        <h4>{details.release_date} • {details.vote_average}/10 ⭐  </h4>
                    </div>
                    <div className="movieOverview">
                        <b>{details.tagline}</b>
                        <p>{details.overview}</p>
                    </div>
                    </div>
                

            
            <table>
                <tbody> 
                    <tr>
                    <th>Rating</th>
                    <td>{details.vote_average}/10 ⭐</td>
                    </tr>
                    <tr>
                    <th>Number of Votes</th>
                    <td>{details.vote_count} votes</td>
                    </tr>
                    <tr>
                    <th>Release Date</th>
                    <td>{details.release_date}</td>
                    </tr>
                    <tr>
                    <th>Status</th>
                    <td>{details.status}</td>
                    </tr>
                    <tr>
                    <th>Runtime</th>
                    <td>{details.runtime} minutes</td>
                    </tr>
                    <tr>
                    <th>Revenue</th>
                    <td>{ details.revenue != 0 ? ( details.revenue ) : "No data available"}</td>
                    </tr>
                    <tr>
                    <th>Production Companies</th>
                    <td> </td>
                    </tr>
                    <tr>
                    <th>Budget</th>
                    <td>{ details.budget != 0 ? ( details.budget ) : "No data available"}</td>
                    </tr>
                    <tr>
                    <th>Original Language</th>
                    <td>{details.original_language}</td>
                    </tr>
                </tbody>
                </table>
            </div>
          </div>
        ) : null

        }
        </div>
    );
};

export default MovieDetail;