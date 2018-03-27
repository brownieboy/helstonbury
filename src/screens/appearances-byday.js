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

// ${lineMember.name}:

class AppearancesByDay extends Component {
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
            <Text style={{ fontSize: 14 }}>{`${format(
              lineMember.dateTimeStart,
              "HH:mm"
            )}-${format(lineMember.dateTimeEnd, "HH:mm")}: `}</Text>
            <Text style={{ fontSize: 16 }}>{lineMember.name}</Text>
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

  getAppearancesListDayLevel = groupedDayData =>
    groupedDayData.map(dayMember => [
      <ListItem itemDivider key={dayMember.key}>
        <Text style={{ fontWeight: "bold" }}>
          {dayMember.key.toUpperCase()}
        </Text>
      </ListItem>,
      <View key={`${dayMember.key}-stagewrapper`} style={{ marginBottom: 20 }}>
        {this.getAppearanceLines(dayMember.values)}
      </View>
    ]);

  render() {
    const {
      appearancesList,
      filterAppearancesByBandId,
      groupAppearancesByDay,
      favourites,
      showOnlyFavourites
    } = this.props;

    // console.log("appearances-byday.js, appearances:");
    // const bandFilterArray = showOnlyFavourites ? favourites : [];
    // console.log("appearances-byday.js, appearances:");
    // console.log(appearancesList);

    let appearances = [...appearancesList];
    if (showOnlyFavourites) {
      appearances = filterAppearancesByBandId(appearancesList, favourites);
    }
    // console.log("Filtered (or not) appearances:");
    // console.log(appearances);

    const appearancesGroupedByDay = groupAppearancesByDay(appearances);

    return (
      <Content padder>
        <Content style={{ backgroundColor: "#fff" }}>
          {appearances.length > 0 ? (
            <List>
              {this.getAppearancesListDayLevel(appearancesGroupedByDay)}
            </List>
          ) : (
            <Spinner />
          )}
        </Content>
      </Content>
    );
  }
}

AppearancesByDay.propTypes = {
  appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  filterAppearancesByBandId: PropTypes.func.isRequired,
  groupAppearancesByDay: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  showOnlyFavourites: PropTypes.bool.isRequired,

  navigation: PropTypes.object.isRequired
};

export default AppearancesByDay;
