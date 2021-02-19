import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import {
  ReadMovies,
  ChangePage,
  ChangeCategory,
} from "../store/actions/moviesAction";

export default function Home() {
  let { movies, page, totalPages, categoryName } = useSelector(
    (state) => state.movie
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ReadMovies(categoryName));
  }, [page, categoryName]);

  return (
    <div
      className="row mx-auto"
      style={{ width: "100%", backgroundColor: "#0A615D" }}
    >
      <h1
        className="col-auto"
        style={{ fontSize: "5em", color: "#2285E0", margin: "1em 30%" }}
      >
        My Entertaiment App
      </h1>
      <div className="row" style={{ margin: "2em" }}>
        <div className="col-9">
          <div className="col-12">
            {categoryName === "now playing" && (
              <h2 className="" style={{ fontSize: "3em", margin: "1em 37%" }}>
                Now Playing
              </h2>
            )}
            {categoryName === "popular" && (
              <h2 className="" style={{ fontSize: "3em", margin: "1em 36%" }}>
                Popular Movie
              </h2>
            )}
            {categoryName === "top rated" && (
              <h2 className="" style={{ fontSize: "3em", margin: "1em 34%" }}>
                Top Rated Movie
              </h2>
            )}
            {categoryName === "trending now" && (
              <h2 className="" style={{ fontSize: "3em", margin: "1em 35%" }}>
                Trending Now
              </h2>
            )}
          </div>
          <div className="row">
            {categoryName !== "trending now" && (
              <div
                className="col-11 d-flex justify-content-between mx-3"
                style={{}}
              >
                <button
                  onClick={() =>
                    dispatch(ChangePage("previous page", categoryName))
                  }
                  className="btn btn-secondary"
                  style={{
                    width: "200px",
                    fontSize: "1.5em",
                    fontWeight: "bolder",
                  }}
                >
                  Previous Page
                </button>
                <h2 style={{ color: "#2285E0" }}>
                  Page: {page} - {totalPages}
                </h2>
                <button
                  onClick={() =>
                    dispatch(ChangePage("next page", categoryName))
                  }
                  className="btn btn-secondary"
                  style={{
                    width: "200px",
                    fontSize: "1.5em",
                    fontWeight: "bolder",
                  }}
                >
                  Next Page
                </button>
              </div>
            )}
            {movies.map((movie) => {
              return <MovieCard key={movie.id} movieData={movie} />;
            })}
          </div>
        </div>
        <div
          className="col-2 border p-0"
          style={{
            margin: "10em auto",
            height: "max-content",
            position: "fixed",
            right: "8em",
          }}
        >
          <ul className="list-group list-group-flush">
            <button
              onClick={() => dispatch(ChangeCategory("now playing"))}
              type="button"
              class="list-group-item list-group-item-action"
              style={{ backgroundColor: "#6EE6E0" }}
            >
              Now Playing
            </button>
            <button
              onClick={() => dispatch(ChangeCategory("popular"))}
              type="button"
              class="list-group-item list-group-item-action"
              style={{ backgroundColor: "#6EE6E0" }}
            >
              Popular Movie
            </button>
            <button
              onClick={() => dispatch(ChangeCategory("top rated"))}
              type="button"
              class="list-group-item list-group-item-action"
              style={{ backgroundColor: "#6EE6E0" }}
            >
              Top Rated Movie
            </button>
            <button
              onClick={() => dispatch(ChangeCategory("trending now"))}
              type="button"
              class="list-group-item list-group-item-action"
              style={{ backgroundColor: "#6EE6E0" }}
            >
              Trending Now
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
