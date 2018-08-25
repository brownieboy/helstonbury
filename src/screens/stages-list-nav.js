// import { StackNavigator as stackNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation";

import StagesListConn from "./stages-list-conn.js";
import StageCard from "./stage-card-conn.js";

const StagesNavigator = createStackNavigator(
  {
    StagesList: {
      screen: StagesListConn
    },
    StageCard: {
      screen: StageCard
    }
  },
  {
    initialRouteName: "StagesList",
    headerMode: "none"
  }
);

export default StagesNavigator;
