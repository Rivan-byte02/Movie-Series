import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DeleteFromFavorites } from "../store/actions/favoritesAction";

export default function Favorites() {
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const removeFavorite = (movieId) => {
    let filter = favorites.filter((favorite) => favorite.id !== movieId);
    dispatch(DeleteFromFavorites(filter));
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: "#5CE6DF" }}>
      <div className="row">
        <div className="col-md-12">
          <div className="shadow-sm p-4 h-100">
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade  active show"
                id="favourites"
                role="tabpanel"
                aria-labelledby="favourites-tab"
              >
                <h4 className="font-weight-bold mt-0 mb-4">Favorites</h4>
                {!favorites.length && (
                  <h3 style={{ margin: "4em 30%" }}>
                    Please add item to favorites first...
                  </h3>
                )}
                <div className="row">
                  {favorites.map((favorite) => {
                    return (
                      <div
                        className="col-md-4 col-sm-6 mb-4 pb-2"
                        key={favorite.id}
                      >
                        <div
                          className="list-card h-100 rounded overflow-hidden position-relative shadow-sm"
                          style={{ backgroundColor: "#0CC4F7" }}
                        >
                          <div className="list-card-image">
                            <div className="member-plan position-absolute">
                              <span className="badge badge-dark">
                                {favorite.type}
                              </span>
                            </div>
                            <a href="#">
                              <img
                                src={`https://image.tmdb.org/t/p/w500/${favorite.poster}`}
                                className="img-fluid item-img"
                              />
                            </a>
                          </div>
                          <div className="p-3 position-relative">
                            <div className="list-card-body">
                              <h6 className="mb-1">
                                <a href="#" className="text-black">
                                  {favorite.title}
                                </a>
                              </h6>
                              <p className="text-gray mb-3">Genres:</p>
                              <ul
                                style={{ height: "150px", overflowY: "scroll" }}
                              >
                                {favorite.genres.map((genre) => {
                                  return <li>{genre.name}</li>;
                                })}
                              </ul>
                            </div>
                            <div className="list-card-badge">
                              <span className="badge badge-success">
                                {favorite.tagline}
                              </span>
                            </div>
                            <div className="row mt-3">
                              <button
                                className="col-9 btn btn-secondary mx-auto"
                                onClick={() => removeFavorite(favorite.id)}
                              >
                                Remove from favorites
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
