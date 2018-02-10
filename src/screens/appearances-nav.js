import { StackNavigator as stackNavigator } from "react-navigation";

import AppearancesConn from "./appearances-conn.js";
import BandCard from "./band-schedule-card-conn.js";

const AppearancesNavigator = stackNavigator(
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
