import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dimensions, View } from "react-native";
import { CachedImage } from "react-native-img-cache";

import {
  Button,
  Card,
  CardItem,
  Container,
  Icon,
  Left,
  Header,
  Title,
  Content,
  Text,
  Right,
  Body
} from "native-base";

import styles from "../styles/band-card-styles.js"; // Yes, styles shared with band card
// import tabNavStyles from "../styles/tab-navigator-styles.js";
// import IconMaterialEntypo from "react-native-vector-icons/Entypo";
import StageTabIcon from "../components/stages-tab-icon.js";

class StageCard extends Component {
  static navigationOptions = {
    tabBarLabel: "Stages",
    tabBarIcon: ({ tintColor }) => <StageTabIcon tintColor={tintColor} />
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

  render() {
    const backButtonTextStyle = { fontSize: 12 };
    const { stageId, parentList } = this.props.navigation.state.params;
    const { selectStageDetails } = this.props;
    const { fullScreenPhotoCard } = this.state;
    const backButtonText = `Back to ${parentList}`;

    // const stageDetails = stagesList.filter(
    //   stageMember => stageMember.id === stageId
    // )[0]; // Returns an array
    const stageDetails = selectStageDetails;


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
            <Title>{stageDetails.name}</Title>
          </Body>
        </Header>

        <Content padder>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Body>
                  <Text>{stageDetails.name}</Text>
                  <Text note>{stageDetails.summary}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                {stageDetails.cardFullUrl
                  ? this.getCardImage(
                      stageDetails.cardFullUrl,
                      fullScreenPhotoCard
                    )
                  : null}
                <Text>{stageDetails.blurb}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <View onLayout={this.handleOnLayout} />
      </Container>
    );
  }
}

StageCard.propTypes = {
  selectStageDetails: PropTypes.object.isRequired,
  // stagesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  navigation: PropTypes.object.isRequired
};

export default StageCard;
