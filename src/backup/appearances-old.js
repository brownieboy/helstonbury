import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Segment } from "native-base";
// import IconMaterial from "react-native-vector-icons/MaterialIcons";
// import Icon from "react-native-vector-icons";
import { format } from "date-fns";

import { View } from "react-native";

import {
  Container,
  Header,
  Icon,
  // Title,
  Left,
  Content,
  List,
  ListItem,
  Text,
  Right,
  Body,
  Spinner
} from "native-base";

import ScheduleTabIcon from "../components/schedule-tab-icon.js";
import FavouritesListIcon from "../components/favourites-list-icon.js";

import styles from "../styles/band-card-styles.js";
// import tabNavStyles from "../styles/tab-navigator-styles.js";

class Appearances extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "byDay"
    };
  }

  static navigationOptions = {
    tabBarLabel: "Schedule",
    tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  };

  handleSegmentButtonPress = activeTab => {
    this.setState({ activeTab });
  };

  getAppearanceLines = lineData => {
    const itemsLength = lineData.length;
    const favourites = this.props.favouritesState.favourites;
    return lineData.map((lineMember, index) => {
      const lineStyle = { height: 40 };
      if (itemsLength === index + 1) {
        lineStyle.borderBottomWidth = 0;
      }
      return (
        <ListItem
          key={lineMember.id}
          onPress={() =>
            this.props.navigation.navigate("BandScheduleCard", {
              bandId: lineMember.bandId,
              parentList: "schedule"
            })
          }
          style={lineStyle}
        >
          <Left>
            <Text style={{ fontSize: 14 }}>{`${lineMember.name}: ${format(
              lineMember.dateTimeStart,
              "HH:mm"
            )}-${format(lineMember.dateTimeEnd, "HH:mm")}`}</Text>
          </Left>
          {favourites.indexOf(lineMember.bandId) > -1 ? (
            <FavouritesListIcon />
          ) : null}
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    });
  };

  getAppearancesStageLevel = groupedStageData =>
    groupedStageData.map(stageMember => [
      <ListItem itemDivider key={stageMember.key}>
        <Text>{stageMember.key.split("~")[1]}</Text>
      </ListItem>,
      <View key={`${stageMember.key}-lineswrapper`}>
        {this.getAppearanceLines(stageMember.values)}
      </View>
    ]);

  getAppearancesListDayLevel = groupedDayData =>
    groupedDayData.map(dayMember => [
      <ListItem key={dayMember.key}>
        <Text style={{ fontWeight: "bold" }}>
          {dayMember.key.toUpperCase()}
        </Text>
      </ListItem>,
      <View key={`${dayMember.key}-stagewrapper`} style={{ marginBottom: 20 }}>
        {this.getAppearancesStageLevel(dayMember.values)}
      </View>
    ]);

  getAppearancesListItems = appearancesList =>
    appearancesList.map(appearanceMember => {
      const { dateTimeStart, bandId, name, stageName } = appearanceMember;
      return (
        <ListItem key={`${bandId}${dateTimeStart}`}>
          <Body>
            <Text>{name}</Text>
            <Text numberOfLines={1} note>
              Appear: {`${dateTimeStart || "???"} - ${stageName}`}
            </Text>
          </Body>
        </ListItem>
      );
    });

  render() {
    const {
      appearancesListByDateTime,
      appearancesGroupedByDay,
      appearancesGroupedByDayThenStage
    } = this.props;
    console.log("appearances..render, appearancesGroupedByDay:");
    console.log(appearancesGroupedByDay);

    // console.log(
    //   "appearancesGroupedByDayThenStage=" +
    //     JSON.stringify(appearancesGroupedByDayThenStage, null, 4)
    // );
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
          <Right />
        </Header>

        <Content padder>
          <Content style={{ backgroundColor: "#fff" }}>
            {appearancesListByDateTime.length > 0 ? (
              <List>
                {this.getAppearancesListDayLevel(
                  appearancesGroupedByDayThenStage
                )}
              </List>
            ) : (
              <Spinner />
            )}
          </Content>
        </Content>
      </Container>
    );
  }
}

Appearances.propTypes = {
  appearancesListByDateTime: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
  appearancesGroupedByDayThenStage: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  favouritesState: PropTypes.object.isRequired,

  navigation: PropTypes.object.isRequired
};

export default Appearances;
