import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import  logo from "../img/tmdblogo.jpg";

const FEATURED_API = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US";
const IMG_API = "https://image.tmdb.org/t/p/w1280";

const setVoteClass = (vote) => {
    if(vote >= 8) {
        return "green";
    }
    else if(vote >= 6) {
        return "orange";
    } else {
        return "red";
    }
}


const IndividualMovie = (props, id, title) => {
    const [ movie, setMovie ] = useState("");
    const [ video, setVideo ] = useState([]);
    const [ cast, setCast ] = useState([]);
    const [ similiar, setSimiliar ] = useState([]);

    // API to get Movies
    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/${props.id}?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US`)
            .then((res) => { setMovie(res.data)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    // API to get videos
    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US`)
            .then((res) => { setVideo(res.data.results)
                console.log(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    // API tp get cast and credits
    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US`)
            .then((res) => {
                setCast(res.data.cast)
                console.log(res.data.cast);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // API to get Similiar Moviies
    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/${props.id}/similar?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US&page=1`)
            .then((res) => {
                setSimiliar(res.data.results);
                    console.log(res.data.results);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    

    return ( 
        <>    
            <header>
                <img src={logo} alt="The Movie DB" />
                <div className="header-links">
                    <Typography><a className="header_links" href="/movies"><h3>Movies</h3></a></Typography>
                    <Typography><a className="header_links" href="/tvshows"><h3>TV Shows</h3></a></Typography>
                    <Typography><a className="header_links" href="/people"><h3>People</h3></a></Typography>
                </div>
                    {/* <input 
                        className="search" 
                        type="search" 
                        placeholder="Search.."
                        value={searchTerm}
                        onChange={handleOnChange}
                    /> */}
                </header>
                <div className="individual-movie-container"> 
                    <div className="individual-movie">
                        <img src={IMG_API + movie.poster_path} alt={movie.title} /> 
                        <div className="individual-movie-info">
                            <h1>{movie.title}</h1>
                            <h3>Release Date: {movie.release_date}</h3>
                            <span className={
                                `tag ${setVoteClass(movie.vote_average)}`}>
                                {movie.vote_average}
                            </span>
                            <h3>Overview:</h3>
                            <p>{movie.overview}</p>
                            <h3>Runtime: {movie.runtime} minutes</h3>
                            {/* {video.map((video, idx) => {
                                return (
                                    <div>    
                                        <h1>{video.type}</h1>
                                        <h3>{video.name}</h3>
                                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.key}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </div>
                                )
                            })} */}
                        </div>
                    </div>

                    <h1 className="cast-h2">Cast</h1> 
                    <div className="movie-cast-info">
                        {cast.map((cast, idx) => {
                            return (
                                <div className="cast-card">
                                    <img src={IMG_API + cast.profile_path} alt={cast.name} /> 
                                    <h3>{cast.name}</h3>
                                    <h3>{cast.character}</h3>
                                </div>
                            )
                        })}
                    </div>

                    <h1 className="similiar-h1">Similiar Movies</h1>
                    <div className="similiar-movie-container">
                        {similiar.map((similiar, idx) => {
                            return (
                                <div className="similiar-movie">
                                    <img src={IMG_API + similiar.poster_path} alt={similiar.title} /> 
                                    <a href={`/movies/${similiar.id}`}><h3>{similiar.title}</h3></a>



                                </div>
                            )
                        })}

                    </div>

                </div>       
        </>
    );

}

export default IndividualMovie;