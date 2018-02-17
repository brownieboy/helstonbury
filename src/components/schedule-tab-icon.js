import React from "react";
import PropTypes from "prop-types";
import { Platform } from "react-native";
// import { Icon } from "native-base";
import IconEvil from "react-native-vector-icons/EvilIcons";

// tintColor passed in is an object
const ScheduleTabIcon = ({ tintColor }) => (
  <IconEvil
    name="calendar"
    size={Platform.OS === "ios" ? 35 : 30}
    style={{ color: tintColor }}
  />
);

ScheduleTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default ScheduleTabIcon;
