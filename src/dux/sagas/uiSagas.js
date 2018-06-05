import { select, takeLatest } from "redux-saga/effects";
import { Toast } from "native-base";

import { getShowOnlyFavourites } from "../uiReducer.js";
import { getFavouritesCount } from "../favouritesReducer.js";

export function* showFavouritesWarning() {
  const state = yield select();
  if (getShowOnlyFavourites(state) && getFavouritesCount(state) === 0) {
    yield Toast.show({
      text: "You are displaying only favourites but have not selected any!",
      buttonText: "Okay",
      duration: 3000
    });
  }
}

// function* uiSagas() {
//   yield takeLatest("SET_SHOW_FAVOURITES", showFavouritesWarning);
// }

// export default uiSagas;
//
