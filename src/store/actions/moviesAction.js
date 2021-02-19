export const ReadMovies = (categoryName) => {
  return async (dispatch, getState) => {
    try {
      const { movie } = getState();
      let url = "";
      switch (categoryName) {
        case "now playing":
          url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${movie.page}`;
          break;
        case "popular":
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${movie.page}`;
          break;
        case "top rated":
          url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${movie.page}`;
          break;
        case "trending now":
          url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
          break;
        default:
          break;
      }
      const response = await fetch(url);

      const data = await response.json();

      dispatch({
        type: "CURRENT_LIST",
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const ChangeCategory = (categoryName) => {
  return async (dispatch, getState) => {
    try {
      const { movie } = getState();
      let url = "";
      if (movie.categoryName !== categoryName) {
        switch (categoryName) {
          case "now playing":
            url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
            break;
          case "popular":
            url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
            break;
          case "top rated":
            url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
            break;
          case "trending now":
            url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
            break;
          default:
            break;
        }
      } else {
        throw "you are ready in this category";
      }
      const response = await fetch(url);

      const data = await response.json();

      data.categoryName = categoryName;

      dispatch({
        type: "CHANGE_CATEGORY",
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const ChangePage = (command, pageName) => {
  return async (dispatch, getState) => {
    try {
      const { movie } = getState();
      const page = command === "next page" ? movie.page++ : movie.page--;
      let url = "";
      switch (pageName) {
        case "now playing":
          url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
          break;
        case "popular":
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
          break;
        case "top rated":
          url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
          break;
        case "trending now":
          url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
          break;
        default:
          break;
      }
      const response = await fetch(url);

      const data = await response.json();

      if (command === "previous page" && page <= 1) {
        throw "you already reach the min page";
      } else if (command === "next page" && page >= movie.totalPages) {
        throw "you already reach the max page";
      } else {
        dispatch({
          type: command === "next page" ? "NEXT_PAGE" : "PREVIOUS_PAGE",
          payload: data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
