import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddToFavorites } from "../store/actions/favoritesAction";

export default function MovieCard(props) {
  const dispatch = useDispatch();
  const movieId = props.movieData.id;

  const addToFavorites = () => {
    dispatch(AddToFavorites(movieId, "movie"));
  };

  return (
    <div
      className="col-2 card my-4 mx-3"
      style={{ gap: "0.2em", backgroundColor: "#11ADA6" }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${props.movieData.poster_path}`}
        className="card-img-top mt-2"
        id="imageBox"
        alt="..."
      ></img>
      <div className="card-body p-0 my-2">
        <h4
          className="card-title"
          style={{ textAlign: "center", fontSize: "25px", minHeight: "40px" }}
        >
          {props.movieData.title}
        </h4>
      </div>
      <div className="row">
        <button
          className="col-9 btn btn-secondary mx-auto"
          onClick={() => addToFavorites()}
        >
          Add to favorites
        </button>
        <Link
          className="col-9 btn btn-secondary my-2 mx-auto"
          to={`/detail/movie/${movieId}`}
        >
          Detail Movie
        </Link>
      </div>
    </div>
  );
}
