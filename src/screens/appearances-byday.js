import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Platform, SectionList, StyleSheet, View } from "react-native";
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

class AppearancesByDay extends PureComponent {
  getAppearanceLines = lineData => {
    const itemsLength = lineData.length;
    const { favourites, showOnlyFavourites } = this.props;
    let isFavourite, lineStyle;
    return lineData.map((lineMember, index) => {
      isFavourite = favourites.indexOf(lineMember.bandId) > -1;
      lineStyle = {
        // Don't remove.  It's updated later.
        // justifyContent: "space-around",
        // height: 35,
        // alignContent: "flex-start",
        // alignItems: "flex-start",
        // borderWidth: 1,
        // borderColor: "black"
      };
      if (itemsLength === index + 1) {
        lineStyle.borderBottomWidth = 0;
      }

      if (!showOnlyFavourites || isFavourite) {
        return (
          <ListItem
            auto
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
                marginTop: -10,
                marginBottom: -10,
                flex: 20,
                margin: 0
                // borderColor: "red",
                // borderWidth: 1
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: 80
                  // borderColor: "green",
                  // borderWidth: 1
                }}
              >
                {`${format(lineMember.dateTimeStart, "HH:mm")}-${format(
                  lineMember.dateTimeEnd,
                  "HH:mm"
                )} `}
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
                {lineMember.stageName}
              </Text>
            </Left>

            <Right
              style={{
                marginTop: -10,
                marginBottom: -10,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 10,
                margin: 0
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
                marginTop: -10,
                marginBottom: -10,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 16,
                margin: 0
                // borderColor: "red",
                // borderWidth: 1
              }}
            >
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        );
      }
      return null;
    });
  };

  getAppearancesListDayLevel = groupedDayData =>
    groupedDayData.map(dayMember => {
      // console.log("dayMember:");
      // console.log(dayMember);
      return [
        <ListItem itemDivider key={dayMember.key}>
          <Text style={{ fontWeight: "bold" }}>{dayMember.key}</Text>
        </ListItem>,
        <View key={`${dayMember.key}-lineswrapper`} style={{ marginBottom: 5 }}>
          {this.getAppearanceLines(dayMember.data)}
        </View>
      ];
    });

  render() {
    const {
      // appearancesList,
      fetchStatus,
      // filterAppearancesByBandId,
      // groupAppearancesByDay,
      // favourites,
      // showOnlyFavourites,
      // reverseTimesOrder,
      appearancesSelGroupedByDay
    } = this.props;

    console.log("AppearancesByDay..appearancesSelGroupedByDay");
    console.log(appearancesSelGroupedByDay);
    //
    // const { sideMenuOpen } = this.state;

    // console.log("appearances-byday.js, appearances:");
    // const bandFilterArray = showOnlyFavourites ? favourites : [];
    // console.log("appearances-byday.js, appearances:");
    // console.log(appearancesList);

    // let appearances = [...appearancesList];
    // if (showOnlyFavourites) {
    //   appearances = filterAppearancesByBandId(appearancesList, favourites);
    // }
    // console.log("Filtered (or not) appearances:");
    // console.log(appearances);

    // console.log(
    //   "AppearancesByDay render(), reverseTimesOrder: " +
    //     reverseTimesOrder +
    //     ", appearancesSelGroupedByDay"
    // );
    // console.log(appearancesSelGroupedByDay);
    // console.log("groupAppearancesByDay()");
    // console.log(groupAppearancesByDay());

    // const appearancesSelGroupedByDay = groupAppearancesByDay(appearances, reverseTimesOrder);

    const styles = StyleSheet.create({
      SectionHeaderStyle: {
        backgroundColor: "#CDDC39",
        fontSize: 20,
        padding: 5,
        color: "#fff"
      },

      SectionListItemStyle: {
        fontSize: 15,
        padding: 5,
        color: "#000",
        backgroundColor: "#F5F5F5"
      }
    });

    const A = ["Apple", "Apricot", "Avocado"];
    const B = [
      "Banana",
      "Blackberry",
      "Blackcurrant",
      "Blueberry",
      "Boysenberry"
    ];
    const C = ["Cherry", "Coconut"];

    return (
      <View style={{ marginTop: Platform.OS == "ios" ? 20 : 0 }}>
        <SectionList
          sections={[
            { title: "Fruits Name From A", data: A },

            { title: "Fruits Name From B", data: B },

            { title: "Fruits Name From C", data: C }
          ]}
          renderSectionHeader={({ section }) => (
            <Text style={styles.SectionHeaderStyle}> {section.title} </Text>
          )}
          renderItem={({ item }) => (
            <Text style={styles.SectionListItemStyle}> {item} </Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

/*

    return (
      <Content style={{ backgroundColor: "#fff" }}>
        {fetchStatus === "fetching" && <Spinner />}
        <List>
          {this.getAppearancesListDayLevel(appearancesSelGroupedByDay)}
        </List>
      </Content>
    );

    return (
      <View style={{ marginTop: Platform.OS === "ios" ? 20 : 0 }}>
        <SectionList
          sections={dataObj}
          renderSectionHeader={({ section }) => (
            <Text style={styles.SectionHeaderStyle}> {section.key} </Text>
          )}
          renderItem={({ item }) => (
            <Text style={styles.SectionListItemStyle}>
              {" "}
              {item.bandName} {item.dateTimeStart} {item.stageName}
            </Text>
          )}
          keyExtractor={(item, index) => item.id}
          stickySectionHeadersEnabled={true}
        />
      </View>
    );
 */

AppearancesByDay.propTypes = {
  // appearancesView: PropTypes.string.isRequired,
  // appearancesSideMenuVisible: PropTypes.bool.isRequired,
  // appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  appearancesSelGroupedByDay: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchStatus: PropTypes.string.isRequired,
  // filterAppearancesByBandId: PropTypes.func.isRequired,
  // groupAppearancesByDay: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  navigation: PropTypes.object.isRequired,
  // setShowOnlyFavourites: PropTypes.func.isRequired,
  // setShowAppearancesSideMenu: PropTypes.func.isRequired,
  // setShowAppearancesView: PropTypes.func.isRequired,
  showOnlyFavourites: PropTypes.bool.isRequired
  // reverseTimesOrder: PropTypes.bool.isRequired
};

export default AppearancesByDay;
