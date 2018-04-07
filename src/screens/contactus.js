import React, { Component } from "react";
import {
  Container,
  Left,
  Header,
  Title,
  Content,
  Text,
  Right,
  Icon,
  Body
} from "native-base";

import styles from "../styles/band-card-styles.js";
// import tabNavStyles from "../styles/tab-navigator-styles.js";
// import IconMaterialEntypo from "react-native-vector-icons/Entypo";
import HelstonburyAvatar from "../components/helstonbury-avatar.js";

class Stages extends Component {
  static navigationOptions = {
    tabBarLabel: "Home",
    tabBarIcon: ({ tintColor }) => (
      <Icon
        android="md-information-circle"
        ios="ios-information-circle-outline"
        style={{ color: tintColor }}
      />
    )
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <HelstonburyAvatar />
          </Left>
          <Body>
            <Title>About Helstonbury</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>Contact info, phone, email etc.</Text>
        </Content>
      </Container>
    );
  }
}

export default Stages;
