import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Dimensions, Platform, View } from "react-native";
import { format } from "date-fns";
import SideMenu from "react-native-side-menu";

import {
  Body,
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
import NoAppearancesToDisplayMessage from "../components/no-appearances-todisplay-message.js";

const smallestLandscapeWidth = 568;

class AppearancesByDayStage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screenMode:
        Dimensions.get("window").width >= smallestLandscapeWidth
          ? "landscape"
          : "portrait"
    };
  }

  // componentWillMount() {
  //   console.log("AppearancesByDayStage..componentWillMount() as PureComponent");
  //   // const { loadBandsProp, loadFavouritesNowProp } = this.props;
  //   // loadBandsProp();
  //   // loadFavouritesNowProp();
  // }

  // componentDidMount() {
  //   console.log("AppearancesByDayStage..componentDidMount() as Component");
  // }

  handleOnLayout = () => {
    this.setState({
      screenMode:
        Dimensions.get("window").width >= smallestLandscapeWidth
          ? "landscape"
          : "portrait"
    });
    // const { height, width } = Dimensions.get("window");
    // console.log("width=" + width);
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

  getBandSummaryText = bandInfo => {
    // console.log("getBandSummaryText for " + bandInfo.name);
    if (
      this.state.screenMode === "landscape" &&
      typeof bandInfo.bandSummary !== "undefined" &&
      bandInfo.bandSummary !== ""
    ) {
      return (
        <Text style={{ fontSize: 12, flex: 15, marginLeft: 4 }}>
          {bandInfo.bandSummary}
        </Text>
      );
    }
    return null;
  };

  /*
            {favourites.indexOf(lineMember.bandId) > -1 ? (
              <FavouritesListIcon style={{ fontSize: 14, width: 14 }} />
            ) : null}
 */

  getAppearanceLines = lineData => {
    const itemsLength = lineData.length;
    const { favourites, showOnlyFavourites } = this.props;
    let isFavourite, lineStyle;
    return lineData.map((lineMember, index) => {
      isFavourite = favourites.indexOf(lineMember.bandId) > -1;
      lineStyle = {
        // Don't remove.  It's updated later.
      };
      if (itemsLength === index + 1) {
        lineStyle.borderBottomWidth = 0;
      }

      if (!showOnlyFavourites || isFavourite) {
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
            <Left
              style={{
                flex: 23,
                marginTop: -10,
                marginBottom: -10
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  flexGrow: 0,
                  flexShrink: 0,
                  flexBasis: 80
                }}
              >{`${format(lineMember.dateTimeStart, "HH:mm")}-${format(
                lineMember.dateTimeEnd,
                "HH:mm"
              )} `}</Text>
              <Text style={{ fontSize: 14, flex: 8 }}>
                {lineMember.bandName}
              </Text>
              {this.getBandSummaryText(lineMember)}
            </Left>
            <Right
              style={{
                marginTop: -10,
                marginBottom: -10,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 10
              }}
            >
              {isFavourite ? (
                <FavouritesListIcon style={{ fontSize: 14, width: 14 }} />
              ) : null}
            </Right>
            <Right
              style={{
                marginTop: -10,
                marginBottom: -10,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 16
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

  getStageSummaryText = stageInfo => {
    if (
      typeof stageInfo !== "undefined" &&
      typeof stageInfo.summary !== "undefined" &&
      stageInfo.summary !== ""
    ) {
      return (
        <Text style={{ fontSize: 12, fontStyle: "italic", marginLeft: 5 }}>
          ({stageInfo.summary})
        </Text>
      );
    }
    return null;
  };

  getAppearancesStageLevel = groupedStageData =>
    groupedStageData.map(stageMember => {
      const stageId = stageMember.key.split("~")[1];
      const stageInfo = this.props.getStageInfo(stageId);
      // console.log("stageInfo for " + stageId + ":");
      // console.log(stageInfo);
      return [
        <ListItem key={stageId}>
          <Text
            style={{ fontWeight: "bold", fontStyle: "italic", fontSize: 14 }}
          >
            {typeof stageInfo !== "undefined" ? stageInfo.name : stageId}
          </Text>
          {this.getStageSummaryText(stageInfo)}
        </ListItem>,
        <View key={`${stageMember.key}-lineswrapper`}>
          {this.getAppearanceLines(stageMember.values)}
        </View>
      ];
    });

  getAppearancesListDayLevel = groupedDayData =>
    groupedDayData.map(dayMember => [
      <ListItem itemDivider key={dayMember.key}>
        <Text style={{ fontWeight: "bold" }}>{dayMember.key}</Text>
      </ListItem>,
      <View key={`${dayMember.key}-stagewrapper`} style={{ marginBottom: 20 }}>
        {this.getAppearancesStageLevel(dayMember.data)}
      </View>
    ]);

  render() {
    const {
      // appearancesList,
      appearancesSelGroupedByDayStage,
      fetchStatus
      // filterAppearancesByBandId,
      // groupAppearancesByDayStage,
      // favourites,
      // showOnlyFavourites,
      // reverseTimesOrder
    } = this.props;

    console.log("AppearancesByDayStage..appearancesSelGroupedByDayStage");
    console.log(JSON.stringify(appearancesSelGroupedByDayStage, null, 4));

    // const { sideMenuOpen } = this.state;

    // let appearances = [...appearancesList];
    // console.log("showOnlyFavourites=" + showOnlyFavourites);
    // if (showOnlyFavourites) {
    //   appearances = filterAppearancesByBandId(appearancesList, favourites);
    // }

    // const appearancesGroupedByDayStage = groupAppearancesByDayStage(
    //   appearances,
    //   reverseTimesOrder
    // );

    return (
      <Content style={{ backgroundColor: "#fff" }}>
        {fetchStatus === "fetching" && <Spinner />}
        <List>
          {this.getAppearancesListDayLevel(appearancesSelGroupedByDayStage)}
        </List>
        <View onLayout={this.handleOnLayout} />
      </Content>
    );
  }
}

AppearancesByDayStage.propTypes = {
  // appearancesView: PropTypes.string.isRequired,
  appearancesSelGroupedByDayStage: PropTypes.arrayOf(PropTypes.object)
    .isRequired,
  appearancesSideMenuVisible: PropTypes.bool.isRequired,
  // appearancesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  fetchStatus: PropTypes.string.isRequired,
  // filterAppearancesByBandId: PropTypes.func.isRequired,
  getStageInfo: PropTypes.func.isRequired,
  // groupAppearancesByDayStage: PropTypes.func.isRequired,
  favourites: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  navigation: PropTypes.object.isRequired,
  showOnlyFavourites: PropTypes.bool.isRequired
  // reverseTimesOrder: PropTypes.bool.isRequired
  // setShowAppearancesView: PropTypes.func.isRequired,
  // setShowOnlyFavourites: PropTypes.func.isRequired
};

export default AppearancesByDayStage;
