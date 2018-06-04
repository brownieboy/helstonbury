import { createSelector } from "reselect";
import * as d3 from "d3-collection";
import { format } from "date-fns";

// import { d3 } from "d3-collection";
import { stringThenDateTimeSort } from "../helper-functions/sorting.js";

// import { getBandInfoForId } from "./bandsReducer.js";

// Action type constants
const LOAD_APPEARANCES_NOW = "LOAD_APPEARANCES_NOW"; // Imperative, hence "NOW"!
const FETCH_APPEARANCES_REQUEST = "FETCH_APPEARANCES_REQUEST";
const FETCH_APPEARANCES_SUCCESS = "FETCH_APPEARANCES_SUCCESS";
const FETCH_APPEARANCES_FAILURE = "FETCH_APPEARANCES_FAILURE";

// Reducer
const appearancesReducer = (
  state = { fetchStatus: "", fetchError: "", appearancesList: [] },
  action
) => {
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
const selectAppearances = state => state.appearancesList;

// // Selectors
// const selectAppearancesByDateTime = createSelector(
//   [selectAppearances],
//   appearancesList =>
//     appearancesList
//       .slice()
//       .sort((a, b) => new Date(a.dateTimeStart) - new Date(b.dateTimeStart))
// );

// const selectAppearancesGroupedByDayThenStage = createSelector(
//   [selectAppearancesByDateTime],
//   appearancesList =>
//     d3
//       .nest()
//       .key(appearance => format(new Date(appearance.dateTimeStart), "dddd"))
//       .key(appearance => `${appearance.stageSortOrder}~${appearance.stageName}`)
//       .sortKeys(
//         (a, b) => parseInt(a.split("~")[0], 10) - parseInt(b.split("~")[0], 10)
//       )
//       .entries(appearancesList)
// );
/*
const nest = d3.nest()
    .key(d => +d.date)
    .sortKeys((a, b) => a - b)
    .entries(data);
*/

// const selectAppearancesByBandNameThenDateTime = createSelector(
//   [selectAppearances],
//   appearancesList =>
//     stringThenDateTimeSort(appearancesList.slice(), "name", "dateTimeStart")
// );

// These getters have a supplied parameter, so they'll channge ever time.  Hence no
// point in using Reselect library with them.
// The function actually returns a function that's a closure over selectAppearancesByBandNameThenDateTimem
// so needs to be run in the connector.
// const getAppearancesForBand = () => bandKey =>
//   selectAppearancesByBandNameThenDateTime
//     .slice()
//     .filter(bandMember => bandMember.bandId === bandKey);

// const selectAppearancesByDateTime = () => [];

// export const selectors = {
//   selectAppearancesByDateTime,
//   selectAppearancesByBandNameThenDateTime,
//   selectAppearancesGroupedByDayThenStage
// };

/*
const getAppearancesByDateTime = (appearancesList, bandsToFilterArray = []) => {
  // const newAppearances = [...appearancesList];
  const newAppearances = appearancesList.filter(
    appearance => bandsToFilterArray.indexOf(appearance.bandId) > 0
  );
  return newAppearances
    .slice()
    .sort((a, b) => new Date(a.dateTimeStart) - new Date(b.dateTimeStart));
};

*/

// Getters are just functions.
export const getFetchStatus = state => state.appearancesState.fetchStatus;

export const getAppearancesList = state => {
  const newAppearances = [...state.appearancesState.appearancesList];
  return newAppearances;
};

const getAppearancesByDateTime = appearancesList => {
  const newAppearances = [...appearancesList];
  return newAppearances
    .slice()
    .sort((a, b) => new Date(a.dateTimeStart) - new Date(b.dateTimeStart));
};

// const getFavouriteAppearancesByDateTime = (appearancesList, favouritesList) =>
//   getAppearancesByDateTime(appearances).filter(
//     appearance => favouritesList.indexOf(appearance.bandId) >= 0
//   );

export const filterAppearancesByBandId = (
  appearances,
  bandsToFilterArray = []
) => {
  // console.log("bandsToFilterArray");
  // console.log(bandsToFilterArray);
  return appearances.filter(appearance => {
    // console.log("appearance:");
    // console.log(appearance);
    return bandsToFilterArray.indexOf(appearance.bandId) >= 0;
  });
};

/*
const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)
 */

// Selectors revisited, June 2018
const selectAppearancesSortedByDateTime = createSelector(
  [selectAppearances],
  appearancesList =>
    appearancesList
      .slice()
      .sort((a, b) => new Date(a.dateTimeStart) - new Date(b.dateTimeStart))
);

const selectAppearancesGroupedByDay = createSelector(
  [selectAppearancesSortedByDateTime],
  appearancesList =>
    d3
      .nest()
      .key(appearance =>
        format(
          // new Date(appearance.dateTimeStart.split("T")[0]),
          // "dddd DD/MM/YYYY")
          new Date(appearance.dateTimeStart.split("T")[0]),
          "dddd MMM Do YYYY"
        )
      )
      .sortValues(
        (a, b) =>
          reverseTimesOrder
            ? new Date(b.dateTimeStart) - new Date(a.dateTimeStart)
            : new Date(a.dateTimeStart) - new Date(b.dateTimeStart)
      )
      .entries(appearancesList)
);

//  Getters.  These don't use Reselect so run every time.  Makes them
//  potentially poor performers, so replace with selectors (see above)
const sortAppearancesByDateTime = appearancesList => {
  const newAppearances = [...appearancesList];
  return newAppearances
    .slice()
    .sort((a, b) => new Date(a.dateTimeStart) - new Date(b.dateTimeStart));
};

export const groupAppearancesByDay = (appearances, reverseTimesOrder) => {
  // console.log("groupAppearancesByDay, reverseTimesOrder=" + reverseTimesOrder);

  const appearancesList = [...sortAppearancesByDateTime(appearances, false)];
  const appearancesGrouped = d3
    .nest()
    .key(appearance =>
      format(
        // new Date(appearance.dateTimeStart.split("T")[0]),
        // "dddd DD/MM/YYYY")
        new Date(appearance.dateTimeStart.split("T")[0]),
        "dddd MMM Do YYYY"
      )
    )
    // .sortKeys(
    //   // (a, b) => parseInt(a.split("~")[0], 10) - parseInt(b.split("~")[0], 10)
    //   // (a, b) => parseInt(b.split("~")[0], 10) - parseInt(a.split("~")[0], 10)
    //   // d3.ascending
    //   (a, b) => b - a
    // )
    .sortValues(
      (a, b) =>
        reverseTimesOrder
          ? new Date(b.dateTimeStart) - new Date(a.dateTimeStart)
          : new Date(a.dateTimeStart) - new Date(b.dateTimeStart)
    )
    .entries(appearancesList);
  // console.log("ascending appearancesGrouped:");
  // console.log(appearancesGrouped);
  return appearancesGrouped;
};

export const groupAppearancesByDayStage = (appearances, reverseTimesOrder) => {
  const appearancesList = [
    ...sortAppearancesByDateTime(appearances, reverseTimesOrder)
  ];
  const appearancesGrouped = d3
    .nest()
    .key(appearance =>
      format(
        //   new Date(appearance.dateTimeStart.split("T")[0]),
        //   "dddd DD/MM/YYYY"
        // )
        new Date(appearance.dateTimeStart.split("T")[0]),
        "dddd MMM Do YYYY"
      )
    )
    .key(appearance => `${appearance.stageSortOrder}~${appearance.stageId}`)
    .sortKeys(
      (a, b) => parseInt(a.split("~")[0], 10) - parseInt(b.split("~")[0], 10)
    )
    .sortValues(
      (a, b) =>
        reverseTimesOrder
          ? new Date(b.dateTimeStart) - new Date(a.dateTimeStart)
          : new Date(a.dateTimeStart) - new Date(b.dateTimeStart)
    )
    .entries(appearancesList);
  return appearancesGrouped;
};

/*
const selectAppearancesGroupedByDayThenStage = createSelector(
  [selectAppearancesByDateTime],
  appearancesList =>
    d3
      .nest()
      .key(appearance => format(new Date(appearance.dateTimeStart), "dddd"))
      .key(appearance => `${appearance.stageSortOrder}~${appearance.stageName}`)
      .sortKeys(
        (a, b) => parseInt(a.split("~")[0], 10) - parseInt(b.split("~")[0], 10)
      )
      .entries(appearancesList)
);

 */

export const getAppearancesGroupedByDay = state => {
  const appearancesList = [
    ...getAppearancesByDateTime(state.appearancesState.appearancesList)
  ];
  const appearancesGrouped = d3
    .nest()
    .key(appearance =>
      format(new Date(appearance.dateTimeStart), "dddd DD/MM/YYYY")
    )
    .sortKeys(
      (a, b) => parseInt(a.split("~")[0], 10) - parseInt(b.split("~")[0], 10)
    )
    .entries(appearancesList);
  return appearancesGrouped;
};

/*
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
