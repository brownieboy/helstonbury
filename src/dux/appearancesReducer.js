import { createSelector } from "reselect";

// Action type constants
const LOAD_APPEARANCES_NOW = "LOAD_APPEARANCES_NOW"; // Imperative, hence "NOW"!
const FETCH_APPEARANCES_REQUEST = "FETCH_APPEARANCES_REQUEST";
const FETCH_APPEARANCES_SUCCESS = "FETCH_APPEARANCES_SUCCESS";
const FETCH_APPEARANCES_FAILURE = "FETCH_APPEARANCES_FAILURE";


// Reducer
const appearancesReducer = (state = { fetchStatus: "", fetchError: "", appearancesList: [] }, action) => {
  switch (action.type) {
    case FETCH_APPEARANCES_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_APPEARANCES_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        appearancesList: action.payload
      };
    case FETCH_APPEARANCES_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    default:
      return state;
  }
};

// Sort/filter functions for selectors
const selectAppearances = state => {
  console.log("selectAppearances");
  console.log(
    "selectAppearancesn secltor in Dux, state=" +
      JSON.stringify(state, null, 4).substring(0, 200)
  );
  return state.appearancesList;
};

// Selectors
const selectAppearancesByDateTime = createSelector(
  [selectAppearances],
  appearancesList => {
    console.log(
      "selectAppearancesByDateTime, appearancesList=" +
        JSON.stringify(appearancesList, null, 4)
    );
    return appearancesList.slice().sort((a, b) => {
      return new Date(a.dateTimeStart) - new Date(b.dateTimeStart);
    });
  }
);

// const selectAppearancesByDateTime = () => [];

export const selectors = {
  selectAppearancesByDateTime
};

/*
// Sort/filter functions for selectors
const selectPeople = state => state.people.peopleList;
// const selectSortStyle = state => state.people.sortStyle;

// Selectors
const selectPeopleDateStartReverse = createSelector(
  [selectPeople],
  peopleList =>
    peopleList
      .slice()
      .sort((a, b) => new Date(b.dateTimeStart) - new Date(a.dateTimeStart))
);

const selectPeopleAlpha = createSelector([selectPeople], peopleList =>
  stringSort(peopleList.slice(), "name")
);

const selectPeopleStateSortOrder = createSelector([selectPeople], peopleList =>
  peopleList.slice().sort((a, b) => a.stateSortOrder - b.stateSortOrder)
);

const selectPeopleStateSortOrderThenDate = createSelector(
  [selectPeople],
  peopleList =>
    peopleList
      .slice()
      .sort(
        (a, b) =>
          a.stateSortOrder - b.stateSortOrder ||
          (a.dateTimeStart && b.dateTimeStart
            ? new Date(a.dateTimeStart) - new Date(b.dateTimeStart)
            : 1)
      )
);

export const selectors = {
  selectPeopleAlpha,
  selectPeopleDateStartReverse,
  selectPeopleStateSortOrder,
  selectPeopleStateSortOrderThenDate
};


 */

export const loadAppearances = () => ({ type: LOAD_APPEARANCES_NOW });
const setFetchAppearancesRequest = () => ({
  type: FETCH_APPEARANCES_REQUEST
});
const setFetchAppearancesSucceeded = appearancesList => ({
  type: FETCH_APPEARANCES_SUCCESS,
  payload: appearancesList
});
const setFetchAppearancesFailed = errorMessage => ({
  type: FETCH_APPEARANCES_FAILURE,
  payload: errorMessage
});

export const appearancesDuxActions = {
  setFetchAppearancesFailed,
  setFetchAppearancesRequest,
  setFetchAppearancesSucceeded
};

export const appearancesDuxConstants = {
  LOAD_APPEARANCES_NOW,
  FETCH_APPEARANCES_REQUEST,
  FETCH_APPEARANCES_SUCCESS,
  FETCH_APPEARANCES_FAILURE
};

export default appearancesReducer;

// A thunk must return a function, hence the double () => dispatch =>
// export const loadBands = () => dispatch => {
//   dispatch(loadingBands(true));
//   bandsApi
//     .getBandsData()
//     .then(bandsData => {
//       // addFireBaseImagesToData(bandsData);
//       console.log(
//         "bandsData in reducer=" + JSON.stringify(bandsData[0], null, 4)
//       );
//       dispatch(
//         batchActions([loadedBandsSuccess(bandsData), loadingBands(false)])
//       );
//     })
//     .catch(err => {
//       console.log(`error in data retrieval: ${err}`);
//       dispatch(batchActions([loadedBandsFailure(), loadingBands(false)]));
//       return err;
//     });
// };
