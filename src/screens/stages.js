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
import IconMaterialEntypo from "react-native-vector-icons/Entypo";


class Stages extends Component {
  static navigationOptions = {
    tabBarLabel: "Stages",
    tabBarIcon: ({ tintColor }) => (
      <IconMaterialEntypo name="modern-mic" size={25} style={{ color: tintColor }} />
    )
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
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
