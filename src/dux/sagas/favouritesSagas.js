import { put, select, takeLatest } from "redux-saga/effects";
import { AsyncStorage } from "react-native";

import {
  LOAD_FAVOURITES_NOW,
  setFetchFavouritesFailed,
  setFetchFavouritesRequest,
  setFetchFavouritesSucceededScrubBandIds
} from "../favouritesReducer.js";

function* loadFavouritesGen() {
  console.log("favouritesSagas loadFavouritesGen");
  yield put(setFetchFavouritesRequest());
  try {
    // const bandsDataNormalised = yield call(bandsApi.fetchBandsData);
    const favouritesString = yield AsyncStorage.getItem("localFavourites");
    // console.log("favouritesString=" + favouritesString);

    const favourites = favouritesString ? JSON.parse(favouritesString) : [];
    const state = yield select();

    yield put(
      setFetchFavouritesSucceededScrubBandIds(
        favourites,
        state.bandsState.bandsList
      )
    );
  } catch (e) {
    console.log("loadFavouritesGen error=" + e);
    yield put(setFetchFavouritesFailed(e));
  }
}

const favouritesSagas = [takeLatest(LOAD_FAVOURITES_NOW, loadFavouritesGen)];

export default favouritesSagas;
