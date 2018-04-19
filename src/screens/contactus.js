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
    width: 75
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

const otherTextStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  info: { fontSize: 14 }
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
          <Text style={otherTextStyles.title}>Organsition</Text>
          <Text style={otherTextStyles.info}>{startBlurb}</Text>

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
                <TouchableOpacity
                  onPress={() => email([email1], null, null, "Helstonbury", "")}
                >
                  <Icon name="mail" style={touchStyles.icon} />
                </TouchableOpacity>
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
                  <Text style={touchStyles.text}>{email2}</Text>
                </TouchableOpacity>
              </Body>
              <Right>
                <TouchableOpacity
                  onPress={() => email([email2], null, null, "Helstonbury", "")}
                >
                  <Icon style={touchStyles.icon} name="mail" />
                </TouchableOpacity>
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
                <TouchableOpacity onPress={() => phonecall(mobile, true)}>
                  <Icon style={touchStyles.icon} name="call" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => text(mobile, true)}>
                  <Icon style={touchStyles.icon} name="text" />
                </TouchableOpacity>
              </Right>
            </ListItem>
          </List>

          <Text style={[otherTextStyles.title, { marginTop: 30 }]}>
            Location
          </Text>
          <Text style={otherTextStyles.info}>{gettingThereBlurb}</Text>
          <List style={{ marginTop: -20 }}>
            <ListItem>
              <Left style={[touchStyles.label, { flexGrow: 1 }]}>
                <Text style={touchStyles.labelText}>Address:</Text>
              </Left>
              <Body style={{ flexGrow: 4 }}>
                <Text style={otherTextStyles.info}>{venueAddress}</Text>
              </Body>
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
                <TouchableOpacity onPress={() => phonecall(venuePhone, true)}>
                  <Icon style={touchStyles.icon} name="call" />
                </TouchableOpacity>
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
                  <Icon style={touchStyles.icon} name="map" />
                </TouchableOpacity>
              </Right>
            </ListItem>
          </List>
          <Text style={{ marginTop: 30 }} />
        </Content>
      </Container>
    );
  }
}

/*
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
*/

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
