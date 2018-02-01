import React, { Component } from "react";
import PropTypes from "prop-types";

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
    tabBarLabel: "Schedule",
    tabBarIcon: ({ tintColor }) => (
      <Icon
        ios="ios-calendar-outline"
        android="md-calendar"
        style={{ color: tintColor }}
      />
    )
  };

  getAppearancesListItems = appearancesList =>
    appearancesList.map(appearanceMember => {
      const { dateTimeStart, bandId, name, stageName } = appearanceMember;
      return (
        <ListItem key={`${bandId}${dateTimeStart}`}>
          <Body>
            <Text>{name}</Text>
            <Text numberOfLines={1} note>
              Appear: {`${dateTimeStart || "???"} - ${stageName}`}
            </Text>
          </Body>
        </ListItem>
      );
    });

  render() {
    const { appearancesListByDateTime } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Schedule</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <Content style={{ backgroundColor: "#fff" }}>
            {appearancesListByDateTime.length > 0 ? (
              <List>
                {this.getAppearancesListItems(appearancesListByDateTime)}
              </List>
            ) : (
              <Spinner />
            )}
          </Content>
        </Content>
      </Container>
    );
  }
}

Appearances.propTypes = {
  appearancesListByDateTime: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default Appearances;
