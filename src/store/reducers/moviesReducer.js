const initialState = {
  movies: [],
  page: 1,
  totalPages: 1,
  categoryName: "now playing",
};

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_LIST":
      return {
        ...state,
        movies: action.payload.results,
        totalPages: action.payload.total_pages,
      };
    case "CHANGE_CATEGORY":
      return {
        ...state,
        movies: action.payload.results,
        page: 1,
        totalPages: action.payload.total_pages,
        categoryName: action.payload.categoryName,
      };
    case "NEXT_PAGE":
      return {
        ...state,
        movies: action.payload.results,
        page: state.page++,
      };
    case "PREVIOUS_PAGE":
      return {
        ...state,
        movies: action.payload.results,
        page: state.page--,
      };
    default:
      return state;
  }
};

export default moviesReducer;
