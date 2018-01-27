import React from "react";
import PropTypes from "prop-types";
import { Icon } from "native-base";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";

// tintColor passed in is an object
const BandsTabIcon = ({ tintColor }) => (
  <IconMaterialCommunity
    name="guitar-acoustic"
    // ios="ios-musical-note-outline"
    // android="md-musical-notes"
    size={30}
    style={{ color: tintColor }}
  />
);

BandsTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default BandsTabIcon;
