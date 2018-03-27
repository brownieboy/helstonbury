import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { format } from "date-fns";

import {
  // Container,
  // Header,
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

import FavouritesListIcon from "../components/favourites-list-icon.js";

class AppearancesByDayStage extends Component {
  getAppearanceLines = lineData => {
    const itemsLength = lineData.length;
    const favourites = this.props.favourites;
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
      appearancesList,
      filterAppearancesByBandId,
      groupAppearancesByDayStage,
      favourites,
      showOnlyFavourites,
      appearancesListByDateTime,
      appearancesGroupedByDayThenStage
    } = this.props;

    let appearances = [...appearancesList];
    if (showOnlyFavourites) {
      appearances = filterAppearancesByBandId(appearancesList, favourites);
    }
    // console.log("Filtered (or not) appearances:");
    // console.log(appearances);

    const appearancesGroupedByDayStage = groupAppearancesByDayStage(
      appearances
    );

    return (
      <Content padder>
        <Content style={{ backgroundColor: "#fff" }}>
          {appearances.length > 0 ? (
            <List>
              {this.getAppearancesListDayLevel(appearancesGroupedByDayStage)}
            </List>
          ) : (
            <Spinner />
          )}
        </Content>
      </Content>
    );
  }
}

AppearancesByDayStage.propTypes = {
  appearancesListByDateTime: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
  appearancesGroupedByDayThenStage: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  favourites: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

export default AppearancesByDayStage;
