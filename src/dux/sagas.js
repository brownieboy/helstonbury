// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { call, put, takeLatest } from "redux-saga/effects";
import bandsApi from "../api/bandsApi.js";
import { bandsDuxActions, bandsDuxConstants } from "./bandsReducer.js";

// worker Saga: will be fired on LOAD_BANDSactions
function* loadBandsGen() {
  yield console.log("loadBands() triggered in sagas.js");
  // yield put({
  //   type: bandsDuxConstants.FETCH_BANDS_REQUEST
  // });
  yield bandsDuxActions.setFetchBandsRequest();
  try {
    const bandsList = yield call(bandsApi.fetchBandsData);
    // console.log("generator bandsList=" + JSON.stringify(bandsList, null, 4));
    yield put({
      type: bandsDuxConstants.FETCH_BANDS_SUCCESS,
      payload: bandsList
    });
  } catch (e) {
    yield put({
      type: bandsDuxConstants.FETCH_BANDS_FAILURE,
      message: e.message
    });
  }
}

/*
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
 */

function* mySaga() {
  yield takeLatest(bandsDuxConstants.LOAD_BANDS_NOW, loadBandsGen);
}

export default mySaga;
