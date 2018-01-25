import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StackNavigator as stackNavigator } from "react-navigation";
// import { StyleProvider, getTheme } from "native-base";
// import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
// import IconFontAwesome from "react-native-vector-icons/FontAwesome";

// import { Alert } from "react-native";

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

// Reducer
import { loadBands } from "../dux/bandsReducer.js";

// import MainFooterTabNav from "../components/mainfootertabnav.js";
import BandCard from "./band-card.js";
import styles from "../styles/home-styles.js";

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
    tabBarLabel: "Bands List",
    tabBarIcon: ({ tintColor }) => (
      <Icon
        // name="guitar-acoustic"
        ios="ios-musical-note-outline"
        android="md-musical-notes"
        size={30}
        style={{ color: tintColor }}
      />
    )
  };

  constructor(props) {
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
  }

  componentWillMount() {
    console.log("BandsList..componentWillMount()");
    const { loadBandsProp } = this.props;
    loadBandsProp();
  }

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
        <Image
          source={{ uri: bandMemberObj.thumbFullUrl }}
          style={{ width: 55, height: 55, borderRadius: 27.5 }}
        />
      );
    }
    return <Text>Hi</Text>;
  };

  getBandsListItems = () =>
    this.props.bandsProp.bandsList.map(bandMember => {
      return (
        <ListItem
          key={bandMember.id}
          thumbnail
          onPress={() =>
            this.props.navigation.navigate("BandCard", {
              bandDetails: bandMember
            })
          }
        >
          <Left>{this.getThumbNail(bandMember)}</Left>
          <Body>
            <Text>{bandMember.name}</Text>
            <Text numberOfLines={1} note>
              {bandMember.summary}
            </Text>
            <Text numberOfLines={1} note>
              Main stage, Sunday @ 15:00
            </Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
    });

  render() {
    // const { navigation } = this.props;
    const { bandsProp } = this.props;
    // console.log(
    //   "BandsList..render(), bandsProp = " + JSON.stringify(bandsProp, null, 4)
    // );
    // console.log("bandslist render, length=" + this.props.bandsProp.bandsList.length);
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Bands List</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{ backgroundColor: "#fff" }}>
          {this.props.bandsProp.bandsList.length > 0 ? (
            <List>{this.getBandsListItems()}</List>
          ) : (
            <Spinner />
          )}
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadBandsProp: loadBands }, dispatch);

const mapStateToProps = state => ({ bandsProp: state.bands });

const BandsListConn = connect(mapStateToProps, mapDispatchToProps)(BandsList);

const BandsNavigator = stackNavigator(
  {
    BandsList: {
      screen: BandsListConn
    },
    BandCard: {
      screen: BandCard
    }
  },
  {
    initialRouteName: "BandsList",
    headerMode: "none"
  }
);

// export default BandsList;
export default BandsNavigator;

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
