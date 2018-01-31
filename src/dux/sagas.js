// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { call, put, takeLatest } from "redux-saga/effects";
import bandsApi from "../api/bandsApi.js";
import { bandsDuxActions, bandsDuxConstants } from "./bandsReducer.js";

// worker Saga: will be fired on LOAD_BANDS_NOW actions
function* loadBandsGen() {
  // yield console.log("loadBands() triggered in sagas.js");
  yield put(bandsDuxActions.setFetchBandsRequest());
  try {
    const bandsDataNormalised = yield call(bandsApi.fetchBandsData);
    yield put(bandsDuxActions.setFetchBandsSucceeded(bandsDataNormalised.bandsArray));
  } catch (e) {
    yield put(bandsDuxActions.setFetchBandsFailed(e));
  }
}

function* mySaga() {
  yield takeLatest(bandsDuxConstants.LOAD_BANDS_NOW, loadBandsGen);
}

export default mySaga;
