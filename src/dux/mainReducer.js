import { combineReducers } from "redux";

import homeReducer from "./homeReducer.js";
import bandsReducer from "./bandsReducer";
import appearancesReducer from "./appearancesReducer.js";
import favouritesReducer from "./favouritesReducer.js";
import stagesReducer from "./stagesReducer.js";
// import uiReducer from "./uiReducer.js";

const mainReducer = combineReducers({
  appearancesState: appearancesReducer,
  bandsState: bandsReducer,
  homeState: homeReducer,
  favouritesState: favouritesReducer,
  stagesState: stagesReducer
  // uiState: uiReducer
});

export default mainReducer;
