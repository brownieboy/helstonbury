// import { batchActions } from "redux-batched-actions";
// import firebase, { extendedConfig as firebaseConfig } from "../api/firebase.js";
// import bandsApi from "../api/bandsApi.js";

// Action type constants
const LOAD_BANDS_NOW = "LOAD_BANDS_NOW"; // Imp
const FETCH_BANDS_REQUEST = "FETCH_BANDS_REQUEST";
const FETCH_BANDS_SUCCESS = "FETCH_BANDS_SUCCESS";
const FETCH_BANDS_FAILURE = "FETCH_BANDS_FAILURE";

/*
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }

{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }


 */

// Reducer
const bandsReducer = (
  state = { fetchStatus: "", fetchError: "", bandsList: [] },
  action
) => {
  switch (action.type) {
    case FETCH_BANDS_REQUEST:
      return { ...state, fetchStatus: "loading" };
    case FETCH_BANDS_SUCCESS:
      return {
        ...state,
        fetchStatus: "",
        bandsList: action.payload
      };
    case FETCH_BANDS_FAILURE:
      return { ...state, fetchStatus: "failure", fetchError: action.payload };
    default:
      return state;
  }
};

export const loadBands = () => ({ type: LOAD_BANDS_NOW });

export const bandsDuxConstants = {
  LOAD_BANDS_NOW,
  FETCH_BANDS_REQUEST,
  FETCH_BANDS_SUCCESS,
  FETCH_BANDS_FAILURE
};

export default bandsReducer;

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
