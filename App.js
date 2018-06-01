import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore.js";
import SplashScreen from "react-native-splash-screen";
import { Platform } from "react-native";

// import logo from "./logo.svg";

import MainNav from "./src/main-nav.js";

import { whyDidYouUpdate } from "why-did-you-update";
whyDidYouUpdate(React, {
  exclude: [
    /^Styled*/,
    /^Connect/,
    /^Thumbnail/,
    /^Title/,
    /^ParsedText/,
    /^Icon/,
    /^IconNB/,
    /^Right/,
    /^Left/,
    /^ListItem/,
    /^Body/,
    /^CachedImage/,
    /^TabBarIcon/,
    /^Text/,
    /^Radio/,
    /^Switch/,
    /^Header/,
    /^H2/,
    /^SafeView/
  ]
});

const store = configureStore({});

class App extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen for Android.
    // We'll stick with Storyboard for iOS.
    if (Platform.OS === "android") {
      SplashScreen.hide();
    }
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
