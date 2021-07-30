import React from "react";
import { Redirect, Router,} from "@reach/router";
import '@fontsource/roboto';
import Home from "./views/Home";
import AllMovies from "./views/AllMovies"
import AllTVShows from "./views/AllTVShows";
import IndividualMovie from "./views/IndividualMovie";
import IndividualTVShow from "./views/IndividualTVShow";
import People from "./views/People";

function App() {
  return (
    <div>  
      
      <Router>
        <Home path="/home" />
        <AllMovies path="/movies" />
        <IndividualMovie path="/movies/:id" />
        <AllTVShows path="/tvshows" />
        <IndividualTVShow path="/tvshows/:id" />
        <People path="/people" />
      </Router>
      
      <footer>
      </footer>
    
    </div>  

  )
    
}

export default App;
