import { compose, createStore, applyMiddleware } from "redux";
import { enableBatching } from "redux-batched-actions";
// import { composeWithDevTools } from "remote-redux-devtools";

import mainReducer from "../dux/mainReducer.js";
import thunk from "redux-thunk";

/* eslint-disable no-underscore-dangle */
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // For web extension
// const composeEnhancers = composeWithDevTools || compose; // For NPM, best for React Native
const composeEnhancers = compose; // For NPM, best for React Native


const configureStore = initialState =>
  createStore(
    enableBatching(mainReducer),
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
/* eslint-enable */

export default configureStore;
