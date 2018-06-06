import { select, takeLatest } from "redux-saga/effects";
import { Toast } from "native-base";

import { getShowOnlyFavourites, SET_SHOW_FAVOURITES } from "../uiReducer.js";
import {
  getFavouritesCount,
  UPDATE_BAND_FAVOURITES_STATUS
} from "../favouritesReducer.js";

export function* showFavouritesWarning() {
  console.log("showFavouritesWarning");
  const state = yield select();
  if (getShowOnlyFavourites(state) && getFavouritesCount(state) === 0) {
    yield Toast.show({
      text: "You are displaying favourites only but have none chosen!",
      buttonText: "Okay",
      duration: 5000,
      position: "top",
      type: "warning"
    });
  }
}

// function* uiSagas() {
//   yield takeLatest(SET_SHOW_FAVOURITES, showFavouritesWarning);
//   yield takeLatest(UPDATE_BAND_FAVOURITES_STATUS, showFavouritesWarning);
// }

const uiSagas = [
  takeLatest(SET_SHOW_FAVOURITES, showFavouritesWarning),
  takeLatest(UPDATE_BAND_FAVOURITES_STATUS, showFavouritesWarning)
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
