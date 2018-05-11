import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import ParsedText from "react-native-parsed-text";
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
  Right,
  Spinner
  // Footer,
  // FooterTab
} from "native-base";

import { parsedTextArray } from "../helper-functions/text-links.js";
import { rnViewStyles } from "../styles/general-styles.js";
// import MainFooterTabNav from "../components/mainfootertabnav.js";
// import openFacebookLink from "../helper-functions/open-facebook-link.js";
import styles from "../styles/home-styles.js";
// import tabNavStyles from "../styles/tab-navigator-styles.js";
import HelstonburyAvatar from "../components/helstonbury-avatar.js";
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

  componentWillMount() {
    // console.log("BandsList..componentWillMount()");
    const { loadBandsProp, loadFavouritesNowProp } = this.props;
    loadBandsProp();
    loadFavouritesNowProp();
  }

  /*
            <Button
              transparent
              // onPress={() => {
              //   ImageCache.get().clear();
              //   bandsApi.clearAsyncStorage();
              // }}
            >
              <Icon
                name="menu"
                onPress={() => alert("Options page coming soon!")}
              />
            </Button>
 */

  render() {
    // const { navigate } = this.props.navigation;
    // console.log("home props=") + this.props;
    const { homeText, fetchStatus } = this.props.homeProp;
    return (
      <Container>
        <Header>
          <Left>
            <HelstonburyAvatar />
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
          <View style={{ marginTop: 50, marginLeft: 20, marginRight: 20 }}>
            <ParsedText
              parse={parsedTextArray}
              childrenProps={{ allowFontScaling: false }}
            >
              {fetchStatus === "loading"
                ? "Getting latest info, please wait..."
                : homeText}
            </ParsedText>
            {fetchStatus === "loading" ? <Spinner /> : null}

            <ParsedText
              parse={parsedTextArray}
              childrenProps={{ allowFontScaling: false }}
            >
              Here is some test with some markdown including *bold* and _italic_
              and then some more *bold*
            </ParsedText>
          </View>
        </Content>
      </Container>
    );
  }
}

/*

 


           <View style={{ marginTop: 20 }}>
            <Button
              transparent
              onPress={() => openFacebookLink("382432781776899")}
            >
              <Icon name="logo-facebook" />
              <Text>Helstonbury Facebook Page</Text>
            </Button>
          </View>
 */

Home.propTypes = {
  homeProp: PropTypes.object.isRequired,
  loadFavouritesNowProp: PropTypes.func.isRequired,
  loadBandsProp: PropTypes.func.isRequired
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
