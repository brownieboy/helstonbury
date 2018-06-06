import { all } from "redux-saga/effects";

import dataSagas from "./dataSagas.js";
import uiSagas from "./uiSagas.js";
import favouritesSagas from "./favouritesSagas.js";
// Combine sagas solution taken from Andarist's comment at:
// https://github.com/redux-saga/redux-saga/issues/160
function* sagas() {
  yield all([...dataSagas, ...favouritesSagas, ...uiSagas]);
}
export default sagas;
