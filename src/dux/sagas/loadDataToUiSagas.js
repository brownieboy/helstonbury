import { all, fork, put, take, takeLatest } from "redux-saga/effects";
import { AsyncStorage } from "react-native";

import preloadRNICimages from "../../helper-functions/preload-rnic-images.js";
import { setFetchHomeRequest, setFetchHomeSucceeded } from "../homeReducer.js";
import {
  LOAD_BANDS_NOW,
  setFetchBandsSucceeded,
  setFetchBandsFailed
} from "../bandsReducer.js";
import {
  setFetchAppearancesSucceeded,
  setFetchAppearancesFailed
} from "../appearancesReducer.js";
import { setFetchStagesSucceeded } from "../stagesReducer.js";
import { setFetchContactUsSucceeded } from "../contactUsReducer.js";

const preloadImages = itemsArray => {
  // console.log("preloadImages start");
  const arrayLength = itemsArray.length;
  const preloadArray = [];
  for (let x = 0; x < arrayLength; x++) {
    // preloadArray.push({ uri: itemsArray[x].thumbFullUrl });
    // preloadArray.push({ uri: itemsArray[x].cardFullUrl });
    if (itemsArray[x].thumbFullUrl && itemsArray[x].thumbFullUrl !== "") {
      preloadArray.push(itemsArray[x].thumbFullUrl);
    }
    if (itemsArray[x].cardFullUrl && itemsArray[x].cardFullUrl !== "") {
      preloadArray.push(itemsArray[x].cardFullUrl);
    }
  }

  preloadRNICimages(preloadArray);
  // console.log("preloadImages end");
};

// Worker Saga: will be fired on LOAD_BANDS_NOW actions, and gets all
// data, not just bands
function* loadBandsGen() {
  yield console.log("loadBandsgen() triggered in loadDataToUi.js");
  yield put(setFetchHomeRequest());

  try {
    // const bandsDataNormalised = yield call(bandsApi.fetchBandsData);
    // console.log("Getting data from Firebase");
    const bandsDataNormalisedString = yield AsyncStorage.getItem(
      "localPublishedData"
    );
    // console.log("Parsing data from Firebase");
    // console.log("bandsDataNormalisedString");
    // console.log(bandsDataNormalisedString);
    if (bandsDataNormalisedString) {
      console.log("Local storage returned data");
      const bandsDataNormalised = JSON.parse(bandsDataNormalisedString);

      // Filter out any half-completed data that we might have pulled
      // down from Firebase
      const homeText = bandsDataNormalised.homePageText || "Helstonbury...";

      const bandsArray = bandsDataNormalised.bandsArray.filter(
        bandMember => bandMember.bandId && bandMember.bandId !== ""
      );

      const appearancesArray = bandsDataNormalised.appearancesArray.filter(
        appearancesMember =>
          appearancesMember.bandId && appearancesMember.bandId !== ""
      );

      const stagesArray = bandsDataNormalised.stagesArray || [];

      const contactsPage = bandsDataNormalised.contactsPage || {};

      yield console.log("loadBandsGen, about to yield all with loaded data");
      yield all([
        put(setFetchHomeSucceeded(homeText)),
        put(setFetchBandsSucceeded(bandsArray)),
        put(setFetchAppearancesSucceeded(appearancesArray)),
        put(setFetchStagesSucceeded(stagesArray)),
        put(setFetchContactUsSucceeded(contactsPage))
      ]);
      yield console.log("loadBandsGen, finished yield all with loaded data");

      console.log("Need to restore preloadImage here");
      // preloadImages([...bandsArray, ...stagesArray]);
      yield;
    } else {
      console.log("Local storage returned null");
    }
  } catch (e) {
    console.log("loadBandsGen error=" + e);
    yield all([put(setFetchBandsFailed(e)), put(setFetchAppearancesFailed(e))]);
  }
}

const loadDataToUISagas = [
  takeLatest(LOAD_BANDS_NOW, loadBandsGen)
  // takeLatest(LOAD_FAVOURITES_NOW, loadFavouritesGen),
  // takeLatest(LOAD_UISTATE_NOW, loadUIStateGen),
  // takeLatest(SET_SHOW_FAVOURITES, saveUIStateGen),
  // takeLatest(SET_APPEARANCES_VIEW, saveUIStateGen),
  // takeLatest(
  //   favouritesDuxActions.toggleBandFavouriteStatus().type,
  //   toggleFavouriteGen
  // ),
];

export default loadDataToUISagas;
