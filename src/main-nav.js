import React, { Component } from "react";
// import { TabNavigator as tabNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation";

// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Root } from "native-base";

// Styles
import tabNavStyles from "./styles/tab-navigator-styles.js";
import StagesTabIcon from "./components/stages-tab-icon.js";


// Screens
import Home from "./screens/home-conn.js";
import BandsListStack from "./screens/bands-list-nav.js";
// import Appearances from "./screens/appearances-day-stage-nav.js";
import Appearances from "./screens/appearances-nav.js";
import StagesListStack from "./screens/stages-list-nav.js";
import ContactUs from "./screens/contactus-conn.js";

BandsListStack.navigationOptions = {
  tabBarLabel: "Me Bands"
};
StagesListStack.navigationOptions = {
  tabBarLabel: "Me Stages",
  tabBarIcon: ({ tintColor }) => <StagesTabIcon tintColor={tintColor} />
};

const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: Home
  },
  BandsList: {
    screen: BandsListStack
  },
  Appearances: { screen: Appearances },
  Stages: {
    screen: StagesListStack
  },
  ContactUs: {
    screen: ContactUs
  }
});

/*
const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home
    },
    BandsList: {
      screen: BandsList
    },
    Appearances: { screen: Appearances },
    Stages: {
      screen: StagesList
    },
    ContactUs: {
      screen: ContactUs
    }
  },
  {
    // animationEnabled: true,
    initialRouteName: "Home",
    lazy: false,
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: tabNavStyles.icon.activeTintColor
    }
  }
);*/

class HomeNav extends Component {
  render() {
    // if (this.state.loading) {
    //   return (
    //     <Root>
    //       <AppLoading />
    //     </Root>
    //   );
    // }
    return (
      <Root>
        <AppNavigator />
      </Root>
    );
  }
}

export default HomeNav;
