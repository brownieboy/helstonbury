import React, { Component } from "react";
// import { StackNavigator as stackNavigator } from "react-navigation";
import { TabNavigator as tabNavigator } from "react-navigation";
// import { Root } from "native-base";

// Styles
import tabNavStyles from "./styles/tab-navigator-styles.js";

// Screens
import Home from "./screens/home.js";
import BandsList from "./screens/bands-list-nav.js";
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

/*
const AppNavigator = stackNavigator(
  {
    Home: {
      screen: Home
    },
    BandsList: {
      screen: BandsList
    },
    BandCard: {
      screen: BandCard
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);
*/

class HomeNav extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { loading: true };
  // }

  // async componentWillMount() {
  //   await Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
  //   });
  //   this.setState({ loading: false });
  // }

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
