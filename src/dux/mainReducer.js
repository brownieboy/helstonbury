import { combineReducers } from "redux";

import bandsReducer from "./bandsReducer";

const mainReducer = combineReducers({
  bands: bandsReducer
});

export default mainReducer;
