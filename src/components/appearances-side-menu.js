import React from "react";
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

import ScheduleTabIcon from "./schedule-tab-icon.js";
import StageTabIcon from "./stages-tab-icon.js";

const window = Dimensions.get("window");
// const uri = "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png";
const uri = "../../img/helstonbury-icon.png";
import FavouritesButton from "../components/favourites-button.js";

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "white",
    padding: 20
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1
  },
  name: {
    position: "absolute",
    left: 70,
    top: 20
  },
  item: {
    fontSize: 14,
    fontWeight: "300",
    paddingTop: 5
  },
  itemSelected: {
    fontSize: 14,
    fontWeight: "300",
    paddingTop: 5,
    color: "lightgray"
  }
});

export default function Menu({
  currentAppearancesView,
  navigation,
  onItemSelected,
  handleShowFavouritesPress,
  showOnlyFavourites
}) {
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
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#007AFF" }}>
              <Icon active name="calendar" />
            </Button>
          </Left>
          <Body>
            <Text>By Day</Text>
          </Body>
          <Right>
            <Radio selected />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Button style={{ backgroundColor: "#007AFF" }}>
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
            <Radio selected />
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

Menu.propTypes = {
  currentAppearancesView: PropTypes.string.isRequired,
  showOnlyFavourites: PropTypes.bool.isRequired,
  handleShowFavouritesPress: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  onItemSelected: PropTypes.func.isRequired
};
