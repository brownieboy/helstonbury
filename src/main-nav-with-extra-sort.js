import React, { Component } from "react";
// import { StackNavigator as stackNavigator } from "react-navigation";
import { TabNavigator as tabNavigator } from "react-navigation";
// import { Root } from "native-base";

// Screens
import Home from "./screens/home.js";
import BandsList from "./screens/bands-list.js";
import Stages from "./screens/stages.js";

// Data - this should all go in Redux, but for now...
import bandsListData from "./data/bandslist-data.js";
import appearancesListData from "./data/appearances-data.js";
import stagesListData from "./data/stages-data.js";

// Styles
import tabNavStyles from "./styles/tab-navigator-styles.js";

const mainData = {
  bandsList: bandsListData.bandsList,
  appearancesList: appearancesListData.appearances,
  stagesList: stagesListData.stages
};

// console.log("mainData=" + JSON.stringify(mainData, null, 4));

// Denormalise data into one big array of appearances
const appearancesDenormalised = mainData.appearancesList.map(appearance => {
  const matchingStage = mainData.stagesList.find(
    element => element.id === appearance.stageId
  );
  appearance.stage = matchingStage;
  const matchingBand = mainData.bandsList.find(
    element => element.id === appearance.bandId
  );
  appearance.band = matchingBand;
  return appearance;
});

// console.log(
//   "appearancesDenormalised=" + JSON.stringify(appearancesDenormalised, null, 4)
// );

const sortedData = appearancesDenormalised
  .slice()
  .sort((a, b) => a.stage.sortOrder - b.stage.sortOrder || new Date(a.dateTimeStart) - new Date(b.dateTimeStart));

// console.log(
//   "sortedData=" + JSON.stringify(sortedData, null, 4)
// );


/*
const sortedDateTimes = dateTimes
  .filter(value => value.sortOrder) // Filter creates new array, so no .slice()
  .sort(
    (a, b) =>
      a.sortOrder - b.sortOrder ||
      (a.dateTime && b.dateTime
        ? new Date(a.dateTime) - new Date(b.dateTime)
        : 1)
  );

console.log(`dateTimes=${JSON.stringify(dateTimes, null, 4)}`);
console.log(`sortedDateTimes=${JSON.stringify(sortedDateTimes, null, 4)}`);
 */

/*
const SimpleTabs = TabNavigator({
  Home: {
    screen: MyHomeScreen,
    path: '',
  },
  People: {
    screen: MyPeopleScreen,
    path: 'cart',
  },
  Chat: {
    screen: MyChatScreen,
    path: 'chat',
  },
  Settings: {
    screen: MySettingsScreen,
    path: 'settings',
  },
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
  },
});
*/

const AppNavigator = tabNavigator(
  {
    Home: {
      screen: Home
    },
    BandsList: {
      screen: BandsList
    },
    Stages: {
      screen: Stages
    }
  },
  {
    initialRouteName: "Home",
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: true,
      activeTintColor: tabNavStyles.icon.activeTintColor
    }
  }
);

/*
const AppNavigator = stackNavigator(
  {
    Home: {
      screen: Home
    },
    BandsList: {
      screen: BandsList
    },
    BandCard: {
      screen: BandCard
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);
*/

class HomeNav extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { loading: true };
  // }

  // async componentWillMount() {
  //   await Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
  //   });
  //   this.setState({ loading: false });
  // }

  render() {
    // if (this.state.loading) {
    //   return (
    //     <Root>
    //       <AppLoading />
    //     </Root>
    //   );
    // }
    return <AppNavigator screenProps={{ mainData }} />;
  }
}

export default HomeNav;
