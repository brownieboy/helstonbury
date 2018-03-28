import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, View } from "react-native";
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
  Spinner
} from "native-base";

import FavouritesListIcon from "../components/favourites-list-icon.js";
import ScheduleTabIcon from "../components/schedule-tab-icon.js";

// ${lineMember.name}:

class AppearancesByDay extends Component {
  static navigationOptions = {
    tabBarLabel: "by Day",
    tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  };

  constructor(props) {
    super(props);
    this.state = {
      showOnlyFavourites: false
    };
  }

  handleShowFavouritesPress = () => {
    const newStatus = !this.state.showOnlyFavourites;
    this.setState({ showOnlyFavourites: newStatus });
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
      filterAppearancesByBandId,
      groupAppearancesByDay,
      favourites,
      navigation
    } = this.props;

    const { showOnlyFavourites } = this.state;

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

    return (
      <Container>
        <Header>
          <Left>
            <Title>by Day</Title>
          </Left>
          <Body>
            <Button
              transparent
              onPress={() => navigation.navigate("AppearancesByDayStage")}
            >
              <Text>by Stage</Text>
            </Button>
          </Body>
          <Right>{this.getFavouritesButton(showOnlyFavourites)}</Right>
        </Header>

        <Content style={{ backgroundColor: "#fff" }}>
          {appearances.length > 0 ? (
            <List>
              {this.getAppearancesListDayLevel(appearancesGroupedByDay)}
            </List>
          ) : (
            <Spinner />
          )}
        </Content>
      </Container>
    );
  }
}

AppearancesByDay.propTypes = {
  appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  filterAppearancesByBandId: PropTypes.func.isRequired,
  groupAppearancesByDay: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  navigation: PropTypes.object.isRequired
};

export default AppearancesByDay;
