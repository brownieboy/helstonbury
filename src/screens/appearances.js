import React, { Component } from "react";
import PropTypes from "prop-types";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns";

import { View } from "react-native";

import {
  Container,
  Header,
  // Icon,
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
      <IconMaterial name="schedule" size={25} style={{ color: tintColor }} />
    )
  };

  getAppearanceLines = lineData =>
    lineData.map(lineMember => (
      <ListItem key={lineMember.bandId}>
        <Text style={{ fontSize: 14 }}>{`${lineMember.name}: ${format(
          lineMember.dateTimeStart,
          "HH:mm"
        )}-${format(lineMember.dateTimeEnd, "HH:mm")}`}</Text>
      </ListItem>
    ));

  // getAppearancesLineLevel = lineData => (
  //   <ListItem>{this.getAppearanceLines(lineData)}</ListItem>
  // );

  getAppearancesStageLevel = groupedStageData =>
    groupedStageData.map(stageMember => [
      <ListItem key={stageMember.key}>
        <Text style={{ fontWeight: "bold" }}>{stageMember.key}</Text>
      </ListItem>,
      <View key={`${stageMember.key}-lineswrapper`}>
        {this.getAppearanceLines(stageMember.values)}
      </View>
    ]);

  getAppearancesListDayLevel = groupedDayData =>
    groupedDayData.map(dayMember => [
      <ListItem itemDivider key={dayMember.key}>
        <Text>{dayMember.key.toUpperCase()}</Text>
      </ListItem>,
      <View key={`${dayMember.key}-stagewrapper`}>
        {this.getAppearancesStageLevel(dayMember.values)}
      </View>
    ]);

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
    const {
      appearancesListByDateTime,
      appearancesGroupedByDayThenStage
    } = this.props;
    console.log(
      "appearancesGroupedByDayThenStage=" +
        JSON.stringify(appearancesGroupedByDayThenStage, null, 4)
    );
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
                {this.getAppearancesListDayLevel(
                  appearancesGroupedByDayThenStage
                )}
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
  appearancesListByDateTime: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
  appearancesGroupedByDayThenStage: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired
};

export default Appearances;
