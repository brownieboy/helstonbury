import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Segment } from "native-base";
// import IconMaterial from "react-native-vector-icons/MaterialIcons";
// import Icon from "react-native-vector-icons";
// import { format } from "date-fns";

import { Platform } from "react-native";

import {
  Container,
  Header,
  Icon,
  // Title,
  Left,
  Text,
  Right,
  Body
} from "native-base";

import ScheduleTabIcon from "../components/schedule-tab-icon.js";
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

  render() {
    const {
      appearancesList,
      filterAppearancesByBandId,
      groupAppearancesByDay,
      groupAppearancesByDayStage,
      favourites,
      navigation
    } = this.props;

    const { showOnlyFavourites } = this.state;

    const sharedChildProps = {
      appearancesList,
      filterAppearancesByBandId,
      groupAppearancesByDay,
      groupAppearancesByDayStage,
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

    // console.log("appearances..render, appearancesGroupedByDay:");
    // console.log(appearancesGroupedByDay);

    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Segment>
              <Button
                first
                active={this.state.activeTab === "byDay"}
                onPress={() => {
                  this.handleSegmentButtonPress("byDay");
                }}
              >
                <Text>by Day</Text>
              </Button>
              <Button
                last
                active={this.state.activeTab === "byStage"}
                onPress={() => {
                  this.handleSegmentButtonPress("byStage");
                }}
              >
                <Text>by Stage</Text>
              </Button>
            </Segment>
          </Body>
          <Right>
            <Button transparent>
              <Icon
                name={showOnlyFavourites ? heart : heartOutline}
                onPress={this.handleShowFavouritesPress}
              />
            </Button>
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