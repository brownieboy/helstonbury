import React from "react";
import PropTypes from "prop-types";
// import { Platform } from "react-native";
// import IconEvil from "react-native-vector-icons/EvilIcons";
import { Icon } from "native-base";

// tintColor passed in is an object
/*
  <IconEvil
    name="calendar"
    size={Platform.OS === "ios" ? 35 : 30}
    style={{ color: tintColor }}
  />
  */
const ScheduleTabIcon = ({ tintColor }) => (
  <Icon name="calendar" ios="calendar" android="calendar" style={{ color: tintColor }} />
);

ScheduleTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default ScheduleTabIcon;
