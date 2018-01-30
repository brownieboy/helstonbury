// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { call, put, takeLatest } from "redux-saga/effects";
import bandsApi from "../api/bandsApi.js";
import { bandsDuxConstants } from "./bandsReducer.js";

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* loadBands(action) {
//   try {
//     const user = yield call(Api.fetchUser, action.payload.userId);
//     yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
//   } catch (e) {
//     yield put({ type: "USER_FETCH_FAILED", message: e.message });
//   }
// }
/*
export const bandsDuxConstants = {
  LOAD_BANDS,
  LOADED_BANDS_SUCCESS,
  LOADED_BANDS_FAILURE,
  LOADING_BANDS
};
 */

// worker Saga: will be fired on LOAD_BANDSactions
function* loadBandsGen() {
  yield console.log("loadBands() triggered in sagas.js");
  try {
    const bandsList = yield call(bandsApi.fetchBandsData);
    console.log("generator bandsList=" + JSON.stringify(bandsList, null, 4));
    yield put({
      type: bandsDuxConstants.LOADED_BANDS_SUCCESS,
      payload: bandsList
    });
  } catch (e) {
    yield put({
      type: bandsDuxConstants.LOADED_BANDS_FAILURE,
      message: e.message
    });
  }
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/

function* mySaga() {
  yield takeLatest(bandsDuxConstants.LOAD_BANDS, loadBandsGen);
}

export default mySaga;
