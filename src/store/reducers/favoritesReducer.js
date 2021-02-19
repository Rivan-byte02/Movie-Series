const initialState = {
  favorites: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.concat({
          id: action.payload.id,
          title: action.payload.title,
          overview: action.payload.overview,
          genres: action.payload.genres,
          poster: action.payload.poster_path,
          backdrop: action.payload.backdrop_path,
          tagline: action.payload.tagline,
          type: action.payload.type === "movie" ? "Movie" : "Tv-Show",
        }),
      };
    case "DELETE_FAVORITE":
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};

export default favoritesReducer;
