export const ReadTVShows = (categoryName) => {
  return async (dispatch, getState) => {
    try {
      const { tvShow } = getState();
      let url = "";
      switch (categoryName) {
        case "on air":
          url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${tvShow.page}`;
          break;
        case "popular":
          url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${tvShow.page}`;
          break;
        case "top rated":
          url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${tvShow.page}`;
          break;
        case "trending now":
          url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_API_KEY}`;
          break;
        default:
          break;
      }
      const response = await fetch(url);

      const data = await response.json();

      dispatch({
        type: "CURRENT_LIST_TV",
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const ChangeCategoryTV = (categoryName) => {
  return async (dispatch, getState) => {
    try {
      const { tvShow } = getState();
      let url = "";
      if (tvShow.categoryName !== categoryName) {
        switch (categoryName) {
          case "on air":
            url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${tvShow.page}`;
            break;
          case "popular":
            url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${tvShow.page}`;
            break;
          case "top rated":
            url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${tvShow.page}`;
            break;
          case "trending now":
            url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_API_KEY}`;
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
        type: "CHANGE_CATEGORY_TV",
        payload: data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const ChangePageTV = (command, pageName) => {
  return async (dispatch, getState) => {
    try {
      const { tvShow } = getState();
      const page = command === "next page" ? tvShow.page++ : tvShow.page--;
      let url = "";
      switch (pageName) {
        case "on air":
          url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
          break;
        case "popular":
          url = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
          break;
        case "top rated":
          url = `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
          break;
        case "trending now":
          url = `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_API_KEY}`;
          break;
        default:
          break;
      }
      const response = await fetch(url);

      const data = await response.json();

      if (command === "previous page" && page <= 1) {
        throw "you already reach the min page";
      } else if (command === "next page" && page >= tvShow.totalPages) {
        throw "you already reach the max page";
      } else {
        dispatch({
          type: command === "next page" ? "NEXT_PAGE_TV" : "PREVIOUS_PAGE_TV",
          payload: data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
