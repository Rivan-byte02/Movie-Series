import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import Home from "./components/Home";
import TVShow from "./components/TVShow";
import MovieDetail from "./components/MovieDetail";
import TVShowDetail from "./components/TVShowDetail";
import Favorites from "./components/Favorites";

export default function App() {
  return (
    <Router>
      <nav
        class="navbar navbar-expand-lg navbar-light p-3"
        style={{ backgroundColor: "#11ADA6" }}
      >
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link className="nav-link" to="/">
                Movie
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/tv-show">
                TV Show
              </Link>
            </li>
            <li class="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Switch>
        <Route path="/detail/tvShow/:id">
          <TVShowDetail />
        </Route>
        <Route path="/detail/movie/:id">
          <MovieDetail />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/tv-show">
          <TVShow />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
