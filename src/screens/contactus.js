import React, { Component } from "react";
import PropTypes from "prop-types";
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

import openMap from "react-native-open-maps";

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
  textNoLink: {
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

class ContactUs extends Component {
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
    // 50.100415, -5.276919
    const {
      startBlurb,
      email1,
      email2,
      mobile,
      gettingThereBlurb,
      mapLinkText,
      venueAddress,
      venuePhone,
      venueEmail
    } = this.props;
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
          <Text>{startBlurb}</Text>

          <List>
            <ListItem icon>
              <Left style={touchStyles.label}>
                <Text style={touchStyles.labelText}>Email:</Text>
              </Left>
              <Body>
                <TouchableOpacity
                  onPress={() => email([email1], null, null, "Helstonbury", "")}
                >
                  <Text style={touchStyles.text}>{email1}</Text>
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
                  onPress={() => email([email2], null, null, "Helstonbury", "")}
                >
                  <Text style={touchStyles.text}>{email1}</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon style={touchStyles.icon} name="mail" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left style={touchStyles.label}>
                <Text style={touchStyles.labelText}>Mobile:</Text>
              </Left>
              <Body>
                <TouchableOpacity onPress={() => phonecall(mobile, true)}>
                  <Text style={touchStyles.text}>{mobile}</Text>
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
                <TouchableOpacity onPress={() => text(mobile, true)}>
                  <Text style={touchStyles.text}>{mobile}</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon style={touchStyles.icon} name="text" />
              </Right>
            </ListItem>
          </List>

          <Text>{gettingThereBlurb}</Text>
          <List>
            <ListItem icon>
              <Left style={touchStyles.label}>
                <Text style={touchStyles.labelText}>Address:</Text>
              </Left>
              <Body>
                <Text style={touchStyles.textNoLink}>{venueAddress}</Text>
              </Body>
              <Right />
            </ListItem>

            <ListItem icon>
              <Left style={touchStyles.label}>
                <Text style={touchStyles.labelText}>Phone:</Text>
              </Left>
              <Body>
                <TouchableOpacity onPress={() => phonecall(venuePhone, true)}>
                  <Text style={touchStyles.text}>{venuePhone}</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon style={touchStyles.icon} name="call" />
              </Right>
            </ListItem>

            <ListItem icon>
              <Left style={touchStyles.label}>
                <Text style={touchStyles.labelText}>Map:</Text>
              </Left>
              <Body>
                <TouchableOpacity
                  onPress={() =>
                    openMap({
                      latitude: 50.100415,
                      longitude: -5.276919,
                      provider: "google",
                      name: "Blue Anchor, Helston"
                    })
                  }
                >
                  <Text style={touchStyles.text}>
                    {mapLinkText !== "" ? mapLinkText : "Open in Google Maps"}
                  </Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <Icon style={touchStyles.icon} name="map" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

ContactUs.propTypes = {
  startBlurb: PropTypes.string.isRequired,
  email1: PropTypes.string.isRequired,
  email2: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  gettingThereBlurb: PropTypes.string.isRequired,
  mapLinkText: PropTypes.string.isRequired,
  venueAddress: PropTypes.string.isRequired,
  venuePhone: PropTypes.string.isRequired,
  venueEmail: PropTypes.string.isRequired
};

export default ContactUs;
