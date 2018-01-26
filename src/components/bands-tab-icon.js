import React from "react";
import { Icon } from "native-base";

// tintColor passed in is an object
const BandsTabIcon = ({ tintColor }) => (
  <Icon
    name="guitar-acoustic"
    // ios="ios-musical-note-outline"
    // android="md-musical-notes"
    size={30}
    style={{ color: tintColor }}
  />
);

export default BandsTabIcon;
