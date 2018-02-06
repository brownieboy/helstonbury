import { StackNavigator as stackNavigator } from "react-navigation";

import AppearancesConn from "./appearances-conn.js";
import BandCard from "./band-card.js";

const AppearancesNavigator = stackNavigator(
  {
    Appearances: {
      screen: AppearancesConn
    },
    BandCard: {
      screen: BandCard
    }
  },
  {
    initialRouteName: "Appearances",
    headerMode: "none"
  }
);

export default AppearancesNavigator;
