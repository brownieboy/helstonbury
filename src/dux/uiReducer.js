const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
const SET_APPEARANCES_VIEW = "SET_APPEARANCES_VIEW";

const defaultState = {
  showOnlyFavourites: false,
  appearancesView: "day"
};

const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SHOW_FAVOURITES:
      return { ...state, showOnlyFavourites: action.payload };
    case SET_APPEARANCES_VIEW:
      return { ...state, appearancesView: action.payload };

    default:
      return state;
  }
};

export const setShowOnlyFavourites = show => ({
  type: SET_SHOW_FAVOURITES,
  payload: show
});


export const setShowAppearancesView = view => ({
  type: SET_APPEARANCES_VIEW,
  payload: view
});

export const getShowOnlyFavourites = state => state.uiState.showOnlyFavourites;
export const getAppearancesView = state => state.uiState.appearancesView;

export default uiReducer;
