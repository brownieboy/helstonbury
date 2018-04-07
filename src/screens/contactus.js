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
  },
  icon: {
    color: "blue"
  }
});

const iconSize = 40;

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
              <Left style={touchStyles.labelText}>
                <Text>Email:</Text>
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
                <Icon name="mail" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left style={touchStyles.labelText}>
                <Text>Email:</Text>
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
                <Icon style={touchStyles.icon} size={iconSize} name="mail" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left style={touchStyles.labelText}>
                <Text>Call:</Text>
              </Left>
              <Body>
                <TouchableOpacity
                  onPress={() => phonecall("07970569005", true)}
                >
                  <Text style={touchStyles.text}>07970 569005</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon style={touchStyles.icon} size={iconSize} name="call" />
              </Right>
            </ListItem>

            <ListItem icon>
              <Left style={touchStyles.labelText}>
                <Text>Text:</Text>
              </Left>
              <Body>
                <TouchableOpacity onPress={() => text("07970569005", true)}>
                  <Text style={touchStyles.text}>07970 569005</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon style={touchStyles.icon} size={iconSize} name="text" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Stages;
