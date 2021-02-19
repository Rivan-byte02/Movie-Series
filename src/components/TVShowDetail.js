import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddToFavorites } from "../store/actions/favoritesAction";

export default function MovieDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();
  let [tv, setMovie] = useState({
    title: "",
    overview: "",
    genres: [],
    poster: "",
    backdrop: "",
    tagline: "",
  });
  let [videos, setVideos] = useState([]);

  const addToFavorites = () => {
    dispatch(AddToFavorites(id, "tv"));
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((tv) => {
        if (tv.status_message) {
          throw tv.status_message;
        }
        setMovie({
          title: tv.name,
          overview: tv.overview,
          genres: tv.genres,
          poster: tv.poster_path,
          backdrop: tv.backdrop_path,
          tagline: tv.tagline,
        });
        return fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
          .then((res) => res.json())
          .then((tv) => {
            if (tv.status_message) {
              throw tv.status_message;
            }
            setVideos(tv.results);
          });
      })
      .catch((err) => console.log({ error_message: err }));
  }, [id, tv]);

  return (
    <div
      className="container"
      style={{ backgroundColor: "#6EE6E0", borderRadius: "20px" }}
    >
      <h1 className="my-4">{tv.title}</h1>

      <div className="row">
        <div className="col-md-6">
          <img
            className="img-fluid"
            src={`https://image.tmdb.org/t/p/w500/${tv.poster}`}
            alt=""
          />
        </div>

        <div className="col-md-6 my-auto">
          <h3 className="my-3">Movie Description</h3>
          <p>{tv.overview}</p>
          <h3 className="my-3">Genres: </h3>
          <ul>
            {tv.genres.map((genre) => {
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
