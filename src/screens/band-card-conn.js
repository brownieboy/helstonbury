import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";

// Components
import BandCard from "./band-card.js";
import BandsTabIcon from "../components/bands-tab-icon.js";

// Dux stuff
import { selectors as bandSelectors } from "../dux/bandsReducer.js";
import { selectors as appearancesSelectors } from "../dux/appearancesReducer.js";
import { toggleBandFavouriteStatus } from "../dux/favouritesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleBandFavouriteStatus }, dispatch);

const mapStateToProps = state => ({
  bandsAlphabetical: bandSelectors.selectAlphabetical(state.bandsState),
  appearancesByBandThenDateTime: appearancesSelectors.selectAppearancesByBandNameThenDateTime(
    state
  ),
  favouritesState: state.favouritesState
});

class BandCardWrapper extends Component {
  static navigationOptions = {
    tabBarLabel: "Bands",
    tabBarIcon: ({ tintColor }) => <BandsTabIcon tintColor={tintColor} />
  };
  render() {
    return <BandCard {...this.props} parentList="Bands" />;
  }
}

const BandCardConn = connect(mapStateToProps, mapDispatchToProps)(
  BandCardWrapper
);

export default BandCardConn;
