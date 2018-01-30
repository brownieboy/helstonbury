// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { call, put, takeLatest } from "redux-saga/effects";
import bandsApi from "../api/bandsApi.js";
import { bandsDuxConstants } from "./bandsReducer.js";

// worker Saga: will be fired on LOAD_BANDSactions
function* loadBandsGen() {
  yield console.log("loadBands() triggered in sagas.js");
  try {
    const bandsList = yield call(bandsApi.fetchBandsData);
    // console.log("generator bandsList=" + JSON.stringify(bandsList, null, 4));
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

function* mySaga() {
  yield takeLatest(bandsDuxConstants.LOAD_BANDS, loadBandsGen);
}

export default mySaga;
