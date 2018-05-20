// Better/quicker to use a setState for this if possible, which is
// what I've done, so this file not actually used.  I'll leave
// it here for future reference.

export const SET_SHOW_FAVOURITES = "SET_SHOW_FAVOURITES";
export const SET_APPEARANCES_VIEW = "SET_APPEARANCES_VIEW";
// const SET_SHOW_APPEARANCES_SIDE_MENU = "SET_SHOW_APPEARANCES_SIDE_MENU";
const SET_DAYS_ORDER = "SET_DAYS_ORDER";
const SET_TIMES_ORDER = "SET_TIMES_ORDER";
const FETCH_UISTATE_SUCCESS = "FETCH_UISTATE_SUCCESS";
export const LOAD_UISTATE_NOW = "LOAD_UISTATE_NOW";

const defaultState = {
  showOnlyFavourites: false,
  // showAppearancesSideMenu: false,
  appearancesView: "day",
  reverseDaysOrder: false,
  reverseTimesOrder: true
};

const uiReducer = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_SHOW_FAVOURITES:
      return { ...state, showOnlyFavourites: payload };
    case SET_APPEARANCES_VIEW:
      return { ...state, appearancesView: payload };
    // case SET_SHOW_APPEARANCES_SIDE_MENU:
    //   return { ...state, showAppearancesSideMenu: payload };
    case SET_DAYS_ORDER:
      return { ...state, reverseDaysOrder: payload };
    case SET_TIMES_ORDER:
      return { ...state, reverseTImesOrder: payload };
    case FETCH_UISTATE_SUCCESS: {
      console.log("uiReducer FETCH_UISTATE_SUCCESS:, payload:");
      console.log(payload);
      return payload; // yep, the whole thing is replaced
    }
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

// export const setShowAppearancesSideMenu = show => ({
//   type: SET_SHOW_APPEARANCES_SIDE_MENU,
//   payload: show
// });

export const setReverseDaysOrder = reverseOrder => ({
  type: SET_DAYS_ORDER,
  payload: reverseOrder
});

export const setReverseTimesOrder = reverseOrder => ({
  type: SET_TIMES_ORDER,
  payload: reverseOrder
});

export const setFetchUIStateSucceeded = uiState => ({
  type: FETCH_UISTATE_SUCCESS,
  payload: uiState || defaultState
});

export const loadUIStateNow = () => ({ type: LOAD_UISTATE_NOW });

// Getters
export const getShowOnlyFavourites = state => state.uiState.showOnlyFavourites;
export const getAppearancesView = state => state.uiState.appearancesView;
// export const getAppearancesSideMenuVisible = state =>
//   state.uiState.showAppearancesSideMenu;
export const getReverseDaysOrder = state => state.uiState.reverseDaysOrder;
export const getReverseTimessOrder = state => state.uiState.reverseTimesOrder;

export default uiReducer;
