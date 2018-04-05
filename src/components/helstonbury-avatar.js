import React from "react";
import PropTypes from "prop-types";
import { Thumbnail } from "native-base";

const HelstonburyAvatar = ({ square = true, small = true }) => (
  <Thumbnail
    square={square}
    small={small}
    source={require("../../img/helstonbury-icon.png")}
  />
);

HelstonburyAvatar.propTypes = {
  small: PropTypes.bool,
  square: PropTypes.bool
};

export default HelstonburyAvatar;
