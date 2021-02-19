import React, { useEffect, useState } from "react";
import TVShowCard from "./TVShowCard";
import { useDispatch, useSelector } from "react-redux";
import {
  ReadTVShows,
  ChangePageTV,
  ChangeCategoryTV,
} from "../store/actions/tvShowAction";

export default function TVShow() {
  let { tvShows, page, totalPages, categoryName } = useSelector(
    (state) => state.tvShow
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ReadTVShows(categoryName));
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
            {categoryName === "on air" && (
              <h2 className="" style={{ fontSize: "3em", margin: "1em 38%" }}>
                On Air Now
              </h2>
            )}
            {categoryName === "popular" && (
              <h2 className="" style={{ fontSize: "3em", margin: "1em 34%" }}>
                Popular TV Show
              </h2>
            )}
            {categoryName === "top rated" && (
              <h2 className="" style={{ fontSize: "3em", margin: "1em 31%" }}>
                Top Rated TV Show
              </h2>
            )}
            {categoryName === "trending now" && (
              <h2 className="" style={{ fontSize: "3em", margin: "1em 36%" }}>
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
                    dispatch(ChangePageTV("previous page", categoryName))
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
                <h2 style={{ color: "blue" }}>
                  Page: {page} - {totalPages}
                </h2>
                <button
                  onClick={() =>
                    dispatch(ChangePageTV("next page", categoryName))
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
            {tvShows.map((tvShow) => {
              return <TVShowCard key={tvShow.id} tvShowData={tvShow} />;
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
          <ul className="list-group list-group-flush m-0">
            <button
              onClick={() => dispatch(ChangeCategoryTV("on air"))}
              type="button"
              class="list-group-item list-group-item-action"
              style={{ backgroundColor: "#6EE6E0" }}
            >
              On Air Now
            </button>
            <button
              onClick={() => dispatch(ChangeCategoryTV("popular"))}
              type="button"
              class="list-group-item list-group-item-action"
              style={{ backgroundColor: "#6EE6E0" }}
            >
              Popular TV Show
            </button>
            <button
              onClick={() => dispatch(ChangeCategoryTV("top rated"))}
              type="button"
              class="list-group-item list-group-item-action"
              style={{ backgroundColor: "#6EE6E0" }}
            >
              Top Rated TV Show
            </button>
            <button
              onClick={() => dispatch(ChangeCategoryTV("trending now"))}
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
