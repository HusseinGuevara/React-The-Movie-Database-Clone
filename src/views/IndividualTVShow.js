import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import  logo from "../img/tmdblogo.jpg";

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

const IndividualTVShow = (props, id) => {
    const [ tvshow, setTvshow] = useState("");
    const [ video, setVideo ] = useState([]);
    const [ cast, setCast ] = useState([]);
    const [ similiar, setSimiliar] = useState([]);
    
    // Get Individual TV show info
    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/tv/${props.id}?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US`)
            .then((res) => { setTvshow(res.data)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    // Get Tv show videos
    // useEffect(() => {
    //     axios
    //         .get(`https://api.themoviedb.org/3/tv/${props.id}/videos?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US`)
    //         .then((res) => { setVideo(res.data.results)
    //             console.log(res.data.results);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [])

    // Get Tv show cast and crew 
    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/tv/${props.id}/credits?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US`)
            .then((res) => { setCast(res.data.cast)
                console.log(res.data.cast);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // Get similiar TV shows 
    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/tv/${props.id}/similar?api_key=e0eb34f3bddc89aabdffd507b370db1e&language=en-US&page=1`)
            .then((res) => { setSimiliar(res.data.results)
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
                </header>

                <div className="individual-tvshow-container">
                    <div className="individual-tvshow">
                        <img src={IMG_API + tvshow.poster_path} alt={tvshow.name} />
                        <div className="individual-tvshow-info">
                            <h2>{tvshow.name}</h2>
                            <h3>First Air Date: {tvshow.first_air_date}</h3>
                            <span className={
                                `tag ${setVoteClass(tvshow.vote_average)}`}>
                                {tvshow.vote_average}
                            </span>
                            <h3>Overview:</h3>
                            <p>{tvshow.overview}</p>
                            <h3>Number of Seasons:</h3>
                            <p>{tvshow.number_of_seasons}</p>
                            <h3>Number of Episodes:</h3>
                            <p>{tvshow.number_of_episodes}</p>
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
                    <div className="tvshow-cast-info">
                        {cast.map((cast, idx) => {
                            return (
                                <div id={idx} className="cast-card">
                                    <img src={IMG_API + cast.profile_path} alt={cast.name} /> 
                                    <h3>{cast.name}</h3>
                                    <h3>{cast.character}</h3>
                                </div>
                            )
                        })}    
                    </div>

                    <h1 className="similiar-h1">Similiar TV Shows</h1>
                    <div className="similiar-tvshow-container">
                        {similiar.map((similiar, idx) => {
                            return (
                                <div className="similiar-tvshows">
                                <img src={IMG_API + similiar.poster_path} alt={similiar.title} />
                                <a href={`/tvshows/${similiar.id}`}><h3>{similiar.name}</h3></a>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </>
    )
}
export default IndividualTVShow;