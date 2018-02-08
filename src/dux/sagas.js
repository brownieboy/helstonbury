// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { all, call, put, takeLatest } from "redux-saga/effects";
import FastImage from "react-native-fast-image";
import firebaseApp from "../api/firebase.js";

import bandsApi from "../api/bandsApi.js";
import {
  bandsDuxActions,
  // bandsDuxConstants,
  loadBandsNow
} from "./bandsReducer.js";
import {
  appearancesDuxActions
  // appearancesDuxConstants
} from "./appearancesReducer.js";

/*
FastImage.preload([
  {
    uri: 'https://facebook.github.io/react/img/logo_og.png',
    headers: { Authorization: 'someAuthToken' },
  },
  {
    uri: 'https://facebook.github.io/react/img/logo_og.png',
    headers: { Authorization: 'someAuthToken' },
  },
])
 */

const preloadImages = bandsArray => {
  const arrayLength = bandsArray.length;
  const preloadArray = [];
  for (let x = 0; x < arrayLength; x++) {
    preloadArray.push({ uri: bandsArray[x].thumbFullUrl });
    preloadArray.push({ uri: bandsArray[x].cardFullUrl });
  }
  // console.log("preloadArray=" + JSON.stringify(preloadArray, null, 4));
  // console.log("Preloading...preloadArray=" + JSON.stringify(preloadArray, null, 4));
  FastImage.preload(preloadArray);
};

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
    preloadImages(bandsDataNormalised.bandsArray);
  } catch (e) {
    yield all([
      put(bandsDuxActions.setFetchBandsFailed(e)),
      put(appearancesDuxActions.setFetchAppearancesFailed(e))
    ]);
  }
}

function* mySaga() {
  // yield takeLatest(bandsDuxConstants.LOAD_BANDS_NOW, loadBandsGen);
  yield takeLatest(loadBandsNow().type, loadBandsGen);
}

//  yield takeLatest(loadBandsNow(), loadBandsGen);

const db = firebaseApp.database();

const myRef = db.ref("publishedData");
console.log("ref = " + myRef);
myRef.on("value", snapshot => {
  console.log("publishedData snapshot");
  console.log(snapshot.val());
});

// Need to change this to write to async storage
// Then need to change bandsApi to read from async storage
// or better still, do it right here in the Saga.

export default mySaga;
