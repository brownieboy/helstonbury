import React, { Component } from "react";
import {
  Container,
  Header,
  Icon,
  Title,
  Content,
  Text,
  Right,
  Body
} from "native-base";

import styles from "../styles/band-card-styles.js";
// import tabNavStyles from "../styles/tab-navigator-styles.js";

class Appearances extends Component {
  static navigationOptions = {
    tabBarLabel: "Appearances",
    tabBarIcon: ({ tintColor }) => (
      <Icon ios="ios-calendar-outline" android="md-calendar" style={{ color: tintColor }} />
    )
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Appearances</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Text>Appearances data goes here.</Text>
        </Content>
      </Container>
    );
  }
}

export default Appearances;
