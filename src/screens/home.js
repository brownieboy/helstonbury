import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
// import { ImageCache } from "react-native-img-cache";

import {
  Container,
  Content,
  Button,
  Icon,
  Left,
  Text,
  Header,
  Title,
  Body,
  Right
  // Footer,
  // FooterTab
} from "native-base";

// import MainFooterTabNav from "../components/mainfootertabnav.js";
import openFacebookLink from "../helper-functions/open-facebook-link.js";
import styles from "../styles/home-styles.js";
// import tabNavStyles from "../styles/tab-navigator-styles.js";

// const launchscreenBg = require("../../../img/mqdefault.jpg");
const launchscreenLogo = require("../../img/helstonbury_logo.jpg");

// import bandsApi from "../api/bandsApi.js";

class Home extends Component {
  static navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" style={{ color: tintColor }} />
    )
  };
  render() {
    // const { navigate } = this.props.navigation;
    const { homeText } = this.props.homeProp;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              // onPress={() => {
              //   ImageCache.get().clear();
              //   bandsApi.clearAsyncStorage();
              // }}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Helstonbury</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={styles.logoContainer}>
            <Image source={launchscreenLogo} style={styles.logo} />
          </View>
          <View style={{ marginTop: 50, marginLeft: 10, marginRight: 10 }}>
            <Text>{homeText}</Text>
          </View>

          <View style={{ marginTop: 150 }}>
            <Button
              transparent
              onPress={() => openFacebookLink("382432781776899")}
            >
              <Icon name="logo-facebook" />
              <Text>Helstonbury Facebook Page</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

Home.propTypes = {
  homeProp: PropTypes.object.isRequired
};

export default Home;

/*

          <FooterTab>
            <Button active={true}>
              <Text>Home</Text>
            </Button>
            <Button onPress={() => navigate("BandsList")}>
              <Text>Bands</Text>
            </Button>
            <Button>
              <Text>Stages</Text>
            </Button>
          </FooterTab>

 */
