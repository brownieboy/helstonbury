import { AsyncStorage } from "react-native";
import { buffers, eventChannel } from "redux-saga";
import { fork, put, take, takeLatest } from "redux-saga/effects";
import { ImageCache } from "react-native-img-cache";
import deepEqual from "deep-equal";
import firebaseApp from "../../api/firebase.js";

import { CLEAR_ALL_LOCAL_DATA } from "../homeReducer.js";
import { LOAD_BANDS_NOW } from "../bandsReducer.js";

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
  // console.log("running updatedItemSaga...");
  const updateChannel = createEventChannel(
    firebaseApp.database().ref("publishedData")
  );
  while (true) {
    // console.log("running updatedItemSaga, inside loop...");
    const item = yield take(updateChannel);
    let overwriteLocal = false;
    try {
      // console.log("getting local data");
      const existingBandsDataString = yield AsyncStorage.getItem(
        "localPublishedData"
      );
      // console.log("type of existingBandsData=" + typeof existingBandsDataString);
      const existingBandsData = JSON.parse(existingBandsDataString);
      // console.log("existingBandsData=" + JSON.stringify(existingBandsData, null, 4).substring(0, 200));
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
        console.log("Clearing images cache, the whole smash....");
        ImageCache.get().clear();

        yield AsyncStorage.setItem(
          "localPublishedData",
          JSON.stringify(item.value)
        );
        yield put({ type: LOAD_BANDS_NOW });
      }
    }
  }
}

function* clearAllLocalDataGen() {
  ImageCache.get().clear();
  yield AsyncStorage.setItem("localPublishedData", "");
  yield put({ type: LOAD_BANDS_NOW });
}

const firebaseSagas = [
  fork(updatedItemSaga),
  takeLatest(CLEAR_ALL_LOCAL_DATA, clearAllLocalDataGen)
];

export default firebaseSagas;
