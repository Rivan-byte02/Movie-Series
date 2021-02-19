const AddFavorite = (itemId, type) => {
  return async (dispatch, getState) => {
    try {
      const { favorites } = getState();
      const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${itemId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      const data = await response.json();
      console.log(favorites.favorites);
      let found = favorites.favorites.find(
        (favorite) => favorite.id === itemId
      );
      data.type = type;
      if (type === "tv") data.title = data.name;
      if (!found) {
        dispatch({
          type: "ADD_FAVORITE",
          payload: data,
        });
      } else {
        throw "already added to favorites";
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const DeleteFavorite = (movies) => {
  return {
    type: "DELETE_FAVORITE",
    payload: movies,
  };
};

export const AddToFavorites = AddFavorite;
export const DeleteFromFavorites = DeleteFavorite;
