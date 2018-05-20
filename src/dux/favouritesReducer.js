// Action type constants
export const LOAD_FAVOURITES_NOW = "LOAD_FAVOURITES_NOW"; // Imperative, hence "NOW"!
const FETCH_FAVOURITES_REQUEST = "FETCH_FAVOURITES_REQUEST";
const FETCH_FAVOURITES_SUCCESS = "FETCH_FAVOURITES_SUCCESS";
const FETCH_FAVOURITES_FAILURE = "FETCH_FAVOURITES_FAILURE";
const TOGGLE_BAND_FAVOURITES_STATUS = "TOGGLE_BAND_FAVOURITES_STATUS";

// Reducer.  Favourites are a simple array of bandId.
const homeReducer = (
  state = { fetchStatus: "", fetchError: "", favourites: [] },
  action
) => {
  let index;
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
    case TOGGLE_BAND_FAVOURITES_STATUS:
      index = state.favourites.indexOf(action.payload);
      // console.log("TOGGLE_BAND_FAVOURITES_STATUS index=" + index);
      if (index > -1) {
        return {
          // If the band is in the favourites list then remove it.
          ...state,
          favourites: [
            ...state.favourites.slice(0, index),
            ...state.favourites.slice(index + 1)
          ]
        };
      }
      // else add it in there
      console.log("add it in there...");
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };
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
  payload: favourites || []
});

const setFetchFavouritesSucceededScrubBandIds = (favourites, bandsList) => {
  // Filter our all favourites for which no band currentl exist, otherwise
  // we'll clog up with faves from previous years.
  const newFaves = favourites.filter(
    fave => bandsList.findIndex(bandMember => bandMember.id === fave) >= 0
  );
  // console.log("newFaves:");
  // console.log(newFaves);
  return {
    type: FETCH_FAVOURITES_SUCCESS,
    payload: newFaves || []
  };
};

const setFetchFavouritesFailed = errorMessage => ({
  type: FETCH_FAVOURITES_FAILURE,
  payload: errorMessage
});

export const toggleBandFavouriteStatus = bandId => ({
  type: TOGGLE_BAND_FAVOURITES_STATUS,
  payload: bandId
});

export const favouritesDuxActions = {
  setFetchFavouritesFailed,
  setFetchFavouritesRequest,
  setFetchFavouritesSucceeded,
  setFetchFavouritesSucceededScrubBandIds,
  toggleBandFavouriteStatus
};

export default homeReducer;
