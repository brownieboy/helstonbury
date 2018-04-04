import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Image
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  ListItem,
  Text,
  Badge,
  Left,
  Right,
  Body,
  Switch,
  Radio,
  Picker,
  Separator,
  Thumbnail
} from "native-base";

import IconMaterialEntypo from "react-native-vector-icons/Entypo";

const window = Dimensions.get("window");
// const uri = "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png";
const uri = "../../img/helstonbury-icon.png";

/*
{
  currentAppearancesView,
  navigation,
  onItemSelected,
  handleShowFavouritesPress,
  showOnlyFavourites
}
 */

class AppearancesMenu extends Component {
  constructor(props) {
    super(props);
    const { currentAppearancesView, showOnlyFavourites } = this.props;

    this.state = {
      currentAppearancesView,
      showOnlyFavourites
    };
  }

  handleDayStagePress = dayStage => {
    console.log("handleDayStagePress, dayStage=" + dayStage);
    const { handleSetAppearancesView, navigation, onItemSelected } = this.props;
    const navigateTo =
      dayStage === "stage" ? "AppearancesByDayStage" : "AppearancesByDay";
    // this.setState({ currentAppearancesView: dayStage });
    handleSetAppearancesView(dayStage);
    setTimeout(() => {
      navigation.navigate(navigateTo);
      onItemSelected(dayStage);
    }, 300);
  };

  render() {
    const {
      currentAppearancesView,
      onItemSelected,
      handleShowFavouritesPress
    } = this.props;

    const { showOnlyFavourites } = this.state;
    console.log(
      "menu.render..currentAppearancesView = " + currentAppearancesView
    );

    return (
      <Container
        style={{
          backgroundColor: "#FFF",
          marginTop: 20
        }}
      >
        <Content padder>
          <ListItem avatar>
            <Left>
              <Thumbnail source={require(uri)} />
            </Left>
            <Body>
              <Title>Schedule</Title>
            </Body>
            <Right />
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
              <Text>By Day</Text>
            </Body>
            <Right>
              <Radio selected={currentAppearancesView === "day"} />
            </Right>
          </ListItem>
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
              <Text>By Stage</Text>
            </Body>
            <Right>
              <Radio selected={currentAppearancesView === "stage"} />
            </Right>
          </ListItem>
          <ListItem
            icon
            last
            onPress={() => {
              handleShowFavouritesPress();
              onItemSelected("favourites");
            }}
          >
            <Left>
              <Button style={{ backgroundColor: "#5855D6" }}>
                <Icon
                  active
                  ios={showOnlyFavourites ? "ios-heart-outline" : "ios-heart"}
                  android={showOnlyFavourites ? "md-heart-outline" : "md-heart"}
                  onPress={() => {
                    handleShowFavouritesPress();
                    onItemSelected("favourites");
                  }}
                />
              </Button>
            </Left>
            <Body>
              <Text>Favourites only</Text>
            </Body>
            <Right>
              <Text>Yes</Text>
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

/*
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
  currentAppearancesView: PropTypes.string.isRequired,
  showOnlyFavourites: PropTypes.bool.isRequired,
  handleShowFavouritesPress: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  onItemSelected: PropTypes.func.isRequired
};

export default AppearancesMenu;
