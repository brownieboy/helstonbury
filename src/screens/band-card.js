import React, { Component } from "react";
import { Dimensions } from "react-native";
import PropTypes from "prop-types";
import { format } from "date-fns";
// import { CachedImage } from "react-native-img-cache";
import FastImage from "react-native-fast-image";
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

const deviceWidth = Dimensions.get("window").width;
// import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import BandsTabIcon from "../components/bands-tab-icon.js";

import openFacebookLink from "../helper-functions/open-facebook-link.js";

class BandCard extends Component {
  static navigationOptions = {
    tabBarLabel: "Bands List",
    tabBarIcon: ({ tintColor }) => <BandsTabIcon tintColor={tintColor} />
  };

  getAppearancesForBand = (appearances, bandKey) =>
    appearances.slice().filter(bandMember => bandMember.bandId === bandKey);

  getAppearanceTexts = appearances =>
    appearances.map(appearance => (
      <Text key={`${appearance.dateTimeStart}${appearance.stageId}`}>
        {`${appearance.stageName}, ${format(
          appearance.dateTimeStart,
          "dddd"
        )} at ${format(appearance.dateTimeStart, "HH:mm")}`}
      </Text>
    ));

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

  render() {
    const bandId = this.props.navigation.state.params.bandId;
    const { bandsAlphabetical, appearancesByBandThenDateTime } = this.props; // Basically, the whole state
    const sortedAppearances = this.getAppearancesForBand(
      appearancesByBandThenDateTime,
      bandId
    );
    const bandDetails = bandsAlphabetical.filter(
      bandMember => bandMember.bandId === bandId
    )[0]; // Returns an array

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Band Info</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>{bandDetails.name}</Text>
                  <Text note>{bandDetails.summary}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem>
              <Body>
                <FastImage
                  style={{
                    alignSelf: "center",
                    height: 150,
                    width: deviceWidth / 1.18,
                    marginVertical: 5
                  }}
                  source={{ uri: bandDetails.cardFullUrl }}
                />
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
      </Container>
    );
  }
}

BandCard.propTypes = {
  bandsAlphabetical: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  appearancesByBandThenDateTime: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
  navigation: PropTypes.object.isRequired
};

export default BandCard;
