import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddToFavorites } from "../store/actions/favoritesAction";

export default function MovieDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  let [movie, setMovie] = useState({
    title: "",
    overview: "",
    genres: [],
    poster: "",
    backdrop: "",
    tagline: "",
  });
  let [videos, setVideos] = useState([]);

  const addToFavorites = () => {
    dispatch(AddToFavorites(id, "movie"));
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((movie) => {
        if (movie.status_message) {
          throw movie.status_message;
        }
        setMovie({
          title: movie.title,
          overview: movie.overview,
          genres: movie.genres,
          poster: movie.poster_path,
          backdrop: movie.backdrop_path,
          tagline: movie.tagline,
        });
        return fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
          .then((res) => res.json())
          .then((movie) => {
            if (movie.status_message) {
              throw movie.status_message;
            }
            setVideos(movie.results);
          });
      })
      .catch((err) => console.log({ error_message: err }));
  }, [id, movie]);

  return (
    <div
      className="container pt-1 mt-4"
      style={{ backgroundColor: "#6EE6E0", borderRadius: "20px" }}
    >
      <h1 className="my-4">{movie.title}</h1>
      <div className="row">
        <div className="col-md-6">
          <img
            className="img-fluid"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster}`}
            alt=""
          />
        </div>

        <div className="col-md-6 my-auto">
          <h3 className="">Movie Description</h3>
          <p>{movie.overview}</p>
          <h3 className="">Genres: </h3>
          <ul>
            {movie.genres.map((genre) => {
              return <li>{genre.name}</li>;
            })}
          </ul>
          <div className="row">
            <button
              className="col-9 btn btn-secondary mx-auto"
              onClick={() => addToFavorites()}
            >
              Add to favorites
            </button>
          </div>
        </div>
      </div>

      <h3 className="my-4">Gallery</h3>

      <div className="row">
        {videos.map((video) => {
          return (
            <div
              className="col-5 p-1"
              style={{
                width: "560px",
                height: "315px",
                float: "none",
                clear: "both",
                margin: "2px auto",
              }}
            >
              <embed
                src={`https://www.youtube.com/embed/${video.key}?autohide=1&autoplay=0`}
                wmode="transparent"
                type="video/mp4"
                width="100%"
                height="100%"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowfullscreen
                title={video.name}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
