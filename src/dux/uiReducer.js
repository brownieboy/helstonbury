const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";

const defaultState = {
  showOnlyFavourites: false
};

const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SHOW_FAVOURITES:
      return { ...state, showOnlyFavourites: action.payload };
    default:
      return state;
  }
};

export const setShowOnlyFavourites = show => ({
  type: SET_SHOW_FAVOURITES,
  payload: show
});

export const getShowOnlyFavourites = state => state.uiState.showOnlyFavourites;

export default uiReducer;
