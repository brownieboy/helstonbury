import { combineReducers } from "redux";

import bandsReducer from "./bandsReducer";
import appearancesReducer from "./appearancesReducer.js";

const mainReducer = combineReducers({
  appearancesState: appearancesReducer,
  bandsState: bandsReducer
});

export default mainReducer;
