import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore.js";
// import SplashScreen from "react-native-splash-screen";

// import logo from "./logo.svg";

import MainNav from "./src/main-nav.js";

const store = configureStore({});

class App extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    // SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <MainNav />
      </Provider>
    );
  }
}

export default App;
