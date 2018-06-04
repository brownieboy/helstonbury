import React, { Component } from "react";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";

// Components
import BandCard from "./band-card.js";
import BandsTabIcon from "../components/bands-tab-icon.js";

// Dux stuff
import {
  // selectors as bandSelectors,
  selectBandDetails
} from "../dux/bandsReducer.js";
import {
  // selectors as appearancesSelectors,
  selectAppearancesForBandByDateTime
} from "../dux/appearancesReducer.js";
import { toggleBandFavouriteStatus } from "../dux/favouritesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleBandFavouriteStatus }, dispatch);

const mapStateToProps = (state, props) => ({
  // bandsAlphabetical: bandSelectors.selectAlphabetical(state),
  // appearancesByBandThenDateTime: appearancesSelectors.selectAppearancesByBandNameThenDateTime(
  //   state
  // ),
  favouritesState: state.favouritesState,
  selectAppearancesForBandByDateTime: selectAppearancesForBandByDateTime(
    state,
    props
  ),
  selectBandDetails: selectBandDetails(state, props)
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
