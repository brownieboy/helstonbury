import { combineReducers } from "redux";

import bandsReducer from "./bandsReducer";
import appearancesReducer from "./appearancesReducer.js";

const mainReducer = combineReducers({
  bandsState: bandsReducer,
  appearancesState: appearancesReducer
});

export default mainReducer;
