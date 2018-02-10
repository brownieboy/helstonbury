// import { bindActionCreators } from "redux";
import React, { Component } from "react";

import { connect } from "react-redux";

// Components
import BandCard from "./band-card.js";
import BandsTabIcon from "../components/bands-tab-icon.js";

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
    tabBarLabel: "Bands List",
    tabBarIcon: ({ tintColor }) => <BandsTabIcon tintColor={tintColor} />
  };
  render() {
    return <BandCard {...this.props} />;
  }
}

const BandCardConn = connect(mapStateToProps, mapDispatchToProps)(
  BandCardWrapper
);

export default BandCardConn;
