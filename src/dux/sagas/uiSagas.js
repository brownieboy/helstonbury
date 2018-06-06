import { AsyncStorage } from "react-native";
import { put, select, takeLatest } from "redux-saga/effects";
import { Toast } from "native-base";

import {
  getShowOnlyFavourites,
  LOAD_UISTATE_NOW,
  SET_APPEARANCES_VIEW,
  SET_SHOW_FAVOURITES,
  SET_TIMES_ORDER,
  setFetchUIStateSucceeded
} from "../uiReducer.js";
import {
  getFavouritesCount,
  UPDATE_BAND_FAVOURITES_STATUS
} from "../favouritesReducer.js";

export function* showFavouritesWarning() {
  console.log("uiSagas showFavouritesWarning");
  const state = yield select();
  if (getShowOnlyFavourites(state) && getFavouritesCount(state) === 0) {
    yield Toast.show({
      text: "You have no Favourites selected so will see nothing in the schedule!  Consider turning off the Favourites only setting.",
      buttonText: "Okay",
      duration: 8000,
      position: "top",
      type: "warning"
    });
  }
}

function* loadUIStateGen() {
  console.log("uiSagas loadUIStateGen");
  const loadedUIStateString = yield AsyncStorage.getItem("uiState");
  // console.log("loadedUIStateString: " + loadedUIStateString);
  const loadedUIStateObj = loadedUIStateString
    ? JSON.parse(loadedUIStateString)
    : null;
  yield put(setFetchUIStateSucceeded(loadedUIStateObj));
}

function* saveUIStateGen() {
  console.log("uiSagas saveUIStateGen");
  const state = yield select();
  const newUIState = state.uiState;
  yield AsyncStorage.setItem("uiState", JSON.stringify(newUIState));
}

const uiSagas = [
  takeLatest(SET_SHOW_FAVOURITES, showFavouritesWarning),
  takeLatest(UPDATE_BAND_FAVOURITES_STATUS, showFavouritesWarning),
  takeLatest(SET_SHOW_FAVOURITES, saveUIStateGen),
  takeLatest(SET_APPEARANCES_VIEW, saveUIStateGen),
  takeLatest(SET_TIMES_ORDER, saveUIStateGen),
  takeLatest(LOAD_UISTATE_NOW, loadUIStateGen)
];

export default uiSagas;

/*
const writeFirebaseSagas = [
  takeEvery(bandsActionTypes.SAVE_NEW_BAND, saveData),
  takeEvery(bandsActionTypes.SAVE_EDITED_BAND, saveData),
  takeEvery(bandsActionTypes.DELETE_BANDS, saveData)
];

export default writeFirebaseSagas;
 */
