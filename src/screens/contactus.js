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
    textDecorationLine: "underline"
  },
  labelText: {
    width: 80
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
            Contact For more information please contact Paul Turton email
            helstonbury@hotmail.com paulturton@live.com tel: 07970569005
          </Text>

          <List>
            <ListItem icon>
              <Left style={touchStyles.labelText}>
                <Text>Email:</Text>
              </Left>
              <Body>
                <TouchableOpacity
                  onPress={() =>
                    email(
                      ["mike_brown@hotmail.com", "brownieboy@gmail.com"],
                      null,
                      null,
                      "Helstonbury",
                      ""
                    )
                  }
                >
                  <Text style={touchStyles.text}>brownieboy@gmail.com</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="mail" />
              </Right>
            </ListItem>
          </List>

          <List>
            <ListItem icon>
              <Left style={touchStyles.labelText}>
                <Text>Call:</Text>
              </Left>
              <Body>
                <TouchableOpacity onPress={() => phonecall("0123456789", true)}>
                  <Text style={touchStyles.text}>0123456789</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="call" />
              </Right>
            </ListItem>
          </List>
          <List>
            <ListItem icon>
              <Left style={touchStyles.labelText}>
                <Text>Text:</Text>
              </Left>
              <Body>
                <TouchableOpacity onPress={() => text("0123456789", true)}>
                  <Text style={touchStyles.text}>0123456789</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon name="text" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Stages;
