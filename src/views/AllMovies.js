import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import axios from "axios";
import '@fontsource/roboto';
import { Typography } from "@material-ui/core";
import  logo from "../img/tmdblogo.jpg";
import hollywood from "../img/hollywood.jpg";

const IMG_API = "https://image.tmdb.org/t/p/w1280";
const FEATURED_API ="https://api.themoviedb.org/3/discover/movie?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"

const SEARCH_API = "https://api.themoviedb.org/3/search/movie?api_key=e0eb34f3bddc89aabdffd507b370db1e&query=";

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


const AllMovies = ({title, poster_path, overview, vote_average}) => {
    const [ movies, setMovies] = useState([]);
    const [ searchTerm, setSearchTerm] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ page, SetPage ] = useState(1);

    useEffect(() => {
        axios
            .get(FEATURED_API)
            .then((res) => {
                setMovies(res.data.results)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    },[]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
    
        if(searchTerm) {
    
        fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setMovies(data.results);
        })
            setSearchTerm("");
    
        }
    
    }
    
    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }


    return (
        <>    
            {/* <nav className="navbar"> */}
            {/* </nav> */}
                
                {/* <form onSubmit={handleOnSubmit}> */}
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
            {/* </form>   */}
            <div className="top-container">
                <h1 className="movie-h1">Welcome.</h1>
                <h2 className="movie-h2">Millions of movies, TV shows and people to discover. Explore Now. </h2>
                <form onSubmit={handleOnSubmit}>
                <input 
                        className="search" 
                        type="search" 
                        placeholder="Search for a Movie..."
                        value={searchTerm}
                        onChange={handleOnChange}
                    />
                    <button className="submit-button" type="submit">Search</button>
                </form>
                {/* <img src={hollywood} atl="hollywood" /> */}
            </div>
            
            <h1 className="movies-h1">Movies</h1>
            <div className="movie-container">
                
                {movies.map((movie, idx) => {
                        return (
                            <div key={idx} className="movie">
                                <a href={`/movies/${movie.id}`}><img src={IMG_API + movie.poster_path} alt={movie.title} /></a>
                                <div className="movie-info">
                                    <a className="movie-link" href={`/movies/${movie.id}`}><h3>{movie.title}</h3></a>
                                    <span className={
                                        `tag ${setVoteClass(movie.vote_average)}`}>
                                        {movie.vote_average}
                                    </span>
                                </div>
                                {/* <div className="movie-overview">
                                    <h2>Overview:</h2>
                                    <p>{movie.overview}</p>
                                </div>     */}
                            </div>    
                        )
                    })}
                
                


            </div>
        </>    
    )
}
export default AllMovies;