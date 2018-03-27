import React from "react";
import PropTypes from "prop-types";
import { Icon } from "native-base";

// tintColor passed in is an object
const FavouritesListIcon = ({ style }) => (
  <Icon
    ios="ios-heart"
    android="md-heart"
    style={{
      color: "red",
      fontSize: 14,
      ...style
    }}
  />
);

export default FavouritesListIcon;
