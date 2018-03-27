import React, { Component } from "react";
import {
  TabNavigator as tabNavigator,
  StackNavigator as stackNavigator
} from "react-navigation";
import { Content, Text } from "native-base";

// import AppearancesConn from "./appearances-conn.js";
// import BandCard from "./band-schedule-card-conn.js";

import ScheduleTabIcon from "../components/schedule-tab-icon.js";
import {
  AppearancesByDayConn,
  AppearancesByDayStageConn
} from "./appearances-conn.js";
import BandCard from "./band-schedule-card-conn.js";

/*
const AppearancesByDayStage = () => (
  <Content>
    <Text>By Day/Stage</Text>
  </Content>
);

export class AppearancesByDay extends Component {
  static navigationOptions = {
    tabBarLabel: "Schedule",
    tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  };


  render() {
    return (
      <Content>
        <Text>By Day</Text>
      </Content>
    );
  }
}
*/

const AppearancesDayNav = stackNavigator(
  {
    Appearances: {
      screen: AppearancesByDayConn
    },
    BandScheduleCard: {
      screen: BandCard
    }
  },
  {
    initialRouteName: "Appearances",
    headerMode: "none"
  }
);

const AppearancesDayStageNav = stackNavigator(
  {
    Appearances: {
      screen: AppearancesByDayStageConn
    },
    BandScheduleCard: {
      screen: BandCard
    }
  },
  {
    initialRouteName: "Appearances",
    headerMode: "none"
  }
);

const AppearancesDayStageNavigator = tabNavigator(
  {
    AppearancesByDay: {
      screen: AppearancesDayNav
    },
    AppearancesByDayStage: {
      screen: AppearancesDayStageNav
    }
  },
  {
    initialRouteName: "AppearancesByDay",
    headerMode: "none"
  }
);

export default AppearancesDayStageNavigator;
