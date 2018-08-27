import React, { Component } from "react";
// import { TabNavigator as tabNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation";

import { Root } from "native-base";

// Styles
import tabNavStyles from "./styles/tab-navigator-styles.js";

import { Icon } from "native-base";
// Screens
import Home from "./screens/home-conn.js";
import BandsList from "./screens/bands-list-nav.js";
// import Appearances from "./screens/appearances-day-stage-nav.js";
import Appearances from "./screens/appearances-nav.js";
import StagesList from "./screens/stages-list-nav.js";
import ContactUs from "./screens/contactus-conn.js";

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home
    },
      // BandsList: {
      //   screen: BandsList
      // },
      // Appearances: { screen: Appearances },
      Stages: {
        screen: StagesList
      },
      // ContactUs: {
      //   screen: ContactUs
      // }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `tag${focused ? "" : "-outline"}`;
        } else if (routeName === "Favorites") {
          iconName = `heart${focused ? "" : "-outline"}`;
        } else {
          iconName = `account-box${focused ? "" : "-outline"}`;
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      },
      tabBarLabel: () => {
        const { routeName } = navigation.state;
        return routeName.toUpperCase();
      }
    })
  }
);

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
