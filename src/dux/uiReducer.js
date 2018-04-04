const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
const SET_APPEARANCES_VIEW = "SET_APPEARANCES_VIEW";
const SET_SHOW_APPEARANCES_SIDE_MENU = "SET_SHOW_APPEARANCES_SIDE_MENU";

const defaultState = {
  showOnlyFavourites: false,
  showAppearancesSideMenu: false,
  appearancesView: "day"
};

const uiReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SHOW_FAVOURITES:
      return { ...state, showOnlyFavourites: action.payload };
    case SET_APPEARANCES_VIEW:
      return { ...state, appearancesView: action.payload };
    case SET_SHOW_APPEARANCES_SIDE_MENU:
      return { ...state, showAppearancesSideMenu: action.payload };

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

export const setShowAppearancesSideMenu = show => ({
  type: SET_SHOW_APPEARANCES_SIDE_MENU,
  payload: show
});

export const getShowOnlyFavourites = state => state.uiState.showOnlyFavourites;
export const getAppearancesView = state => state.uiState.appearancesView;
export const getAppearancesSideMenuVisible = state =>
  state.uiState.showAppearancesSideMenu;

export default uiReducer;
