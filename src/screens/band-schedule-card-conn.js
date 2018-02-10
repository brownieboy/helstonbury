// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React, { Component } from "react";
import IconMaterial from "react-native-vector-icons/MaterialIcons";


// Components
import BandCard from "./band-card.js";

// Dux stuff
import { selectors as bandSelectors } from "../dux/bandsReducer.js";
import { selectors as appearancesSelectors } from "../dux/appearancesReducer.js";

const mapDispatchToProps = () => ({});
const mapStateToProps = state => ({
  bandsAlphabetical: bandSelectors.selectAlphabetical(state.bandsState),
  appearancesByBandThenDateTime: appearancesSelectors.selectAppearancesByBandNameThenDateTime(
    state.appearancesState
  )
});

class BandCardWrapper extends Component {
  static navigationOptions = {
    tabBarLabel: "Schedule",
    tabBarIcon: ({ tintColor }) => (
      <IconMaterial name="schedule" size={25} style={{ color: tintColor }} />
    )
  };
  render() {
    return <BandCard {...this.props} parentList="Schedule" />;
  }
}

const BandCardConn = connect(mapStateToProps, mapDispatchToProps)(BandCardWrapper);

export default BandCardConn;
