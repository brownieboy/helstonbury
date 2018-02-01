// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { all, call, put, takeLatest } from "redux-saga/effects";
import bandsApi from "../api/bandsApi.js";
import { bandsDuxActions, bandsDuxConstants } from "./bandsReducer.js";
import {
  appearancesDuxActions
  // appearancesDuxConstants
} from "./appearancesReducer.js";

// worker Saga: will be fired on LOAD_BANDS_NOW actions
function* loadBandsGen() {
  // yield console.log("loadBands() triggered in sagas.js");
  yield all([
    put(bandsDuxActions.setFetchBandsRequest()),
    put(appearancesDuxActions.setFetchAppearancesRequest())
  ]);
  try {
    const bandsDataNormalised = yield call(bandsApi.fetchBandsData);
    yield all([
      put(
        bandsDuxActions.setFetchBandsSucceeded(bandsDataNormalised.bandsArray)
      ),
      put(
        appearancesDuxActions.setFetchAppearancesSucceeded(
          bandsDataNormalised.appearancesArray
        )
      )
    ]);
  } catch (e) {
    yield all([
      put(bandsDuxActions.setFetchBandsFailed(e)),
      put(appearancesDuxActions.setFetchAppearancesFailed(e))
    ]);
  }
}

function* mySaga() {
  yield takeLatest(bandsDuxConstants.LOAD_BANDS_NOW, loadBandsGen);
}

export default mySaga;
