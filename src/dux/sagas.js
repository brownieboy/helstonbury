// import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { AsyncStorage } from "react-native";
import { buffers, eventChannel } from "redux-saga";
import { all, call, fork, put, take, takeLatest } from "redux-saga/effects";
import FastImage from "react-native-fast-image";

import deepEqual from "deep-equal";
import firebaseApp from "../api/firebase.js";

// import bandsApi from "../api/bandsApi.js";
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

export function createEventChannel(ref) {
  const listener = eventChannel(emit => {
    ref.on("value", snap => {
      emit({
        key: snap.key,
        value: snap.val()
      });
    });
    return () => {
      ref.off();
    };
  }, buffers.expanding(1));
  return listener;
}

function* updatedItemSaga() {
  const updateChannel = createEventChannel(
    firebaseApp.database().ref("publishedData")
  );
  while (true) {
    const item = yield take(updateChannel);
    // console.log(
    //   "from FB item=" + JSON.stringify(item, null, 4).substring(0, 200)
    // );
    let overwriteLocal = false;
    try {
      const existingBandsData = yield JSON.parse(
        AsyncStorage.getItem("localPublishedData")
      );
      if (!deepEqual(existingBandsData, item.value)) {
        console.log("local and server don't match, so update...");
        overwriteLocal = true;
      } else {
        console.log("local and server match, don't update..");
      }
    } catch (e) {
      console.log(
        "Error in parsing local storage.  Overwriting with Firebase.  Error=" +
          e
      );
      overwriteLocal = true;
    } finally {
      if (overwriteLocal) {
        yield AsyncStorage.setItem(
          "localPublishedData",
          JSON.stringify(item.value)
        );
        yield put({ type: "LOAD_BANDS_NOW" });
      }
    }

    // let response = yield AsyncStorage.getItem("localPublishedData");
    // console.log(
    //   "data from storage = " +
    //     JSON.stringify(response, null, 4).substring(0, 200)
    // );
  }
}

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
  // yield console.log("loadBands() triggered in sagas.js");ß
  yield all([
    put(bandsDuxActions.setFetchBandsRequest()),
    put(appearancesDuxActions.setFetchAppearancesRequest())
  ]);
  try {
    // const bandsDataNormalised = yield call(bandsApi.fetchBandsData);
    const bandsDataNormalisedString = yield AsyncStorage.getItem(
      "localPublishedData"
    );
    yield console.log(
      "bandsDataNormalisedString=" + bandsDataNormalisedString
    );
    const bandsDataNormalised = yield JSON.parse(bandsDataNormalisedString);
    // yield console.log(
    //   "bandsDataNormalised" +
    //     JSON.stringify(bandsDataNormalised, null, 4)
    // );

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
    console.log("loadBandsGen error=" + e);
    yield all([
      put(bandsDuxActions.setFetchBandsFailed(e)),
      put(appearancesDuxActions.setFetchAppearancesFailed(e))
    ]);
  }
}

function* mySaga() {
  // yield takeLatest(bandsDuxConstants.LOAD_BANDS_NOW, loadBandsGen);
  yield takeLatest(loadBandsNow().type, loadBandsGen);
  yield fork(updatedItemSaga);
}

//  yield takeLatest(loadBandsNow(), loadBandsGen);

// const db = firebaseApp.database();

// const myRef = db.ref("publishedData");
// console.log("ref = " + myRef);
// myRef.on("value", snapshot => {
//   console.log("publishedData snapshot");
//   console.log(snapshot.val());
// });

// Need to change this to write to async storage
// Then need to change bandsApi to read from async storage
// or better still, do it right here in the Saga.

export default mySaga;
