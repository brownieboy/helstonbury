// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";
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

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loadBandsGen(action) {
  yield console.log("loadBands() triggered in sagas.js");
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
