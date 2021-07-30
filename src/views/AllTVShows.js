import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { Typography } from "@material-ui/core";
import  logo from "../img/tmdblogo.jpg";


import axios from "axios";

const FEATURED_API = "https://api.themoviedb.org/3/discover/tv?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate"
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/tv?api_key=e0eb34f3bddc89aabdffd507b370db1e&query=";

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

const AllTVShows = () => {
    const [ tvshows, setTVShows] = useState([]);
    const [ searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        axios
            .get(FEATURED_API)
            .then((res) => {
                setTVShows(res.data.results)
                console.log(res.data.results);
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
            setTVShows(data.results);
        })
            setSearchTerm("");
    
        }
    
    }
    
    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    
    
    
    
    return (
        <>    
                {/* <form onSubmit={handleOnSubmit}>
                    <header>
                    <img src={logo} alt="The Movie DB" />
                    <div className="header-links">
                        <Typography><a className="header_links" href="/movies"><h3>Movies</h3></a></Typography>
                        <Typography><a className="header_links" href="/tvshows"><h3>TV Shows</h3></a></Typography>
                    </div>
                        <input 
                            className="search" 
                            type="search" 
                            placeholder="Search.."
                            value={searchTerm}
                            onChange={handleOnChange}
                        />
                    </header>
                </form>   */}

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

                <div className="top-container">
                    <h1 className="movie-h1">Welcome.</h1>
                    <h2 className="movie-h2">Millions of movies, TV shows and people to discover. Explore Now. </h2>
                    <form onSubmit={handleOnSubmit}>
                    <input 
                            className="search" 
                            type="search" 
                            placeholder="Search for a TV Show..."
                            value={searchTerm}
                            onChange={handleOnChange}
                        />
                        <button className="submit-button" type="submit">Search</button>
                    </form>
                    {/* <img src={hollywood} atl="hollywood" /> */}
                </div>
                <h1 className="tvshow-h1">TV Shows</h1>
                <div className="tvshows-container">
                {tvshows.map((tvshow, idx) => {
                    return (
                        <div key={idx} className="tvshow">
                            <Link to={`/tvshows/${tvshow.id}`}><img src={IMG_API + tvshow.poster_path} alt={tvshow.name} /></Link>
                            <div className="tvshow-info">
                            <a href={`/tvshows/${tvshow.id}`}><h3>{tvshow.name}</h3></a>
                                <span className={
                                    `tag ${setVoteClass(tvshow.vote_average)}`}>
                                    {tvshow.vote_average}
                                </span>
                            </div>
                            <div className="tvshow-overview">
                                <h2>Overview:</h2>
                                <p>{tvshow.overview}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>        


        
    )
}
export default AllTVShows;