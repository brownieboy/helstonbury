import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";

// import { stringSort } from "../helper-functions/sorting.js";

// Action type constants
const LOAD_STAGES_NOW = "LOAD_STAGES_NOW"; // Imperative, hence "NOW"!
const FETCH_STAGES_REQUEST = "FETCH_STAGES_REQUEST";
const FETCH_STAGES_SUCCESS = "FETCH_STAGES_SUCCESS";
const FETCH_STAGES_FAILURE = "FETCH_STAGES_FAILURE";

// Reducer
const stagesReducer = (
  state = { fetchStatus: "", fetchError: "", stagesList: [] },
  action
) => {
  switch (action.type) {
    case FETCH_STAGES_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_STAGES_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        stagesList: action.payload
      };
    case FETCH_STAGES_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    default:
      return state;
  }
};

/*
export const selectStages = state =>
  state.stagesState.stagesList.sort((a, b) => a.sortOrder - b.sortOrder);
 */
// Sort/filter functions for selectors
export const selectStages = state => state.stagesState.stagesList;
// export const selectStagesBySortOrder = state =>
//   state.stagesState.stagesList.sort((a, b) => a.sortOrder - b.sortOrder);

export const selectStagesBySortOrder = createSelector(
  [selectStages],
  stagesList => stagesList.sort((a, b) => a.sortOrder - b.sortOrder)
);

const getStageId = (state, props) => props.navigation.state.params.stageId;

export const selectStageDetails = createCachedSelector(
  [selectStagesBySortOrder, getStageId],
  (stagesList, stageId) => 
    stagesList.filter(stageMember => stageMember.id === stageId)[0]
)((state, props) => getStageId(state, props));

// const selectAlphabetical = createSelector([selectStages], stagesList =>
//   stringSort(stagesList.slice(), "name")
// );

// const selectAlphabetical = () => selectStages();

// const selectPeopleAlpha = createSelector([selectPeople], peopleList =>
//   stringSort(peopleList.slice(), "name")
// );

// export const selectors = {
//   selectAlphabetical
// };

export const loadStagesNow = () => ({ type: LOAD_STAGES_NOW });
// export const fetchStagesSucceeded = () => ({ type: FETCH_STAGES_REQUEST });

const setFetchStagesRequest = () => ({
  type: FETCH_STAGES_REQUEST
});
const setFetchStagesSucceeded = stagesList => ({
  type: FETCH_STAGES_SUCCESS,
  payload: stagesList
});
const setFetchStagesFailed = errorMessage => ({
  type: FETCH_STAGES_FAILURE,
  payload: errorMessage
});

export const stagesDuxActions = {
  setFetchStagesFailed,
  setFetchStagesRequest,
  setFetchStagesSucceeded
};

// export const stagesDuxConstants = {
//   LOAD_STAGES_NOW,
//   FETCH_STAGES_REQUEST,
//   FETCH_STAGES_SUCCESS,
//   FETCH_STAGES_FAILURE
// };

// Getters don't use redux-select
export const getStageInfoForId = (stagesList, stageId) =>
  stagesList
    ? stagesList.find(stageMember => stageMember.id === stageId)
    : null;

export default stagesReducer;
