import React from "react";
import PropTypes from "prop-types";
import { Icon } from "native-base";

// tintColor passed in is an object
const FavouritesListIcon = () => (
  <Icon
    ios="ios-heart"
    android="md-heart"
    style={{ ...this.props.style, color: "red" }}
  />
);

export default FavouritesListIcon;
