

// Action type constants
const LOAD_FAVOURITES_NOW = "LOAD_FAVOURITES_NOW"; // Imperative, hence "NOW"!
const FETCH_FAVOURITES_REQUEST = "FETCH_FAVOURITES_REQUEST";
const FETCH_FAVOURITES_SUCCESS = "FETCH_FAVOURITES_SUCCESS";
const FETCH_FAVOURITES_FAILURE = "FETCH_FAVOURITES_FAILURE";

// Reducer
const homeReducer = (
  state = { fetchStatus: "", fetchError: "", favourites: [] },
  action
) => {
  switch (action.type) {
    case FETCH_FAVOURITES_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_FAVOURITES_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        favourites: action.payload
      };
    case FETCH_FAVOURITES_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    default:
      return state;
  }
};

export const loadFavouritesNow = () => ({ type: LOAD_FAVOURITES_NOW });

const setFetchFavouritesRequest = () => ({
  type: FETCH_FAVOURITES_REQUEST
});
const setFetchFavouritesSucceeded = favourites => ({
  type: FETCH_FAVOURITES_SUCCESS,
  payload: favourites
});
const setFetchFavouritesFailed = errorMessage => ({
  type: FETCH_FAVOURITES_FAILURE,
  payload: errorMessage
});

export const favouritesDuxActions = {
  setFetchFavouritesFailed,
  setFetchFavouritesRequest,
  setFetchFavouritesSucceeded
};


export default homeReducer;

