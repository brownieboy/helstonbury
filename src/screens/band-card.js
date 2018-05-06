import React, { Component } from "react";
import { Dimensions, Platform, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

import PropTypes from "prop-types";
import { format } from "date-fns";
// import { CachedImage } from "react-native-img-cache";
// import FastImage from "react-native-fast-image";
import { CachedImage } from "react-native-img-cache";

import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Body
} from "native-base";

import styles from "../styles/band-card-styles.js";
import ScheduleTabIcon from "../components/schedule-tab-icon.js";
import openFacebookLink from "../helper-functions/open-facebook-link.js";

const pulseBig = {
  0: {
    scale: 1
  },
  0.5: {
    scale: 1.2
  },
  1: {
    scale: 1
  }
};

Animatable.initializeRegistryWithDefinitions({
  pulseBig
});

const AnimatableIcon = Animatable.createAnimatableComponent(Icon);

/*
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    // console.log("BandCard params:");
    // console.log(params);

    return {
      tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />,
      title: params && params.parentList ? params.parentList : "Prev",
      tabBarVisible: false
    };
  };
*/

class BandCard extends Component {
  cancelHeartAnimation = false;

  static navigationOptions = {
    tabBarLabel: "Bands",
    tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  };

  constructor(props) {
    super(props);
    this.state = {
      dimensions: Dimensions.get("window"),
      fullScreenPhotoCard: false
    };
  }

  handleOnLayout = e => {
    this.setState({ dimensions: Dimensions.get("window") });
  };

  getAppearancesForBand = (appearances, bandKey) =>
    appearances.slice().filter(bandMember => bandMember.bandId === bandKey);

  // <TouchableOpacity
  //   key={`${appearance.dateTimeStart}${appearance.stageId}`}
  //   onPress={() =>
  //     this.props.navigation.navigate("StageCard", {
  //       stageId: appearance.stageId,
  //       parentList: "band"
  //     })
  //   }
  // >
  getAppearanceTexts = appearances =>
    appearances.map(appearance => (
      <Text key={`${appearance.dateTimeStart}${appearance.stageId}`}>
        {`${appearance.stageName}, ${format(
          appearance.dateTimeStart,
          "dddd"
        )} at ${format(appearance.dateTimeStart, "HH:mm")}`}
      </Text>
    ));

  // onPress={() =>
  //   this.props.navigation.navigate("StageCard", {
  //     stageId: stageMember.id,
  //     parentList: "stages"
  //   })

  getFaceBookLinkComponent = bandDetails => {
    const { facebookId, facebookPageName } = bandDetails;

    const faceBookText = facebookPageName ? (
      <Text>{facebookPageName}</Text>
    ) : null;

    if (facebookId) {
      return (
        <Left>
          <Button transparent onPress={() => openFacebookLink(facebookId)}>
            <Icon name="logo-facebook" />
            {faceBookText}
          </Button>
        </Left>
      );
    }
    return null;
  };

  // <TouchableOpacity
  //   onPress={() => {
  //     console.log("CachedImage pressed");
  //     this.setState({ fullScreenPhotoCard: !fullScreen });
  //   }}
  // >

  getCardImage = (cardFullUrl, fullScreen = false) => {
    // console.log("getCardImage, fullScreen = " + fullScreen);
    const dimensions = this.state.dimensions;
    const imageHeight = fullScreen
      ? dimensions.width
      : Math.round(dimensions.width * 0.8 * 9 / 16);
    const imageWidth = fullScreen ? dimensions.width : dimensions.width * 0.8;
    return (
      <CachedImage
        style={{
          alignSelf: "center",
          height: imageHeight,
          width: imageWidth,
          marginVertical: 5
        }}
        source={{ uri: cardFullUrl }}
      />
    );
  };

  handleFaveViewRef = ref => (this.faveView = ref);

  pulse = () =>
    this.faveView
      .pulseBig()
      .then(
        () =>
          this.cancelHeartAnimation
            ? new Error("promise cancelled")
            : this.faveView.pulseBig()
      )
      .then(
        () =>
          this.cancelHeartAnimation
            ? new Error("promise cancelled")
            : this.faveView.pulseBig()
      )
      // .then(
      //   () =>
      //     this.cancelHeartAnimation
      //       ? new Error("promise cancelled")
      //       : this.faveView.pulseBig()
      // )
      .catch(e => console.log(`error: ${e}`));

  render() {
    const { bandId, parentList } = this.props.navigation.state.params;
    const {
      bandsAlphabetical,
      appearancesByBandThenDateTime,
      favouritesState
      // parentList
    } = this.props; // Basically, the whole state
    const { fullScreenPhotoCard } = this.state;
    const sortedAppearances = this.getAppearancesForBand(
      appearancesByBandThenDateTime,
      bandId
    );
    const bandDetails = bandsAlphabetical.filter(
      bandMember => bandMember.bandId === bandId
    )[0]; // Returns an array
    const favourite =
      favouritesState.favourites.indexOf(bandDetails.bandId) > -1;
    const { toggleBandFavouriteStatus } = this.props;

    let backButtonText = `Back to ${parentList}`;
    const backButtonTextStyle = { fontSize: 12 };
    if (Platform.OS === "android") {
      backButtonTextStyle.color = "white";
      backButtonTextStyle.fontSize = 10;
      backButtonText = parentList; // Not enough room for "Back to" on Android
    }

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
              <Text style={backButtonTextStyle}>{backButtonText}</Text>
            </Button>
          </Left>
          <Body>
            <Title>{bandDetails.name}</Title>
          </Body>
        </Header>

        <Content padder>
          <Card style={styles.mb}>
            <CardItem
              bordered
              style={{
                borderWidth: 1,
                alignItems: "center"
              }}
            >
              <Body style={{ flexGrow: 7 }}>
                <Text>{bandDetails.name}</Text>
                <Text note>{bandDetails.summary}</Text>
              </Body>
              <Right
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flexGrow: 1,
                  width: 40,
                  height: 40
                }}
              >
                <AnimatableIcon
                  ref={this.handleFaveViewRef}
                  ios={favourite ? "ios-heart" : "ios-heart-outline"}
                  android={favourite ? "md-heart" : "md-heart-outline"}
                  onAnimationEnd={() => console.log("animation end")}
                  transition="fontSize"
                  duration={1000}
                  style={{
                    fontSize: favourite ? 42 : 32,
                    color: favourite ? "red" : "grey"
                  }}
                  onPress={() => {
                    // this.setState({ favouritesFontSize: favourite ? 35 : 50 });
                    if (!favourite) {
                      this.cancelHeartAnimation = false;
                      setTimeout(() => {
                        this.pulse();
                      }, 500);
                    } else {
                      console.log("setting this.cancelHeartAnimation = true");
                      this.cancelHeartAnimation = true;
                    }
                    toggleBandFavouriteStatus(bandDetails.bandId);
                  }}
                />
              </Right>
            </CardItem>

            <CardItem>
              <Body>
                {bandDetails.cardFullUrl
                  ? this.getCardImage(
                      bandDetails.cardFullUrl,
                      fullScreenPhotoCard
                    )
                  : null}
                <Text>{bandDetails.blurb}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{ fontSize: 12 }}>Appearing:</Text>
                {this.getAppearanceTexts(sortedAppearances)}
              </Body>
            </CardItem>
            <CardItem style={{ paddingVertical: 0 }}>
              {this.getFaceBookLinkComponent(bandDetails)}
            </CardItem>
          </Card>
        </Content>
        <View onLayout={this.handleOnLayout} />
      </Container>
    );
  }
}

BandCard.propTypes = {
  bandsAlphabetical: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  appearancesByBandThenDateTime: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
  favouritesState: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  // parentList: PropTypes.string.isRequired,
  toggleBandFavouriteStatus: PropTypes.func.isRequired
};

export default BandCard;
