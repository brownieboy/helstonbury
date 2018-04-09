import React, { Component } from "react";
import PropTypes from "prop-types";

// import { CachedImage } from "react-native-img-cache";

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
import StagesTabIcon from "../components/stages-tab-icon.js";

const defaultThumb = "../../img/RockNRollGuitarist.png";
import HelstonburyAvatar from "../components/helstonbury-avatar.js";

class StagesList extends Component {
  static navigationOptions = {
    tabBarLabel: "Stages",
    tabBarIcon: ({ tintColor }) => <StagesTabIcon tintColor={tintColor} />
  };

  componentWillMount() {
    // console.log("StagesList..componentWillMount()");
    const { loadStagesProp, loadFavouritesNowProp } = this.props;
    // loadStagesProp();
    // loadFavouritesNowProp();
  }

  getThumbNail = stageMemberObj => {
    if (stageMemberObj.thumbFullUrl) {
      return (
        <CachedImage
          source={{ uri: stageMemberObj.thumbFullUrl }}
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

  getStagesListItems = (stagesList, favouritesState) =>
    stagesList.map(stageMember => (
      <ListItem
        key={stageMember.id}
        thumbnail
        onPress={() =>
          this.props.navigation.navigate("StageCard", {
            stageId: stageMember.id,
            parentList: "stages"
          })
        }
      >
        <Left>{this.getThumbNail(stageMember)}</Left>
        <Body>
          <Text>{stageMember.name}</Text>
          <Text numberOfLines={2} note>
            {stageMember.summary}
          </Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    ));

  render() {
    // const { navigation } = this.props;
    // const { stagesProp } = this.props;
    // console.log(
    //   "StagesList..render(), stagesProp = " + JSON.stringify(stagesProp, null, 4)
    // );
    // console.log("stageslist render, length=" + this.props.stagesProp.stagesList.length);
    // const { stagesList = [] } = this.props.stagesProp;
    const { stagesList } = this.props;
    // console.log("stagesAlphabeticalProp=" + stagesAlphabeticalProp);

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <HelstonburyAvatar />
          </Left>
          <Body>
            <Title>Stages</Title>
          </Body>
          <Right />
        </Header>

        <Content style={{ backgroundColor: "#fff" }}>
          {stagesList.length > 0 ? (
            <List>
              {this.getStagesListItems(stagesList)}
            </List>
          ) : (
            <Spinner />
          )}
        </Content>
      </Container>
    );
  }
}

StagesList.propTypes = {
  stagesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  // stagesAlphabeticalProp: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.object.isRequired
};

export default StagesList;


