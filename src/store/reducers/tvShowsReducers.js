const initialState = {
  tvShows: [],
  page: 1,
  totalPages: 1,
  categoryName: "on air",
};

const tvShowsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CURRENT_LIST_TV":
      return {
        ...state,
        tvShows: action.payload.results,
        totalPages: action.payload.total_pages,
      };
    case "CHANGE_CATEGORY_TV":
      return {
        ...state,
        tvShows: action.payload.results,
        page: 1,
        totalPages: action.payload.total_pages,
        categoryName: action.payload.categoryName,
      };
    case "NEXT_PAGE_TV":
      return {
        ...state,
        tvShows: action.payload.results,
        page: state.page++,
      };
    case "PREVIOUS_PAGE_TV":
      return {
        ...state,
        tvShows: action.payload.results,
        page: state.page--,
      };
    default:
      return state;
  }
};

export default tvShowsReducer;
