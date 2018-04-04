import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, View } from "react-native";
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
  Spinner
} from "native-base";

import FavouritesListIcon from "../components/favourites-list-icon.js";
import ScheduleTabIcon from "../components/schedule-tab-icon.js";
import Menu from "../components/appearances-side-menu.js";

class AppearancesByDayStage extends Component {
  static navigationOptions = {
    tabBarLabel: "by Stage",
    tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  };

  constructor(props) {
    super(props);
    this.state = {
      sideMenuOpen: false
    };
  }

  toggleSideMenu = () => {
    this.setState({
      sideMenuOpen: !this.state.sideMenuOpen
    });
  };

  updateMenuState = sideMenuOpen => {
    this.setState({ sideMenuOpen });
  };

  onMenuItemSelected = item =>
    this.setState({
      sideMenuOpen: false
    });

  handleShowFavouritesPress = () => {
    const { showOnlyFavourites, setShowOnlyFavourites } = this.props;
    setShowOnlyFavourites(!showOnlyFavourites);
  };

  getFavouritesButton = showOnlyFavourites => {
    let heart = "ios-heart";
    let heartOutline = "ios-heart-outline";
    if (Platform.OS === "android") {
      heart = "md-heart";
      heartOutline = "md-heart-outline";
    }
    return (
      <Button transparent>
        <Icon
          name={showOnlyFavourites ? heart : heartOutline}
          onPress={this.handleShowFavouritesPress}
        />
      </Button>
    );
  };

  getAppearanceLines = lineData => {
    const itemsLength = lineData.length;
    const favourites = this.props.favourites;
    return lineData.map((lineMember, index) => {
      const lineStyle = { height: 35 };
      if (itemsLength === index + 1) {
        lineStyle.borderBottomWidth = 0;
      }
      return (
        <ListItem
          key={lineMember.id}
          onPress={() =>
            this.props.navigation.navigate("BandScheduleCard", {
              bandId: lineMember.bandId,
              parentList: "by Stage"
            })
          }
          style={lineStyle}
        >
          <Left style={{ flex: 13 }}>
            <Text style={{ fontSize: 12 }}>{`${format(
              lineMember.dateTimeStart,
              "HH:mm"
            )}-${format(lineMember.dateTimeEnd, "HH:mm")}: `}</Text>
            <Text style={{ fontSize: 14 }}>{lineMember.bandName}</Text>
          </Left>
          <Right style={{ flex: 1 }}>
            {favourites.indexOf(lineMember.bandId) > -1 ? (
              <FavouritesListIcon style={{ fontSize: 14, width: 14 }} />
            ) : null}
          </Right>
          <Right style={{ flex: 1 }}>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    });
  };

  getAppearancesStageLevel = groupedStageData =>
    groupedStageData.map(stageMember => [
      <ListItem key={stageMember.key}>
        <Text style={{ fontWeight: "bold", fontStyle: "italic", fontSize: 13 }}>
          {stageMember.key.split("~")[1]}
        </Text>
      </ListItem>,
      <View key={`${stageMember.key}-lineswrapper`}>
        {this.getAppearanceLines(stageMember.values)}
      </View>
    ]);

  getAppearancesListDayLevel = groupedDayData =>
    groupedDayData.map(dayMember => [
      <ListItem itemDivider key={dayMember.key}>
        <Text style={{ fontWeight: "bold" }}>
          {dayMember.key.toUpperCase()}
        </Text>
      </ListItem>,
      <View key={`${dayMember.key}-stagewrapper`} style={{ marginBottom: 20 }}>
        {this.getAppearancesStageLevel(dayMember.values)}
      </View>
    ]);

  render() {
    const {
      appearancesList,
      appearancesView,
      filterAppearancesByBandId,
      groupAppearancesByDayStage,
      favourites,
      navigation,
      setShowAppearancesView,
      setShowOnlyFavourites,
      showOnlyFavourites
    } = this.props;

    const { sideMenuOpen } = this.state;

    let appearances = [...appearancesList];
    if (showOnlyFavourites) {
      appearances = filterAppearancesByBandId(appearancesList, favourites);
    }

    const appearancesGroupedByDayStage = groupAppearancesByDayStage(
      appearances
    );

    const menu = (
      <Menu
        currentAppearancesView={appearancesView}
        handleSetAppearancesView={setShowAppearancesView}
        onItemSelected={this.onMenuItemSelected}
        setShowOnlyFavourites={setShowOnlyFavourites}
        navigation={navigation}
        showOnlyFavourites={showOnlyFavourites}
      />
    );

    return (
      <SideMenu
        menu={menu}
        menuPosition="right"
        isOpen={sideMenuOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <Container>
          <Header>
            <Left>
              <Title>Schedule by Stage</Title>
            </Left>
            <Right>
              <Icon
                ios="ios-options"
                android="md-options"
                onPress={this.toggleSideMenu}
              />
            </Right>
          </Header>

          <Content style={{ backgroundColor: "#fff" }}>
            {appearancesList.length > 0 ? (
              <List>
                {this.getAppearancesListDayLevel(appearancesGroupedByDayStage)}
              </List>
            ) : (
              <Spinner />
            )}
          </Content>
        </Container>
      </SideMenu>
    );
  }
}

AppearancesByDayStage.propTypes = {
  appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  filterAppearancesByBandId: PropTypes.func.isRequired,
  groupAppearancesByDayStage: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  navigation: PropTypes.object.isRequired,
  showOnlyFavourites: PropTypes.bool.isRequired,
  setShowOnlyFavourites: PropTypes.func.isRequired
};

export default AppearancesByDayStage;
