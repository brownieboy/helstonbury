import { createSelector } from "reselect";

// Action type constants
export const LOAD_FAVOURITES_NOW = "LOAD_FAVOURITES_NOW"; // Imperative, hence "NOW"!
const FETCH_FAVOURITES_REQUEST = "FETCH_FAVOURITES_REQUEST";
const FETCH_FAVOURITES_SUCCESS = "FETCH_FAVOURITES_SUCCESS";
const FETCH_FAVOURITES_FAILURE = "FETCH_FAVOURITES_FAILURE";
const TOGGLE_BAND_FAVOURITES_STATUS = "TOGGLE_BAND_FAVOURITES_STATUS";
export const UPDATE_BAND_FAVOURITES_STATUS = "UPDATE_BAND_FAVOURITES_STATUS";

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
      index = state.favourites.indexOf(action.payload); // payload is bandId

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
      // else add the new Favourite into the array
      // console.log("add it in there...");
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };

    case UPDATE_BAND_FAVOURITES_STATUS:
      console.log("UPDATE_BAND_FAVOURITES_STATUS");
      index = state.favourites.indexOf(action.payload.bandId);

      if (!action.payload.isFavourite && index >= 0) {
        // We want to remove a favoruite that's already in the array
        return {
          ...state,
          favourites: [
            ...state.favourites.slice(0, index),
            ...state.favourites.slice(index + 1)
          ]
        };
      }

      if (action.payload.isFavourite && index < 0) {
        // We want to add a favourite that's not in the array
        return {
          ...state,
          favourites: [...state.favourites, action.payload.bandId]
        };
      }
      // For all other cases, our work is done!
      return state;

    default:
      return state;
  }
};

// Selectors
const selectFavourites = state => state.favouritesState.favourites;
const getBandId = (state, props) => props.navigation.state.params.bandId;
export const getFavouritesCount = state => state.favouritesState.favourites.length;

// This won't memoise well because favourites will be changing all the
// time.  But better here than in the components.
export const selectFavouriteStatusForBandId = createSelector(
  [selectFavourites, getBandId],
  (favourites, bandId) => favourites.indexOf(bandId) > -1
);

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

export const updateBandFavouriteStatus = (bandId, isFavourite) => ({
  type: UPDATE_BAND_FAVOURITES_STATUS,
  payload: { bandId, isFavourite }
});

export const favouritesDuxActions = {
  setFetchFavouritesFailed,
  setFetchFavouritesRequest,
  setFetchFavouritesSucceeded,
  setFetchFavouritesSucceededScrubBandIds,
  toggleBandFavouriteStatus
};

export default homeReducer;
