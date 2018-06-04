import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Button, Segment } from "native-base";
// import IconMaterial from "react-native-vector-icons/MaterialIcons";
// import Icon from "react-native-vector-icons";
// import { format } from "date-fns";

import { Platform } from "react-native";
import SideMenu from "react-native-side-menu";

import {
  Button,
  Container,
  Header,
  Icon,
  Text,
  Title,
  Left,
  Right,
  Body,
  Segment
} from "native-base";

import Menu from "../components/appearances-side-menu.js";
import ScheduleTabIcon from "../components/schedule-tab-icon.js";
import HelstonburyAvatar from "../components/helstonbury-avatar.js";
// import FavouritesListIcon from "../components/favourites-list-icon.js";

import AppearancesByDay from "./appearances-byday.js";
import AppearancesByDayStage from "./appearances-bydaystage.js";

import styles from "../styles/band-card-styles.js";
// import tabNavStyles from "../styles/tab-navigator-styles.js";

const optionsButtonStyles =
  Platform.OS === "android" ? { color: "white" } : null;

class AppearancesWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // activeAppearancesScreen: "day",
      // showOnlyFavourites: false,
      appearancesSideMenuVisible: false
    };
  }

  static navigationOptions = {
    tabBarLabel: "Schedule",
    tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  };

  handleSetActiveAppearanceScreen = activeAppearancesScreen => {
    // this.setState({ activeAppearancesScreen });
    const { setShowAppearancesView } = this.props;
    setShowAppearancesView(activeAppearancesScreen);
  };

  handleShowFavouritesPress = () => {
    // const newStatus = !this.state.showOnlyFavourites;
    // this.setState({ showOnlyFavourites: newStatus });
    const { setShowOnlyFavourites, showOnlyFavourites } = this.props;
    setShowOnlyFavourites(!showOnlyFavourites);
  };

  // handleDayStagePress = dayStage => {
  //   // console.log("handleDayStagePress, dayStage=" + dayStage);
  //   // const {
  //   //   navigation
  //   //   // onItemSelected
  //   // } = this.props;
  //   // const navigateTo =
  //   //   dayStage === "stage" ? "AppearancesByDayStage" : "AppearancesByDay";
  //   // this.setState({ currentAppearancesView: dayStage });
  //   this.handleSetActiveAppearanceScreen(dayStage);
  //   // navigation.navigate(navigateTo);
  // };

  closeSideMenu = () => {
    this.setState({ appearancesSideMenuVisible: false });
  };

  toggleSideMenu = () => {
    const { appearancesSideMenuVisible } = this.state;
    this.setState({ appearancesSideMenuVisible: !appearancesSideMenuVisible });
  };

  render() {
    const {
      appearancesList,
      appearancesView,
      fetchStatus,
      filterAppearancesByBandId,
      getStageInfo,
      groupAppearancesByDay,
      groupAppearancesByDayStage,
      favourites,
      navigation,
      reverseTimesOrder,
      appearancesSelGroupedByDay,
      setReverseTimesOrder,
      showOnlyFavourites
    } = this.props;

    const {
      // activeAppearancesScreen,
      appearancesSideMenuVisible
      // showOnlyFavourites
    } = this.state;
    // console.log("appearanceswrapper.js, reverseTimesOrder=" + reverseTimesOrder);

    const sharedChildProps = {
      appearancesList,
      appearancesView,
      appearancesSideMenuVisible,
      fetchStatus,
      filterAppearancesByBandId,
      getStageInfo,
      groupAppearancesByDay,
      favourites,
      navigation,
      showOnlyFavourites,
      reverseTimesOrder
    };

    // console.log("appearanceswrapper.js, appearancesView:" + appearancesView);

    // let heart = "ios-heart";
    // let heartOutline = "ios-heart-outline";
    // if (Platform.OS === "android") {
    //   heart = "md-heart";
    //   heartOutline = "md-heart-outline";
    // }

    const menu = (
      <Menu
        closeSideMenu={this.closeSideMenu}
        activeAppearancesScreen={appearancesView}
        // handleSetActiveAppearanceScreen={this.handleSetActiveAppearanceScreen}
        setShowOnlyFavourites={this.handleShowFavouritesPress}
        navigation={navigation}
        showOnlyFavourites={showOnlyFavourites}
        reverseTimesOrder={reverseTimesOrder}
        setReverseTimesOrder={setReverseTimesOrder}
      />
    );

    // console.log("appearances..render, appearancesGroupedByDay:");
    // console.log(appearancesGroupedByDay);

    /*
              <Title>
                Schedule{" "}
                {appearancesView === "day" ? "Times" : "Times by Stage"}
              </Title>

                            <Segment
                style={{ margin: 0, padding: 0, borderColor: "green", borderWidth: 1 }}
              >
                <Button first>
                  <Text>Day/Stage</Text>
                </Button>
                <Button last>
                  <Text>Day</Text>
                </Button>
              </Segment>
 */

    return (
      <SideMenu
        menu={menu}
        menuPosition="right"
        isOpen={appearancesSideMenuVisible}
        // onChange={isOpen =>
        //   isOpen === appearancesSideMenuVisible &&
        //   setShowAppearancesSideMenu(isOpen)
        // }
      >
        <Container style={styles.container}>
          <Header>
            <Left style={{ flex: 1 }}>
              <HelstonburyAvatar />
            </Left>
            <Segment style={{ marginTop: 3 }}>
              <Button
                first
                active={appearancesView === "stage"}
                onPress={() => this.handleSetActiveAppearanceScreen("stage")}
              >
                <Text>Day/Stage</Text>
              </Button>
              <Button
                last
                active={appearancesView === "day"}
                onPress={() => this.handleSetActiveAppearanceScreen("day")}
              >
                <Text>Day</Text>
              </Button>
            </Segment>
            <Right style={{ flex: 1 }}>
              <Icon
                ios="ios-options"
                android="md-options"
                style={optionsButtonStyles}
                onPress={this.toggleSideMenu}
              />
            </Right>
          </Header>
          {appearancesView === "stage" ? (
            <AppearancesByDayStage
              {...sharedChildProps}
              groupAppearancesByDayStage={groupAppearancesByDayStage}
            />
          ) : (
            <AppearancesByDay
              {...sharedChildProps}
              groupAppearancesByDay={groupAppearancesByDay}
              appearancesSelGroupedByDay={appearancesSelGroupedByDay}
            />
          )}
        </Container>
      </SideMenu>
    );
  }
}

AppearancesWrapper.propTypes = {
  appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  appearancesSelGroupedByDay: PropTypes.arrayOf(PropTypes.object).isRequired,
  appearancesView: PropTypes.string.isRequired,
  fetchStatus: PropTypes.string.isRequired,
  filterAppearancesByBandId: PropTypes.func.isRequired,
  getStageInfo: PropTypes.func.isRequired,
  groupAppearancesByDayStage: PropTypes.func.isRequired,
  groupAppearancesByDay: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  navigation: PropTypes.object.isRequired,
  reverseTimesOrder: PropTypes.bool.isRequired,
  setReverseTimesOrder: PropTypes.func.isRequired,
  setShowAppearancesView: PropTypes.func.isRequired,
  setShowOnlyFavourites: PropTypes.func.isRequired,
  showOnlyFavourites: PropTypes.bool.isRequired
};

export default AppearancesWrapper;
