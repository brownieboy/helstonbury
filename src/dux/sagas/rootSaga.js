import { all } from "redux-saga/effects";

import dataSagas from "./dataSagas.js";
import uiSagas from "./uiSagas.js";
// Combine sagas solution taken from Andarist's comment at:
// https://github.com/redux-saga/redux-saga/issues/160
function* sagas() {
  yield all([...dataSagas, ...uiSagas]);
}
export default sagas;

/*
import { all } from "redux-saga/effects";

import readFirebaseDataSagas from "./readFirebaseDataSagas.js";
import loginFirebaseSagas from "./loginFirebaseSagas.js";
import writeFirebaseBandSagas from "./writeFirebaseBandSagas.js";
import writeFirebaseHomeSagas from "./writeFirebaseHomeSagas.js";
import writeFirebaseContactUsSagas from "./writeFirebaseContactUsSagas.js";
import writeFirebaseStageSagas from "./writeFirebaseStageSagas.js";
import writeFirebaseDateSagas from "./writeFirebaseDateSagas.js";
import writeFirebaseScheduleSagas from "./writeFirebaseScheduleSagas.js";
import uploadFirebaseImagesSagas from "./uploadFirebaseImagesSagas.js";
import writeFirebasePublishSagas from "./writeFirebasePublishSagas.js";
// Combine sagas solution taken f;rom Andarist's comment at:
// https://github.com/redux-saga/redux-saga/issues/160
function* sagas() {
  yield all([
    ...readFirebaseDataSagas,
    ...loginFirebaseSagas,
    ...writeFirebaseBandSagas,
    ...writeFirebaseHomeSagas,
    ...writeFirebaseStageSagas,
    ...writeFirebaseDateSagas,
    ...writeFirebaseScheduleSagas,
    ...uploadFirebaseImagesSagas,
    ...writeFirebasePublishSagas,
    ...writeFirebaseContactUsSagas
  ]);
}
export default sagas;
 */
