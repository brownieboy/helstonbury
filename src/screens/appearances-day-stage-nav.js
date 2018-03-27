import React, { Component } from "react";
import { TabNavigator as tabNavigator } from "react-navigation";
import { Content, Text } from "native-base";

// import AppearancesConn from "./appearances-conn.js";
// import BandCard from "./band-schedule-card-conn.js";

import ScheduleTabIcon from "../components/schedule-tab-icon.js";


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

const AppearancesDayStageNavigator = tabNavigator(
  {
    AppearancesByDay: {
      screen: AppearancesByDay
    },
    AppearancesByDayStage: {
      screen: AppearancesByDayStage
    }
  },
  {
    initialRouteName: "AppearancesByDay",
    headerMode: "none"
  }
);

export default AppearancesDayStageNavigator;
