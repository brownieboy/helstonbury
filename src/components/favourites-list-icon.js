import React from "react";
import PropTypes from "prop-types";
import { Icon } from "native-base";

// tintColor passed in is an object
const FavouritesListIcon = () => (
  <Icon
    ios="ios-heart"
    android="md-heart"
    style={{ fontSize: 16, color: "red", marginRight: 10 }}
  />
);

export default FavouritesListIcon;
