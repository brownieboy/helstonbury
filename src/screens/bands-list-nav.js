import { StackNavigator as stackNavigator } from "react-navigation";

import BandsListConn from "./bands-list-conn.js";
import BandCard from "./band-card-conn.js";

const BandsNavigator = stackNavigator(
  {
    BandsList: {
      screen: BandsListConn
    },
    BandCard: {
      screen: BandCard
    }
  },
  {
    initialRouteName: "BandsList",
    headerMode: "none"
  }
);

export default BandsNavigator;
