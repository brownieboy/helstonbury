import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Icon } from "native-base";

const NoAppearancesToDisplayMessage = ({ showOnlyFavourites = false }) => (
  <View style={{ margin: 20 }}>
    <Text>There are no appearances currently available to display.</Text>
    {showOnlyFavourites && (
      <Fragment>
        <Text />
        <Text>
          You might try turning off the
          <Text style={{ fontWeight: "bold" }}> Favourites only </Text>
          setting (under the{" "}
          <Icon
            ios="ios-options"
            android="md-options"
            style={{ fontSize: 20 }}
          />{" "}
          icon at top right of screen).
        </Text>
      </Fragment>
    )}
  </View>
);
// ${<Text style={{fontWeight: "bold"}}>}

NoAppearancesToDisplayMessage.propTypes = {
  showOnlyFavourites: PropTypes.bool
};

export default NoAppearancesToDisplayMessage;
