import React from "react";
import PropTypes from "prop-types";

import { Platform } from "react-native";
import { Button, Icon } from "native-base";

const FavouritesButton = ({ selected, handlePress }) => {
  let heart = "ios-heart";
  let heartOutline = "ios-heart-outline";
  if (Platform.OS === "android") {
    heart = "md-heart";
    heartOutline = "md-heart-outline";
  }
  return (
    <Button transparent>
      <Icon name={selected ? heart : heartOutline} onPress={handlePress} />
    </Button>
  );
};

FavouritesButton.propTypes = {
  handlePress: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired
};

export default FavouritesButton;
