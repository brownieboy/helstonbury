import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  Container,
  H1,
  H2,
  H3,
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
import ParsedText from "react-native-parsed-text";
import openMap from "react-native-open-maps";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import IconFontFeather from "react-native-vector-icons/Feather";

import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

import { email, text, web, phonecall } from "react-native-communications";

import styles from "../styles/band-card-styles.js";
// import tabNavStyles from "../styles/tab-navigator-touchStyles.js";
// import IconMaterialEntypo from "react-native-vector-icons/Entypo";
import HelstonburyAvatar from "../components/helstonbury-avatar.js";
import openFacebookLink from "../helper-functions/open-facebook-link.js";
import { parsedTextArray } from "../helper-functions/text-links.js";

import { rnViewStyles } from "../styles/general-styles.js";
const touchStyles = StyleSheet.create({
  text: {
    color: "blue",
    // textDecorationLine: "underline",
    fontSize: 14
  },
  textNoLink: {
    fontSize: 14
  },
  label: {
    // width: 75
  },
  labelText: {
    // width: 70,
    fontSize: 12
    // borderWidth: 1,
    // borderColor: "red"
  },
  icon: {
    color: "blue",
    fontSize: 20
  }
});

const otherTextStyles = StyleSheet.create({
  info: { fontSize: 14 },
  sectionHeader: { fontSize: 14, fontWeight: "bold", marginLeft: -6 }
});

// const listItemIconStyles = StyleSheet.create({
//   leftItem: {
//     display: "flex",
//     alignItems: "flex-start",
//     flex: 2,
//     borderWidth: 1,
//     paddingLeft: 0
//   },
//   bodyItem: {
//     flex: 6
//   },
//   rightItem: {
//     flex: 2
//   }
// });

const listItemStyles = StyleSheet.create({
  listItem: {
    height: 40
  },
  leftItem: {
    flex: 4
  },
  bodyItem: {
    flex: 16
  },
  rightItem: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

const HelstonburyFBMerchandiseListItem = ({
  helstonburyFBID,
  helstonburyMerchandiseFBID,
  helstonburyMerchandiseFBText
}) => {
  // console.log("HelstonburyFBMerchandiseListItem");
  return (
    <ListItem style={listItemStyles.listItem}>
      <Left style={listItemStyles.leftItem}>
        <Text style={touchStyles.labelText}>Merch:</Text>
      </Left>
      <Body style={listItemStyles.bodyItem}>
        <TouchableOpacity
          onPress={() =>
            openFacebookLink(
              `${helstonburyFBID}/posts/${helstonburyMerchandiseFBID}`,
              true
            )
          }
        >
          <Text style={touchStyles.text}>{helstonburyMerchandiseFBText}</Text>
        </TouchableOpacity>
      </Body>
      <Right style={listItemStyles.rightItem}>
        <TouchableOpacity
          onPress={() =>
            openFacebookLink(
              `${helstonburyFBID}/posts/${helstonburyMerchandiseFBID}`,
              true
            )
          }
        >
          <Icon style={touchStyles.icon} name="shirt" />
        </TouchableOpacity>
      </Right>
    </ListItem>
  );
};

class ContactUs extends Component {
  // static navigationOptions = {
  //   tabBarLabel: "Info",
  //   tabBarIcon: ({ tintColor }) => (
  //     <Icon
  //       android="md-information-circle"
  //       ios="ios-information-circle-outline"
  //       style={{ color: tintColor }}
  //     />
  //   )
  // };

  getAppTips = () => {
    const { appTips } = this.props;
    if (typeof appTips !== "undefined" && appTips !== "") {
      return (
        <Fragment>
          <ListItem itemDivider style={{ marginTop: 30, marginBottom: 10 }}>
            <Text style={otherTextStyles.sectionHeader}>
              Tips on using the app
            </Text>
          </ListItem>
          <View style={rnViewStyles.parsedTextViewWrapper}>
            <ParsedText
              parse={parsedTextArray}
              childrenProps={{ allowFontScaling: false }}
            >
              {appTips}
            </ParsedText>
          </View>
        </Fragment>
      );
    }

    return null;
  };

  render() {
    // 50.100415, -5.276919
    const {
      startBlurb,
      email1,
      email2,
      mobile,
      locationBlurb = "",
      gettingThereBlurb = "",
      mapLinkText = "",
      helstonburyWebUrl = "http://www.helstonbury.com",
      helstonburyFBID = "",
      helstonburyMerchandiseFBID = "",
      helstonburyMerchandiseFBText,
      // helstonburyFBID = "382432781776899",
      // helstonburyMerchandiseFBID = "1555153094504856",
      venueAddress,
      venuePhone,
      venueEmail,
      appTips
    } = this.props;

    // console.log("contactus.js page, props:");
    // console.log(this.props);

    const developerDetails = `App developed for ${
      Platform.OS === "ios" ? "iOS" : "Android"
    } by Michael Brown, brownieboy@gmail.com. Also available for ${
      Platform.OS === "ios"
        ? "Android on Google Play"
        : "iOS in the Apple App Store"
    }.`;

    return (
      <Container style={styles.container}>
        <Header>
          <Left style={{ flex: 2 }}>
            <HelstonburyAvatar />
          </Left>
          <Body style={{ flex: 6 }}>
            <Title>About Helstonbury</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>

        <Content padder>
          <ListItem itemDivider style={{ marginBottom: 10 }}>
            <Text style={otherTextStyles.sectionHeader}>Organisation</Text>
          </ListItem>
          <View style={rnViewStyles.parsedTextViewWrapper}>
            <ParsedText
              parse={parsedTextArray}
              childrenProps={{ allowFontScaling: false }}
            >
              {startBlurb}
            </ParsedText>
          </View>

          <List>
            <ListItem style={listItemStyles.listItem}>
              <Left style={listItemStyles.leftItem}>
                <Text style={touchStyles.labelText}>Email:</Text>
              </Left>
              <Body style={listItemStyles.bodyItem}>
                <TouchableOpacity
                  onPress={() => email([email1], null, null, "Helstonbury", "")}
                >
                  <Text style={touchStyles.text}>{email1}</Text>
                </TouchableOpacity>
              </Body>
              <Right style={listItemStyles.rightItem}>
                <TouchableOpacity
                  onPress={() => email([email1], null, null, "Helstonbury", "")}
                >
                  <IconFontFeather name="mail" style={touchStyles.icon} />
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem style={listItemStyles.listItem}>
              <Left style={[listItemStyles.leftItem]}>
                <Text style={touchStyles.labelText}>Mobile:</Text>
              </Left>
              <Body style={[listItemStyles.bodyItem, { flex: 15 }]}>
                <TouchableOpacity onPress={() => phonecall(mobile, true)}>
                  <Text style={touchStyles.text}>{mobile}</Text>
                </TouchableOpacity>
              </Body>
              <Right style={[listItemStyles.rightItem, { flex: 4 }]}>
                <TouchableOpacity onPress={() => phonecall(mobile, true)}>
                  <Icon style={touchStyles.icon} name="call" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => text(mobile, true)}>
                  <Icon style={touchStyles.icon} name="text" />
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem style={listItemStyles.listItem}>
              <Left style={listItemStyles.leftItem}>
                <Text style={touchStyles.labelText}>Facebook:</Text>
              </Left>
              <Body style={listItemStyles.bodyItem}>
                <TouchableOpacity
                  onPress={() => openFacebookLink(helstonburyFBID)}
                >
                  <Text style={touchStyles.text}>Helstonbury Facebook</Text>
                </TouchableOpacity>
              </Body>
              <Right style={listItemStyles.rightItem}>
                <TouchableOpacity
                  onPress={() => openFacebookLink(helstonburyFBID)}
                >
                  <Icon style={touchStyles.icon} name="logo-facebook" />
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem style={listItemStyles.listItem}>
              <Left style={listItemStyles.leftItem}>
                <Text style={touchStyles.labelText}>Web:</Text>
              </Left>
              <Body style={listItemStyles.bodyItem}>
                <TouchableOpacity onPress={() => web(helstonburyWebUrl)}>
                  <Text style={touchStyles.text}>{helstonburyWebUrl}</Text>
                </TouchableOpacity>
              </Body>
              <Right style={listItemStyles.rightItem}>
                <TouchableOpacity onPress={() => web(helstonburyWebUrl)}>
                  <IconFontAwesome
                    style={[touchStyles.icon, { fontSize: 25 }]}
                    name={Platform.OS === "ios" ? "safari" : "chrome"}
                  />
                </TouchableOpacity>
              </Right>
            </ListItem>
            {helstonburyMerchandiseFBID !== "" ? (
              <HelstonburyFBMerchandiseListItem
                helstonburyFBID={helstonburyFBID}
                helstonburyMerchandiseFBID={helstonburyMerchandiseFBID}
                helstonburyMerchandiseFBText={helstonburyMerchandiseFBText}
              />
            ) : null}
          </List>

          <ListItem itemDivider style={{ marginTop: 30, marginBottom: 10 }}>
            <Text style={otherTextStyles.sectionHeader}>Location</Text>
          </ListItem>
          {locationBlurb !== "" ? (
            <View
              style={[rnViewStyles.parsedTextViewWrapper, { marginBottom: 15 }]}
            >
              <ParsedText
                parse={parsedTextArray}
                childrenProps={{ allowFontScaling: false }}
              >
                {locationBlurb}
              </ParsedText>
            </View>
          ) : null}
          <List style={{ marginTop: -15 }}>
            <ListItem>
              <Left style={listItemStyles.leftItem}>
                <Text style={touchStyles.labelText}>Address:</Text>
              </Left>
              <Body style={listItemStyles.bodyItem}>
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
                    {venueAddress !== "" ? venueAddress : "Open in Google Maps"}
                  </Text>
                </TouchableOpacity>
              </Body>
              <Right style={listItemStyles.rightItem}>
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

            <ListItem style={listItemStyles.listItem}>
              <Left style={listItemStyles.leftItem}>
                <Text style={touchStyles.labelText}>Phone:</Text>
              </Left>
              <Body style={listItemStyles.bodyItem}>
                <TouchableOpacity onPress={() => phonecall(venuePhone, true)}>
                  <Text style={touchStyles.text}>{venuePhone}</Text>
                </TouchableOpacity>
              </Body>
              <Right style={listItemStyles.rightItem}>
                <TouchableOpacity onPress={() => phonecall(venuePhone, true)}>
                  <Icon style={touchStyles.icon} name="call" />
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem style={listItemStyles.listItem}>
              <Left style={listItemStyles.leftItem}>
                <Text style={touchStyles.labelText}>Email:</Text>
              </Left>
              <Body style={listItemStyles.bodyItem}>
                <TouchableOpacity
                  onPress={() => email([venueEmail], null, null, "", "")}
                >
                  <Text style={touchStyles.text}>{venueEmail}</Text>
                </TouchableOpacity>
              </Body>
              <Right style={listItemStyles.rightItem}>
                <TouchableOpacity
                  onPress={() => email([venueEmail], null, null, "", "")}
                >
                  <Icon name="mail" style={touchStyles.icon} />
                </TouchableOpacity>
              </Right>
            </ListItem>

            {gettingThereBlurb !== "" ? (
              <View
                style={[rnViewStyles.parsedTextViewWrapper, { marginTop: 15 }]}
              >
                <ParsedText
                  parse={parsedTextArray}
                  childrenProps={{ allowFontScaling: false }}
                >
                  {gettingThereBlurb}
                </ParsedText>
              </View>
            ) : null}
          </List>
          {this.getAppTips()}
          <ParsedText
            parse={parsedTextArray}
            childrenProps={{ allowFontScaling: false }}
            style={{
              marginTop: 60,
              marginBottom: 50,
              marginLeft: 10,
              marginRight: 10,
              fontSize: 12,
              fontStyle: "italic"
            }}
          >
            {developerDetails}
          </ParsedText>
        </Content>
      </Container>
    );
  }
}

/*



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

                  <TouchableOpacity
                  onPress={() => email([email2], null, null, "Helstonbury", "")}
                >
                  <Text style={touchStyles.text}>{email2}</Text>
                </TouchableOpacity>
            App developed by Michael Brown, brownieboy@gmail.com. Also
            available on {Platform.OS === "ios" ? "Android" : "iOS"}. See also
            http://www.browniesblog.com
          </ParsedText>

           <ParsedText
              parse={parsedTextArray}
              childrenProps={{ allowFontScaling: false }}
            >
              {homeText}
            </ParsedText>

            style={{ marginTop: 30, marginBottom: 30, fontSize: 12 }}

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
  email2: PropTypes.string,
  helstonburyWebUrl: PropTypes.string,
  helstonburyFBID: PropTypes.string,
  helstonburyMerchandiseFBID: PropTypes.string,
  helstonburyMerchandiseFBText: PropTypes.string,
  mobile: PropTypes.string.isRequired,
  gettingThereBlurb: PropTypes.string,
  locationBlurb: PropTypes.string,
  mapLinkText: PropTypes.string.isRequired,
  venueAddress: PropTypes.string.isRequired,
  venuePhone: PropTypes.string.isRequired,
  venueEmail: PropTypes.string.isRequired,
  appTips: PropTypes.string.isRequired
};

HelstonburyFBMerchandiseListItem.propTypes = {
  helstonburyFBID: PropTypes.string,
  helstonburyMerchandiseFBID: PropTypes.string,
  helstonburyMerchandiseFBText: PropTypes.string
};

export default ContactUs;
