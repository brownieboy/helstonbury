// import { StackNavigator as stackNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation";

import AppearancesConn from "./appearances-conn.js";
import BandCard from "./band-schedule-card-conn.js";

const AppearancesNavigator = createStackNavigator(
  {
    Appearances: {
      screen: AppearancesConn
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

export default AppearancesNavigator;
