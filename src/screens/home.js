import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import ParsedText from "react-native-parsed-text";
import SideMenu from "react-native-side-menu";

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

import Menu from "../components/home-side-menu.js";
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
  constructor(props) {
    super(props);
    this.state = {
      homeSideMenuVisible: false
    };
  }

  static navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" style={{ color: tintColor }} />
    )
  };

  componentWillMount() {
    // console.log("BandsList..componentWillMount()");
    const {
      loadBandsProp,
      loadFavouritesNowProp,
      loadUIStateNowProp
    } = this.props;
    loadBandsProp();
    loadUIStateNowProp();
    loadFavouritesNowProp();
  }

  closeSideMenu = () => {
    this.setState({ homeSideMenuVisible: false });
  };

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
    const menu = <Menu closeSideMenu={this.closeSideMenu} />;

    // const { navigate } = this.props.navigation;
    // console.log("home props=") + this.props;
    const { homeText, fetchStatus } = this.props.homeProp;
    const { clearAllLocalData } = this.props;
    const { homeSideMenuVisible } = this.state;
    console.log("homeSideMenuVisible=" + homeSideMenuVisible);
    return (
      <SideMenu
        menu={menu}
        menuPosition="left"
        isOpen={homeSideMenuVisible}
        clearAllLocalData={clearAllLocalData}
        // onChange={isOpen =>
        //   isOpen === appearancesSideMenuVisible &&
        //   setShowAppearancesSideMenu(isOpen)
        // }
      >
        <Container
          style={{
            backgroundColor: "#FFF"
          }}
        >
          <Header>
            <Left>
              <Icon
                name="menu"
                onPress={() => this.setState({ homeSideMenuVisible: true })}
              />
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
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20
              }}
            >
              {fetchStatus === "loading" && (
                <Fragment>
                  <Text style={{ fontSize: 12, marginRight: 10 }}>
                    Checking server for the latest info...
                  </Text>
                  <Spinner style={{ height: 2, width: 2, marginLeft: 5 }} />
                </Fragment>
              )}
            </View>
            <View
              style={{
                marginTop: fetchStatus === "loading" ? 5 : 20,
                marginLeft: 20,
                marginRight: 20
              }}
            >
              <ParsedText
                parse={parsedTextArray}
                childrenProps={{ allowFontScaling: false }}
              >
                {homeText}
              </ParsedText>
            </View>
          </Content>
        </Container>
      </SideMenu>
    );
  }
}

Home.propTypes = {
  clearAllLocalData: PropTypes.func.isRequired,
  homeProp: PropTypes.object.isRequired,
  loadFavouritesNowProp: PropTypes.func.isRequired,
  loadUIStateNowProp: PropTypes.func.isRequired,
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
