import { applyMiddleware, combineReducers, createStore } from "redux";
import favoritesReducer from "./reducers/favoritesReducer";
import moviesReducer from "./reducers/moviesReducer";
import tvShowReducer from "./reducers/tvShowsReducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  movie: moviesReducer,
  favorites: favoritesReducer,
  tvShow: tvShowReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
