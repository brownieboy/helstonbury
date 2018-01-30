import React, { Component } from "react";
// import { StackNavigator as stackNavigator } from "react-navigation";
import { TabNavigator as tabNavigator } from "react-navigation";
// import { Root } from "native-base";

// Styles
import tabNavStyles from "./styles/tab-navigator-styles.js";

// Screens
import Home from "./screens/home.js";
import BandsList from "./screens/bands-list-nav.js";
import Appearances from "./screens/appearances.js";
import Stages from "./screens/stages.js";

const mainData = {
  bandsList: [],
  appearancesList: [],
  stagesList: []
};

const AppNavigator = tabNavigator(
  {
    Home: {
      screen: Home
    },
    BandsList: {
      screen: BandsList
    },
    Appearances: { screen: Appearances },
    Stages: {
      screen: Stages
    }
  },
  {
    initialRouteName: "Home",
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: true,
      activeTintColor: tabNavStyles.icon.activeTintColor
    }
  }
);

class HomeNav extends Component {

  render() {
    // if (this.state.loading) {
    //   return (
    //     <Root>
    //       <AppLoading />
    //     </Root>
    //   );
    // }
    return <AppNavigator screenProps={{ mainData }} />;
  }
}

export default HomeNav;
