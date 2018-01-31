import React, { Component } from "react";
import {
  Container,
  Header,
  Icon,
  Title,
  Content,
  List,
  ListItem,
  Text,
  Right,
  Body,
  Spinner
} from "native-base";

import styles from "../styles/band-card-styles.js";
// import tabNavStyles from "../styles/tab-navigator-styles.js";

class Appearances extends Component {
  static navigationOptions = {
    tabBarLabel: "Appearances",
    tabBarIcon: ({ tintColor }) => (
      <Icon
        ios="ios-calendar-outline"
        android="md-calendar"
        style={{ color: tintColor }}
      />
    )
  };

  getBandsListItems = bandsList =>
    bandsList.map(bandMember => {
      return (
        <ListItem key={bandMember.bandId}>
          <Body>
            <Text>{bandMember.name}</Text>
            <Text numberOfLines={1} note>
              Appear:{" "}
              {bandMember.appearances && bandMember.appearances.length > 0
                ? bandMember.appearances[0].dateTimeStart
                : "???"}
            </Text>
          </Body>
        </ListItem>
      );
    });

  render() {
    const { bandsListByDateTime } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Appearances</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Content style={{ backgroundColor: "#fff" }}>
            {bandsListByDateTime.length > 0 ? (
              <List>{this.getBandsListItems(bandsListByDateTime)}</List>
            ) : (
              <Spinner />
            )}
          </Content>
        </Content>
      </Container>
    );
  }
}

export default Appearances;
