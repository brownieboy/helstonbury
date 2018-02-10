import React from "react";
import PropTypes from "prop-types";
// import { Icon } from "native-base";
import IconMaterial from "react-native-vector-icons/MaterialIcons";

// tintColor passed in is an object
const ScheduleTabIcon = ({ tintColor }) => (
  <IconMaterial name="schedule" size={25} style={{ color: tintColor }} />
);

ScheduleTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default ScheduleTabIcon;

