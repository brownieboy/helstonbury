import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  //   Dimensions,
  Alert,
  Platform
  //   StyleSheet,
  //   ScrollView,
  //   View,
  //   Image
} from "react-native";

import {
  Container,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Left,
  Right,
  Body,
  Switch
  // Radio,
  // Thumbnail
} from "native-base";

import IconMaterialEntypo from "react-native-vector-icons/Entypo";
import ScheduleTabIcon from "../components/schedule-tab-icon.js";

import { CLEAR_ALL_LOCAL_DATA } from "../dux/homeReducer.js";

const styles = {
  menuItems: {
    text: {
      fontSize: 12
    }
  }
};

class HomeMenu extends PureComponent {
  static navigationOptions = {
    tabBarLabel: "by Day",
    tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  };

  render() {
    const { clearAllLocalData, closeSideMenu } = this.props;

    return (
      <Container
        style={{
          backgroundColor: "#FFF",
          borderRadius: 5,
          marginTop: Platform.OS === "ios" ? 10 : 0,
          flex: 1
        }}
      >
        <Content padder>
          <ListItem icon>
            <Body
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-start"
              }}
            >
              <Icon name="settings" style={{ fontSize: 17, marginRight: 10 }} />
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>Options</Text>
            </Body>
          </ListItem>

          <ListItem icon last>
            <Left>
              <Icon name="refresh" />
            </Left>
            <Body>
              <Text style={styles.menuItems.text}>Clear local data</Text>
            </Body>
            <Right>
              <Switch
                value={false}
                onChange={() => {
                  console.log("switched clear cache");
                  Alert.alert(
                    "Clear Cache",
                    "Clear all local data and pull down from server afresh?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => clearAllLocalData() }
                    ],
                    { cancelable: true }
                  );
                }}
              />
            </Right>
          </ListItem>

          <ListItem>
            <Body style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                small
                onPress={() => {
                  closeSideMenu();
                }}
              >
                <Text>Close Menu</Text>
              </Button>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

HomeMenu.propTypes = {
  clearAllLocalData: PropTypes.func.isRequired,
  closeSideMenu: PropTypes.func.isRequired
};

export default HomeMenu;
