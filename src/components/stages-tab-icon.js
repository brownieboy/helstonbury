import React from "react";
import PropTypes from "prop-types";
import IconMaterialEntypo from "react-native-vector-icons/Entypo";

// tintColor passed in is an object
const StageTabIcon = ({ tintColor }) => (
  <IconMaterialEntypo
    name="modern-mic"
    size={25}
    style={{ color: tintColor }}
  />
);

StageTabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

export default StageTabIcon;
