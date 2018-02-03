import React, { Component } from "react";
import { Image, Dimensions } from "react-native";
import PropTypes from "prop-types";
// import { CachedImage } from "react-native-img-cache";

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

// class BandCard extends Component {
//   static navigationOptions = {
//     tabBarIcon: ({ tintColor }) => (
//       <IconMaterialCommunity
//         name="guitar-acoustic"
//         size={30}
//         style={{ color: tintColor }}
//       />
//     )
//   };

class BandCard extends Component {
  static navigationOptions = {
    tabBarLabel: "Bands List",
    tabBarIcon: ({ tintColor }) => <BandsTabIcon tintColor={tintColor} />
  };

  sortAppearancesByDate = appearancesArray =>
    appearancesArray
      .slice()
      .sort((a, b) => new Date(a.dateTimeStart) - new Date(b.dateTimeStart));


  getFaceBookLinkComponent = () => {
    const {
      facebookId,
      facebookPageName
    } = this.props.navigation.state.params.bandDetails;

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
    const bandDetails = this.props.navigation.state.params.bandDetails;
    const sortedAppearances = this.sortAppearancesByDate(
      bandDetails.appearances
    );
    console.log("sortedAppearances=" + JSON.stringify(sortedAppearances));
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
                <Image
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
                <Text>
                  Appearing: {JSON.stringify(sortedAppearances)}
                </Text>
              </Body>
            </CardItem>
            <CardItem style={{ paddingVertical: 0 }}>
              {this.getFaceBookLinkComponent()}
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

BandCard.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default BandCard;
