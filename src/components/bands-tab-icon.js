import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";

// tintColor passed in is an object
const BandsTabIcon = ({ tintColor }) => (
  <IconMaterialCommunity
    name="guitar-acoustic"
    size={Platform.OS === "android" ? 25 : 30}
    style={{ color: tintColor }}
  />
);

BandsTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default BandsTabIcon;
