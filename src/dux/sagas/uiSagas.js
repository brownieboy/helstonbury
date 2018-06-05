import { select, takeLatest } from "redux-saga/effects";
import { Toast } from "native-base";

import { getShowOnlyFavourites } from "../uiReducer.js";
import { getFavouritesCount } from "../favouritesReducer.js";

export function* showFavouritesWarning() {
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

// function* uiSagas() {
//   yield takeLatest("SET_SHOW_FAVOURITES", showFavouritesWarning);
// }

// export default uiSagas;
//
