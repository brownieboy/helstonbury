import { put, select, takeLatest } from "redux-saga/effects";
import { AsyncStorage } from "react-native";

import {
  LOAD_FAVOURITES_NOW,
  setFetchFavouritesFailed,
  setFetchFavouritesRequest,
  setFetchFavouritesSucceededScrubBandIds,
  TOGGLE_BAND_FAVOURITES_STATUS
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

function* saveFavouritesGen() {
  console.log("favouritesSagas saveFavouritesGen");
  const state = yield select();
  const newFavourites = state.favouritesState.favourites;
  // console.log("toggling favourite state is " + JSON.stringify(state, null, 4));
  // console.log("newFavourites is "+ newFavourites);

  yield AsyncStorage.setItem("localFavourites", JSON.stringify(newFavourites));
}

const favouritesSagas = [
  takeLatest(LOAD_FAVOURITES_NOW, loadFavouritesGen),
  takeLatest(TOGGLE_BAND_FAVOURITES_STATUS, saveFavouritesGen)
];

export default favouritesSagas;

// TOGGLE_BAND_FAVOURITES_STATUS
