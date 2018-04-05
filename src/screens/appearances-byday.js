import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { format } from "date-fns";
import SideMenu from "react-native-side-menu";

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
import ScheduleTabIcon from "../components/schedule-tab-icon.js";
import Menu from "../components/appearances-side-menu.js";
import HelstonburyAvatar from "../components/helstonbury-avatar.js";

// ${lineMember.name}:

class AppearancesByDay extends Component {
  static navigationOptions = {
    tabBarLabel: "by Day",
    tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     sideMenuOpen: false
  //   };
  // }

  toggleSideMenu = () => {
    const {
      appearancesSideMenuVisible,
      setShowAppearancesSideMenu
    } = this.props;
    setShowAppearancesSideMenu(!appearancesSideMenuVisible);
  };

  closeSideMenu = () => {
    this.props.setShowAppearancesSideMenu(false);
  };

  // updateMenuState = sideMenuOpen => {
  //   this.setState({ sideMenuOpen });
  // };

  // handleShowFavouritesPress = () => {
  //   const newStatus = !this.state.showOnlyFavourites;
  //   this.setState({ showOnlyFavourites: newStatus, sideMenuOpen: false });
  // };

  handleShowFavouritesPress = () => {
    const { showOnlyFavourites, setShowOnlyFavourites } = this.props;
    setShowOnlyFavourites(!showOnlyFavourites);
  };

  getAppearanceLines = lineData => {
    const itemsLength = lineData.length;
    const favourites = this.props.favourites;
    return lineData.map((lineMember, index) => {
      const lineStyle = {
        height: 35,
        justifyContent: "flex-start",
        margin: 0
      };
      if (itemsLength === index + 1) {
        lineStyle.borderBottomWidth = 0;
      }
      return (
        <ListItem
          key={lineMember.id}
          onPress={() =>
            this.props.navigation.navigate("BandScheduleCard", {
              bandId: lineMember.bandId,
              parentList: "by Day"
            })
          }
          style={lineStyle}
        >
          <Left style={{ flex: 14 }}>
            <Text style={{ fontSize: 12 }}>
              {`${format(lineMember.dateTimeStart, "HH:mm")}`}
            </Text>
            <Text style={{ fontSize: 14 }}>{lineMember.bandName}</Text>
            <Text style={{ fontSize: 10 }}>({lineMember.stageName})</Text>
          </Left>

          <Right style={{ flex: 1 }}>
            {favourites.indexOf(lineMember.bandId) > -1 ? (
              <FavouritesListIcon style={{ fontSize: 12, width: 12 }} />
            ) : (
              <FavouritesListIcon
                style={{ fontSize: 12, width: 12, color: "transparent" }}
              />
            )}
          </Right>
          <Right style={{ flex: 1 }}>
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
      <View key={`${dayMember.key}-lineswrapper`} style={{ marginBottom: 5 }}>
        {this.getAppearanceLines(dayMember.values)}
      </View>
    ]);

  render() {
    const {
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
    } = this.props;

    console.log("AppearancesByDay render()");

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

    /*
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

this.props.navigation.navigate("AppearancesDayStageNav")

*/

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
        <Container>
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

          <Content style={{ backgroundColor: "#fff" }}>
            {fetchStatus === "fetching" && <Spinner />}
            {appearancesList.length > 0 ? (
              <List>
                {this.getAppearancesListDayLevel(appearancesGroupedByDay)}
              </List>
            ) : (
              <Text>Nothing to see</Text>
            )}
          </Content>
        </Container>
      </SideMenu>
    );
  }
}

AppearancesByDay.propTypes = {
  appearancesView: PropTypes.string.isRequired,
  appearancesSideMenuVisible: PropTypes.bool.isRequired,
  appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  fetchStatus: PropTypes.string.isRequired,
  filterAppearancesByBandId: PropTypes.func.isRequired,
  groupAppearancesByDay: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  navigation: PropTypes.object.isRequired,
  setShowOnlyFavourites: PropTypes.func.isRequired,
  setShowAppearancesSideMenu: PropTypes.func.isRequired,
  setShowAppearancesView: PropTypes.func.isRequired,
  showOnlyFavourites: PropTypes.bool.isRequired
};

export default AppearancesByDay;
