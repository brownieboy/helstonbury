// import { batchActions } from "redux-batched-actions";
// import firebase, { extendedConfig as firebaseConfig } from "../api/firebase.js";
// import bandsApi from "../api/bandsApi.js";

// Action type constants
const LOAD_BANDS = "LOAD_BANDS";
const LOADING_BANDS = "LOADING_BANDS";
const LOADED_BANDS_SUCCESS = "LOADED_BANDS_SUCCESS";
const LOADED_BANDS_FAILURE = "LOADED_BANDS_FAILURE";

// Reducer
const bandsReducer = (state = { loading: false, bandsList: [] }, action) => {
  switch (action.type) {
    case LOADING_BANDS:
      return { ...state, loading: true };
    case LOADED_BANDS_SUCCESS:
      return { ...state, loading: false, bandsList: action.payload };
    case LOADED_BANDS_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const loadBands = () => ({ type: LOAD_BANDS });

export const bandsDuxConstants = {
  LOAD_BANDS,
  LOADED_BANDS_SUCCESS,
  LOADED_BANDS_FAILURE,
  LOADING_BANDS
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
