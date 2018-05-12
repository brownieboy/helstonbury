import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { format } from "date-fns";

import {
  Button,
  Container,
  Header,
  Icon,
  Title,
  Left,
  Content,
  List,
  ListItem,
  Text,
  Right,
  Body,
  // Segment,
  Spinner
} from "native-base";

import FavouritesListIcon from "../components/favourites-list-icon.js";
import NoAppearancesToDisplayMessage from "../components/no-appearances-todisplay-message.js";

// ${lineMember.name}:

class AppearancesByDay extends Component {
  getAppearanceLines = lineData => {
    const itemsLength = lineData.length;
    const favourites = this.props.favourites;
    return lineData.map((lineMember, index) => {
      const lineStyle = {
        justifyContent: "space-between",
        margin: 0,
        padding: 0,
        height: 35
        // borderWidth: 1,
        // borderColor: "black"
      };
      if (itemsLength === index + 1) {
        lineStyle.borderBottomWidth = 0;
      }
      return (
        <ListItem
          key={lineMember.id}
          onPress={() => {
            this.props.navigation.navigate("BandScheduleCard", {
              bandId: lineMember.bandId,
              parentList: "by Day"
            });
          }}
          style={lineStyle}
        >
          <Left
            style={{
              flex: 20
              // borderColor: "red",
              //  borderWidth: 1
            }}
          >
            <Text
              style={{
                fontSize: 12,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 40
                // borderColor: "green",
                // borderWidth: 1
              }}
            >
              {`${format(lineMember.dateTimeStart, "HH:mm")}:`}
            </Text>
            <Text
              style={{
                fontSize: 14,
                flexWrap: "wrap",
                flex: 13
                // borderColor: "blue",
                // borderWidth: 1
              }}
            >
              {lineMember.bandName}
            </Text>
            <Text
              style={{
                fontSize: 10,
                flexWrap: "wrap",
                flex: 7
                // borderColor: "orange",
                // borderWidth: 1,
              }}
            >
              ({lineMember.stageName})
            </Text>
          </Left>

          <Right
            style={{
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: 10
              // borderColor: "purple",
              // borderWidth: 1
            }}
          >
            {favourites.indexOf(lineMember.bandId) > -1 ? (
              <FavouritesListIcon style={{ fontSize: 12, width: 12 }} />
            ) : (
              <FavouritesListIcon
                style={{ fontSize: 12, width: 12, color: "transparent" }}
              />
            )}
          </Right>
          <Right
            style={{
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: 12
              // borderColor: "red",
              //  borderWidth: 1
            }}
          >
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    });
  };

  getAppearancesListDayLevel = groupedDayData =>
    groupedDayData.map(dayMember => {
      console.log("dayMember:");
      console.log(dayMember);
      return [
        <ListItem itemDivider key={dayMember.key}>
          <Text style={{ fontWeight: "bold" }}>{dayMember.key}</Text>
        </ListItem>,
        <View key={`${dayMember.key}-lineswrapper`} style={{ marginBottom: 5 }}>
          {this.getAppearanceLines(dayMember.values)}
        </View>
      ];
    });

  render() {
    const {
      appearancesList,
      fetchStatus,
      filterAppearancesByBandId,
      groupAppearancesByDay,
      favourites,
      showOnlyFavourites
    } = this.props;

    console.log("AppearancesByDay render()");
    //
    // const { sideMenuOpen } = this.state;

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
      <Content style={{ backgroundColor: "#fff" }}>
        {fetchStatus === "fetching" && <Spinner />}
        {appearances.length > 0 ? (
          <List>
            {this.getAppearancesListDayLevel(appearancesGroupedByDay)}
          </List>
        ) : (
          <NoAppearancesToDisplayMessage
            showOnlyFavourites={showOnlyFavourites}
          />
        )}
      </Content>
    );
  }
}

/*
            {fetchStatus === "fetching" && <Spinner />}

*/

AppearancesByDay.propTypes = {
  // appearancesView: PropTypes.string.isRequired,
  // appearancesSideMenuVisible: PropTypes.bool.isRequired,
  appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  fetchStatus: PropTypes.string.isRequired,
  filterAppearancesByBandId: PropTypes.func.isRequired,
  groupAppearancesByDay: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  navigation: PropTypes.object.isRequired,
  // setShowOnlyFavourites: PropTypes.func.isRequired,
  // setShowAppearancesSideMenu: PropTypes.func.isRequired,
  // setShowAppearancesView: PropTypes.func.isRequired,
  showOnlyFavourites: PropTypes.bool.isRequired
};

export default AppearancesByDay;
