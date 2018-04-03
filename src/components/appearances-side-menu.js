import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text
} from "react-native";

const window = Dimensions.get("window");
const uri = "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png";
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
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri }} />
        <Text style={styles.name}>Your name</Text>
      </View>
      <Text onPress={() => onItemSelected("About")} style={styles.item}>
        About
      </Text>
      <Text onPress={() => onItemSelected("Contacts")} style={styles.item}>
        Contacts
      </Text>
      <Text
        onPress={() => navigation.navigate("AppearancesByDay")}
        style={
          currentAppearancesView !== "day" ? styles.item : styles.itemSelected
        }
      >
        Show by Day
      </Text>
      <Text
        onPress={() => navigation.navigate("AppearancesByDayStage")}
        style={
          currentAppearancesView !== "stage" ? styles.item : styles.itemSelected
        }
      >
        Show by Stage
      </Text>
      <FavouritesButton
        selected={showOnlyFavourites}
        handlePress={handleShowFavouritesPress}
      />
    </ScrollView>
  );
}

Menu.propTypes = {
  currentAppearancesView: PropTypes.string.isRequired,
  showOnlyFavourites: PropTypes.bool.isRequired,
  handleShowFavouritesPress: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  onItemSelected: PropTypes.func.isRequired
};
