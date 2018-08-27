import React, { Component } from "react";
import { Platform } from "react-native";
// import { TabNavigator as tabNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import { Root } from "native-base";

// Styles
import tabNavStyles from "./styles/tab-navigator-styles.js";

// Tab icons
import StagesTabIcon from "./components/stages-tab-icon.js";
import ScheduleTabIcon from "./components/schedule-tab-icon.js";
import BandsTabIcon from "./components/bands-tab-icon.js";

// Screens
import Home from "./screens/home-conn.js";
import BandsListStack from "./screens/bands-list-nav.js";
// import Appearances from "./screens/appearances-day-stage-nav.js";
import AppearancesListStack from "./screens/appearances-nav.js";
import StagesListStack from "./screens/stages-list-nav.js";
import ContactUs from "./screens/contactus-conn.js";

Home.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ tintColor }) => (
    <IconFontAwesome
      name="home"
      style={{ color: tintColor }}
      size={Platform.OS === "ios" ? 28 : 20}
    />
  )
};

BandsListStack.navigationOptions = {
  tabBarLabel: "Bands",
  tabBarIcon: ({ tintColor }) => <BandsTabIcon tintColor={tintColor} />
};

AppearancesListStack.navigationOptions = {
  tabBarLabel: "Schedule",
  tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
};

StagesListStack.navigationOptions = {
  tabBarLabel: "Stages",
  tabBarIcon: ({ tintColor }) => <StagesTabIcon tintColor={tintColor} />
};

ContactUs.navigationOptions = {
  tabBarLabel: "Info",
  tabBarIcon: ({ tintColor }) => (
    <MaterialCommunityIcons
      name="information"
      style={{ color: tintColor }}
      size={Platform.OS === "ios" ? 28 : 25}
    />
  )
};

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home
    },
    BandsList: {
      screen: BandsListStack
    },
    Appearances: { screen: AppearancesListStack },
    Stages: {
      screen: StagesListStack
    },
    ContactUs: {
      screen: ContactUs
    }
  },
  {
    // animationEnabled: true,
    initialRouteName: "Home",
    lazy: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: tabNavStyles.icon.activeTintColor
    }
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
