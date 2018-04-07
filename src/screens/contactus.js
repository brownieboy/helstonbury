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
  Body,
  List,
  ListItem
} from "native-base";

import { StyleSheet, TouchableOpacity, View } from "react-native";

import { email, text, web, phonecall } from "react-native-communications";

import styles from "../styles/band-card-styles.js";
// import tabNavStyles from "../styles/tab-navigator-touchStyles.js";
// import IconMaterialEntypo from "react-native-vector-icons/Entypo";
import HelstonburyAvatar from "../components/helstonbury-avatar.js";

const touchStyles = StyleSheet.create({
  text: {
    color: "blue",
    textDecorationLine: "underline",
    fontSize: 14
  },
  label: {
    width: 70
  },
  labelText: {
    width: 70,
    fontSize: 12
  },
  icon: {
    color: "blue",
    fontSize: 30
  }
});

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
          <Text>
            Contact For more information please contact Paul Turton via any of
            the contact methods listed below.
          </Text>

          <List>
            <ListItem icon>
              <Left style={touchStyles.label}>
                <Text style={touchStyles.labelText}>Email:</Text>
              </Left>
              <Body>
                <TouchableOpacity
                  onPress={() =>
                    email(
                      ["helstonbury@hotmail.com"],
                      null,
                      null,
                      "Helstonbury",
                      ""
                    )
                  }
                >
                  <Text style={touchStyles.text}>helstonbury@hotmail.com</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="mail" style={touchStyles.icon} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left style={touchStyles.label}>
                <Text style={touchStyles.labelText}>Email:</Text>
              </Left>
              <Body>
                <TouchableOpacity
                  onPress={() =>
                    email(
                      ["paulturton@live.com"],
                      null,
                      null,
                      "Helstonbury",
                      ""
                    )
                  }
                >
                  <Text style={touchStyles.text}>paulturton@live.com</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon style={touchStyles.icon} name="mail" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left style={touchStyles.label}>
                <Text style={touchStyles.labelText}>Call:</Text>
              </Left>
              <Body>
                <TouchableOpacity
                  onPress={() => phonecall("07970569005", true)}
                >
                  <Text style={touchStyles.text}>07970 569005</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon style={touchStyles.icon} name="call" />
              </Right>
            </ListItem>

            <ListItem icon>
              <Left style={touchStyles.label}>
                <Text style={touchStyles.labelText}>Text:</Text>
              </Left>
              <Body>
                <TouchableOpacity onPress={() => text("07970569005", true)}>
                  <Text style={touchStyles.text}>07970 569005</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon style={touchStyles.icon} name="text" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Stages;
