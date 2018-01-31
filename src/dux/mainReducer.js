import { combineReducers } from "redux";

import bandsReducer from "./bandsReducer";
import appearancesReducer from "./appearancesReducer.js";

const mainReducer = combineReducers({
  bands: bandsReducer,
  appearances: appearancesReducer
});

export default mainReducer;
