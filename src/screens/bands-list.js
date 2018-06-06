import React, { Component } from "react";
import PropTypes from "prop-types";
// import { StyleProvider, getTheme } from "native-base";
// import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
// import IconFontAwesome from "react-native-vector-icons/FontAwesome";

// import { Alert } from "react-native";
// import FastImage from "react-native-fast-image";
import { CachedImage } from "react-native-img-cache";

import { Image } from "react-native";

import {
  Container,
  // Footer,
  // FooterTab,
  Header,
  Title,
  Content,
  // Button,
  Icon,
  ListItem,
  List,
  Text,
  Left,
  Right,
  Body,
  Spinner
  // Thumbnail
} from "native-base";

// import { CachedImage, ImageCacheProvider } from "react-native-cached-image";
// import { CachedImage } from "react-native-img-cache";

// Consts
// import { extendedConfig as firebaseConfig } from "../api/firebase.js";

// import MainFooterTabNav from "../components/mainfootertabnav.js";
import styles from "../styles/home-styles.js";
import BandsTabIcon from "../components/bands-tab-icon.js";
import FavouritesListIcon from "../components/favourites-list-icon.js";

const defaultThumb = "../../img/RockNRollGuitarist.png";
import HelstonburyAvatar from "../components/helstonbury-avatar.js";

// import { NavigationActions } from "react-navigation";

// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: "Home" })]
// });

// class BandsList extends Component {
//   static navigationOptions = {
//     tabBarLabel: "Bands List",
//     tabBarIcon: ({ tintColor }) => (
//       <IconMaterialCommunity
//         name="guitar-acoustic"
//         size={30}
//         style={{ color: tintColor }}
//       />
//     )
//   };

class BandsList extends Component {
  static navigationOptions = {
    tabBarLabel: "Bands",
    tabBarIcon: ({ tintColor }) => <BandsTabIcon tintColor={tintColor} />
  };

  /*  constructor(props) {
    super(props);
    this.state = {
      // tabs: [
      //   { active: false },
      //   { active: false },
      //   { active: false },
      //   { active: true }
      // ],
      // bandsList: bandsListData.bandsList
    };
  } */

  // componentWillMount() {
  //   console.log("BandsList..componentWillMount() as Component");
  //   // console.log("calling loadBandsProp manually");
  //   // const { loadBandsProp, loadFavouritesNowProp } = this.props;
  //   // loadBandsProp();
  //   // loadFavouritesNowProp();
  }

  // componentDidMount() {
  //   console.log("BandsList..componentDidMount() as Component");
  // }

  // toggleTab = activeTabNo => {
  //   const newTabs = this.state.tabs.map((element, index) => {
  //     element.active = index === activeTabNo;
  //     return element;
  //   });
  //   // Alert.alert("The Title", JSON.stringify(newTabs, null, 4));

  //   this.setState({ tabs: newTabs });
  // };
  // <Thumbnail circle size={55} source={thumbFile} />
  //    return <Thumbnail circle size={55} source={bandMemberObj.thumbFullUrl} />;

  getThumbNail = bandMemberObj => {
    // console.log(
    //   "getThumbNail() " +
    //     bandMemberObj.name +
    //     " url = " +
    //     bandMemberObj.thumbFullUrl
    // );
    if (bandMemberObj.thumbFullUrl) {
      // return (
      //   <Thumbnail
      //     circle
      //     size={55}
      //     source={{ uri: bandMemberObj.thumbFullUrl }}
      //   />
      // );
      return (
        <CachedImage
          source={{ uri: bandMemberObj.thumbFullUrl }}
          style={{ width: 55, height: 55, borderRadius: 27.5 }}
        />
      );
    }
    return (
      <Image
        source={require(defaultThumb)}
        style={{ width: 55, height: 55, borderRadius: 27.5 }}
      />
    );
  };

  getBandsListItems = (bandsList, favouritesState) =>
    bandsList.map(bandMember => (
      <ListItem
        key={bandMember.bandId}
        thumbnail
        onPress={() =>
          this.props.navigation.navigate("BandCard", {
            bandId: bandMember.bandId,
            parentList: "bands"
          })
        }
      >
        <Left>{this.getThumbNail(bandMember)}</Left>
        <Body>
          <Text>{bandMember.name}</Text>
          <Text numberOfLines={2} note>
            {bandMember.summary}
          </Text>
        </Body>
        {favouritesState.favourites.indexOf(bandMember.bandId) > -1 ? (
          <FavouritesListIcon
            style={{ fontSize: 14, width: 14, marginRight: 10 }}
          />
        ) : null}
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    ));

  render() {
    // const { navigation } = this.props;
    // const { bandsProp } = this.props;
    // console.log(
    //   "BandsList..render(), bandsProp = " + JSON.stringify(bandsProp, null, 4)
    // );
    // console.log("bandslist render, length=" + this.props.bandsProp.bandsList.length);
    // const { bandsList = [] } = this.props.bandsProp;
    const { bandsAlphabeticalProp = [], favouritesState } = this.props;
    // console.log("bandsAlphabeticalProp=" + bandsAlphabeticalProp);

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <HelstonburyAvatar />
          </Left>
          <Body>
            <Title>Bands</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{ backgroundColor: "#fff" }}>
          {bandsAlphabeticalProp.length > 0 ? (
            <List>
              {this.getBandsListItems(bandsAlphabeticalProp, favouritesState)}
            </List>
          ) : (
            <Spinner />
          )}
        </Content>
      </Container>
    );
  }
}

BandsList.propTypes = {
  // bandsList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  bandsAlphabeticalProp: PropTypes.arrayOf(PropTypes.object).isRequired,
  favouritesState: PropTypes.object.isRequired,
  loadBandsProp: PropTypes.func.isRequired,
  loadFavouritesNowProp: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
};

export default BandsList;

/*

        <Footer>
          <MainFooterTabNav activeTabNo={1} tabHomePressCallback = {() => navigation.dispatch(resetAction)} />
        </Footer>

          <FooterTab>
            <Button
              active={this.state.tabs[0].active}
              onPress={() => this.toggleTab(0)}
            >
              <Text>Friday</Text>
            </Button>
            <Button
              active={this.state.tabs[1].active}
              onPress={() => this.toggleTab(1)}
            >
              <Text>Saturday</Text>
            </Button>
            <Button
              active={this.state.tabs[2].active}
              onPress={() => this.toggleTab(2)}
            >
              <Text>Sunday</Text>
            </Button>
            <Button
              active={this.state.tabs[3].active}
              onPress={() => this.toggleTab(3)}
            >
              <Text>All Days</Text>
            </Button>
          </FooterTab>
 */
