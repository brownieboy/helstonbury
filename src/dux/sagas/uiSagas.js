import { takeLatest } from "redux-saga/effects";
import { Toast } from "native-base";

function* showFavouritesWarning() {
  yield Toast.show({
    text: "Saga favourites Warning!",
    buttonText: "Okay",
    duration: 3000
  });
}

function* uiSagas() {
  yield takeLatest("SET_SHOW_FAVOURITES", showFavouritesWarning);
}

export default uiSagas;
