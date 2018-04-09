import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Button,
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

import styles from "../styles/band-card-styles.js";
// import tabNavStyles from "../styles/tab-navigator-styles.js";
// import IconMaterialEntypo from "react-native-vector-icons/Entypo";
import StageTabIcon from "../components/stages-tab-icon.js";

class StageCard extends Component {
  static navigationOptions = {
    tabBarLabel: "Stages",
    tabBarIcon: ({ tintColor }) => <StageTabIcon tintColor={tintColor} />
  };

  render() {
    const backButtonTextStyle = { fontSize: 12 };
    const { stageId, parentList } = this.props.navigation.state.params;
    const { stagesList } = this.props;
    const backButtonText = `Back to ${parentList}`;

    const stageDetails = stagesList.filter(
      stageMember => stageMember.id === stageId
    )[0]; // Returns an array

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
          <Text>Stages info goes here. Some kind of tappable map.</Text>
        </Content>
      </Container>
    );
  }
}

StageCard.propTypes = {
  stagesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  navigation: PropTypes.object.isRequired
};

export default StageCard;
