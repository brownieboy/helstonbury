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
  Text,
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

class Appearances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "byDay",
      showOnlyFavourites: false
    };
  }

  static navigationOptions = {
    tabBarLabel: "Schedule",
    tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  };

  handleSegmentButtonPress = activeTab => {
    this.setState({ activeTab });
  };

  handleShowFavouritesPress = () => {
    const newStatus = !this.state.showOnlyFavourites;
    this.setState({ showOnlyFavourites: newStatus });
  };

  closeSideMenu = () => {
    this.props.setShowAppearancesSideMenu(false);
  };

  render() {
    const {
      appearancesList,
      appearancesView,
      appearancesSideMenuVisible,
      fetchStatus,
      filterAppearancesByBandId,
      groupAppearancesByDay,
      groupAppearancesByDayStage,
      favourites,
      navigation,
      setShowAppearancesView,
      setShowAppearancesSideMenu,
      setShowOnlyFavourites,
      showOnlyFavourites
    } = this.props;

    const { activeTab } = this.state;
    console.log("activeTab=" + activeTab);

    const sharedChildProps = {
      appearancesList,
      appearancesView,
      appearancesSideMenuVisible,
      fetchStatus,
      filterAppearancesByBandId,
      groupAppearancesByDay,
      favourites,
      navigation,
      setShowAppearancesView,
      setShowAppearancesSideMenu,
      setShowOnlyFavourites,
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
        currentAppearancesView={appearancesView}
        handleSetAppearancesView={setShowAppearancesView}
        setShowOnlyFavourites={setShowOnlyFavourites}
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
        onChange={isOpen =>
          isOpen === appearancesSideMenuVisible &&
          setShowAppearancesSideMenu(isOpen)
        }
      >
        <Container style={styles.container}>
          <Header>
            <Left>
              <HelstonburyAvatar />
            </Left>
            <Body>
              <Title>Schedule by Day</Title>
            </Body>
            <Right>
              <Icon
                ios="ios-options"
                android="md-options"
                onPress={this.toggleSideMenu}
              />
            </Right>
          </Header>
          {this.state.activeTab === "byStage" ? (
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
