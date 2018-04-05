import React, { Component } from "react";
import {
  Container,
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
import HelstonburyAvatar from "../components/helstonbury-avatar.js";

class Stages extends Component {
  static navigationOptions = {
    tabBarLabel: "Stages",
    tabBarIcon: ({ tintColor }) => <StageTabIcon tintColor={tintColor} />
  };

  render() {
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

        <Content padder>
          <Text>Stages info goes here. Some kind of tappable map.</Text>
        </Content>
      </Container>
    );
  }
}

export default Stages;
