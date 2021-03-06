import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  //   Dimensions,
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

// import IconFontAwesome from "react-native-vector-icons/FontAwesome";

import IconMaterialEntypo from "react-native-vector-icons/Entypo";
import ScheduleTabIcon from "../components/schedule-tab-icon.js";

// const window = Dimensions.get("window");
// const uri = "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png";
// const uri = "../../img/helstonbury-icon.png";

const styles = {
  menuItems: {
    text: {
      fontSize: 12
    }
  }
};

/*
{
  currentAppearancesView,
  navigation,
  onItemSelected,
  handleShowFavouritesPress,
  showOnlyFavourites
}
 */

class AppearancesMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showOnlyFavourites: props.showOnlyFavourites,
      reverseTimesOrder: props.reverseTimesOrder
    };
  }

  // static navigationOptions = {
  //   tabBarLabel: "by Day",
  //   tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  // };

  toggleShowFavourites = () => {
    // const {
    //   // onItemSelected,
    //   // setShowOnlyFavourites,
    //   showOnlyFavourites
    // } = this.props;
    // setShowOnlyFavourites(!showOnlyFavourites);
    const { showOnlyFavourites } = this.state;
    this.setState({ showOnlyFavourites: !showOnlyFavourites });
  };

  toggleReverseTimesOrder = () => {
    // const {
    //   // onItemSelected,
    //   reverseTimesOrder
    //   // setReverseTimesOrder
    // } = this.props;
    // setReverseTimesOrder(!reverseTimesOrder);
    const { reverseTimesOrder } = this.state;
    this.setState({ reverseTimesOrder: !reverseTimesOrder });
  };

  render() {
    const {
      // activeAppearancesScreen,
      closeSideMenu,
      // onItemSelected,
      // handleShowFavouritesPress,
      // reverseTimesOrder,
      // showOnlyFavourites
      setShowOnlyFavourites,
      setReverseTimesOrder
    } = this.props;

    const { reverseTimesOrder, showOnlyFavourites } = this.state;
    // console.log(
    //   "menu.render..currentAppearancesView = " + currentAppearancesView
    // );
    //              <Thumbnail source={require(uri)} />

    return (
      <Container
        style={{
          backgroundColor: "#FFF",
          borderRadius: 5,
          marginTop: Platform.OS === "ios" ? 10 : 0
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
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                Schedule Options
              </Text>
            </Body>
          </ListItem>

          <ListItem icon last onPress={this.toggleShowFavourites}>
            <Left>
              <Button style={{ backgroundColor: "white" }}>
                <Icon
                  active
                  ios={showOnlyFavourites ? "ios-heart" : "ios-heart-outline"}
                  android={showOnlyFavourites ? "md-heart" : "md-heart-outline"}
                  style={{ color: showOnlyFavourites ? "red" : "grey" }}
                  onPress={this.toggleShowFavourites}
                />
              </Button>
            </Left>
            <Body>
              <Text style={styles.menuItems.text}>Favourites only</Text>
            </Body>
            <Right>
              <Switch
                value={showOnlyFavourites}
                onChange={this.toggleShowFavourites}
                onTintColor="#50B948"
              />
            </Right>
          </ListItem>
          <ListItem icon last onPress={this.toggleReverseTimesOrder}>
            <Left>
              <Button style={{ backgroundColor: "white" }}>
                <IconMaterialEntypo
                  active
                  name="back-in-time"
                  size={22}
                  style={{ color: reverseTimesOrder ? "blue" : "grey" }}
                  onPress={this.toggleReverseTimesOrder}
                />
              </Button>
            </Left>
            <Body>
              <Text style={styles.menuItems.text}>Reverse times</Text>
            </Body>
            <Right>
              <Switch
                value={reverseTimesOrder}
                onChange={this.toggleReverseTimesOrder}
                onTintColor="#50B948"
              />
            </Right>
          </ListItem>
          <ListItem>
            <Body style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button
                small
                onPress={() => {
                  closeSideMenu();
                  setShowOnlyFavourites(showOnlyFavourites);
                  setReverseTimesOrder(reverseTimesOrder);
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

/*

                <IconFontAwesome
                  active
                  name="toggle-down"
                  style={{ color: reverseTimesOrder ? "blue" : "grey" }}
                  onPress={this.toggleReverseTimesOrder}
                />

         <ListItem icon onPress={() => this.handleDayStagePress("stage")}>
            <Left>
              <Button
                onPress={() => this.handleDayStagePress("stage")}
                style={{ backgroundColor: "#007AFF" }}
              >
                <IconMaterialEntypo
                  active
                  name="modern-mic"
                  size={20}
                  style={{ color: "white" }}
                />
              </Button>
            </Left>
            <Body>
              <Text style={styles.menuItems.text}>Times by Day/Stage</Text>
            </Body>
            <Right>
              <Radio
                onPress={() => this.handleDayStagePress("stage")}
                selected={activeAppearancesScreen === "stage"}
              />
            </Right>
          </ListItem>
          <ListItem icon onPress={() => this.handleDayStagePress("day")}>
            <Left>
              <Button
                onPress={() => this.handleDayStagePress("day")}
                style={{ backgroundColor: "#007AFF" }}
              >
                <Icon active name="calendar" />
              </Button>
            </Left>
            <Body>
              <Text style={styles.menuItems.text}>Times by Day</Text>
            </Body>
            <Right>
              <Radio
                onPress={() => this.handleDayStagePress("day")}
                selected={activeAppearancesScreen === "day"}
              />
            </Right>
          </ListItem>






          <ListItem icon last onPress={this.toggleShowFavourites}>
            <Left>
              <Button style={{ backgroundColor: "white" }}>
                <IconFontAwesome
                  active
                  name="toggle-down"
                  style={{ color: showOnlyFavourites ? "blue" : "grey" }}
                  onPress={this.toggleShowFavourites}
                />
              </Button>
            </Left>
            <Body>
              <Text style={styles.menuItems.text}>Reverse days</Text>
            </Body>
            <Right>
              <Switch
                value={showOnlyFavourites}
                onChange={this.toggleShowFavourites}
                onTintColor="#50B948"
              />
            </Right>
          </ListItem>


    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={require(uri)} />
        <Text style={styles.name}>Helstonbury Schedule</Text>
      </View>

      <Button
        transparent
        onPress={() => {
          onItemSelected();
          navigation.navigate("AppearancesByDay");
        }}
      >
        <StageTabIcon
          tintColor={currentAppearancesView === "stage" ? "blue" : "gray"}
        />
        <Text
          style={
            currentAppearancesView !== "day" ? styles.item : styles.itemSelected
          }
        >
          Show by Day
        </Text>
      </Button>
      <Button
        transparent
        onPress={() => {
          onItemSelected();
          navigation.navigate("AppearancesByDayStage");
        }}
      >
        <ScheduleTabIcon
          tintColor={currentAppearancesView === "day" ? "blue" : "gray"}
        />
        <Text
          style={
            currentAppearancesView !== "stage"
              ? styles.item
              : styles.itemSelected
          }
        >
          Show by Stage
        </Text>
      </Button>

      <FavouritesButton
        selected={showOnlyFavourites}
        handlePress={handleShowFavouritesPress}
      />
    </ScrollView>
 */

AppearancesMenu.propTypes = {
  activeAppearancesScreen: PropTypes.string.isRequired,
  // currentAppearancesView: PropTypes.object,
  // handleSetActiveAppearanceScreen: PropTypes.func.isRequired,
  showOnlyFavourites: PropTypes.bool.isRequired,
  setShowOnlyFavourites: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  closeSideMenu: PropTypes.func.isRequired,
  reverseTimesOrder: PropTypes.bool.isRequired,
  setReverseTimesOrder: PropTypes.func.isRequired
};

export default AppearancesMenu;
