import React, { Component } from "react";
import PropTypes from "prop-types";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns";

import { TouchableHighlight, View } from "react-native";

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
    lineData.map(lineMember => {
      console.log("lineMember=" + JSON.stringify(lineMember, null, 4));
      return (
        <ListItem
          key={lineMember.bandId}
          style={{ height: 15, borderBottomWidth: 0 }}
        >
          <TouchableHighlight
            onPress={() =>
              this.props.navigation.navigate("BandCard", {
                bandId: lineMember.bandId
              })
            }
          >
            <Text style={{ fontSize: 14 }}>{`${lineMember.name}: ${format(
              lineMember.dateTimeStart,
              "HH:mm"
            )}-${format(lineMember.dateTimeEnd, "HH:mm")}`}</Text>
          </TouchableHighlight>
        </ListItem>
      );
    });

  getAppearancesStageLevel = groupedStageData =>
    groupedStageData.map(stageMember => [
      <ListItem itemDivider key={stageMember.key}>
        <Text>{stageMember.key}</Text>
      </ListItem>,
      <View
        key={`${stageMember.key}-lineswrapper`}
        style={{ marginBottom: 10 }}
      >
        {this.getAppearanceLines(stageMember.values)}
      </View>
    ]);

  getAppearancesListDayLevel = groupedDayData =>
    groupedDayData.map(dayMember => [
      <ListItem key={dayMember.key}>
        <Text style={{ fontWeight: "bold" }}>
          {dayMember.key.toUpperCase()}
        </Text>
      </ListItem>,
      <View key={`${dayMember.key}-stagewrapper`} style={{ marginBottom: 20 }}>
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
    // console.log(
    //   "appearancesGroupedByDayThenStage=" +
    //     JSON.stringify(appearancesGroupedByDayThenStage, null, 4)
    // );
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
