import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Segment } from "native-base";
// import IconMaterial from "react-native-vector-icons/MaterialIcons";
// import Icon from "react-native-vector-icons";
// import { format } from "date-fns";

import { Platform } from "react-native";
import SideMenu from "react-native-side-menu";

import {
  Container,
  Header,
  Icon,
  Title,
  Left,
  Right,
  Body
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

class Appearances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAppearancesScreen: "day",
      showOnlyFavourites: false,
      appearancesSideMenuVisible: false
    };
  }

  static navigationOptions = {
    tabBarLabel: "Schedule",
    tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  };

  handleSetActiveAppearanceScreen = activeAppearancesScreen => {
    this.setState({ activeAppearancesScreen });
  };

  handleShowFavouritesPress = () => {
    const newStatus = !this.state.showOnlyFavourites;
    this.setState({ showOnlyFavourites: newStatus });
  };

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
      groupAppearancesByDay,
      groupAppearancesByDayStage,
      favourites,
      navigation
    } = this.props;

    const {
      activeAppearancesScreen,
      appearancesSideMenuVisible,
      showOnlyFavourites
    } = this.state;
    console.log("activeAppearancesScreen=" + activeAppearancesScreen);

    const sharedChildProps = {
      appearancesList,
      appearancesView,
      appearancesSideMenuVisible,
      fetchStatus,
      filterAppearancesByBandId,
      groupAppearancesByDay,
      favourites,
      navigation,
      showOnlyFavourites
    };

    let heart = "ios-heart";
    let heartOutline = "ios-heart-outline";
    if (Platform.OS === "android") {
      heart = "md-heart";
      heartOutline = "md-heart-outline";
    }

    const menu = (
      <Menu
        closeSideMenu={this.closeSideMenu}
        activeAppearancesScreen={activeAppearancesScreen}
        handleSetActiveAppearanceScreen={this.handleSetActiveAppearanceScreen}
        setShowOnlyFavourites={this.handleShowFavouritesPress}
        navigation={navigation}
        showOnlyFavourites={showOnlyFavourites}
      />
    );

    // console.log("appearances..render, appearancesGroupedByDay:");
    // console.log(appearancesGroupedByDay);

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
            <Left>
              <HelstonburyAvatar />
            </Left>
            <Body>
              <Title>Scheduleby {activeAppearancesScreen}</Title>
            </Body>
            <Right>
              <Icon
                ios="ios-options"
                android="md-options"
                style={optionsButtonStyles}
                onPress={this.toggleSideMenu}
              />
            </Right>
          </Header>
          {this.state.activeAppearancesScreen === "stage" ? (
            <AppearancesByDayStage
              {...sharedChildProps}
              groupAppearancesByDayStage={groupAppearancesByDayStage}
            />
          ) : (
            <AppearancesByDay
              {...sharedChildProps}
              groupAppearancesByDay={groupAppearancesByDay}
            />
          )}
        </Container>
      </SideMenu>
    );
  }
}

Appearances.propTypes = {
  appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  filterAppearancesByBandId: PropTypes.func.isRequired,
  groupAppearancesByDayStage: PropTypes.func.isRequired,
  groupAppearancesByDay: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  navigation: PropTypes.object.isRequired
};

export default Appearances;
