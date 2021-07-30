import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import axios from "axios";
import '@fontsource/roboto';
import { Typography } from "@material-ui/core";
import  logo from "../img/tmdblogo.jpg";

const SEARCH_API = "https://api.themoviedb.org/3/search/person?api_key=e0eb34f3bddc89aabdffd507b370db1e&query=";
const IMG_API = "https://image.tmdb.org/t/p/w1280";



const People = () => {
    const [ people, setPeople] = useState([]);
    const [ searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios
            .get("https://api.themoviedb.org/3/person/popular?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US&page=1")
            .then((res) => { 
                setPeople(res.data.results)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault();
    
        if(searchTerm) {
    
        fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setPeople(data.results);
        })
            setSearchTerm("");
    
        }
    
    }
    
    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
            <>
                <header>
                    <img src={logo} alt="The Movie DB" />
                    <div className="header-links">
                        <Typography><a className="header_links" href="/movies"><h3>Movies</h3></a></Typography>
                        <Typography><a className="header_links" href="/tvshows"><h3>TV Shows</h3></a></Typography>
                        <Typography><a className="header_links" href="/people"><h3>People</h3></a></Typography>
                    </div>
                </header>
                <div className="top-container">
                    <h1 className="movie-h1">Welcome.</h1>
                    <h2 className="movie-h2">Millions of movies, TV shows and people to discover. Explore Now. </h2>
                    <form onSubmit={handleOnSubmit}>
                    <input 
                            className="search" 
                            type="search" 
                            placeholder="Search for a Person..."
                            value={searchTerm}
                            onChange={handleOnChange}
                        />
                        <button className="submit-button" type="submit">Search</button>
                    </form> 
                    {/* <img src={hollywood} atl="hollywood" /> */}
                </div>
                <h1 className="people-h1">Popular People</h1>
                <div className="people-container">
                    
                    {people.map((people, idx) => {
                        return (
                            <div className="people">
                                <a href={`/people/${people.id}`}><img src={IMG_API + people.profile_path} alt={people.name} /></a>
                                <div className="people-info">
                                    <h2>{people.name}</h2>
                                </div>
                            </div>
                        )
                    })}


                </div>





            </>




    )

}
export default People;