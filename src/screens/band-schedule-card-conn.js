import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import React, { Component } from "react";

// Components
import BandCard from "./band-card.js";
// import ScheduleTabIcon from "../components/schedule-tab-icon.js";

// Dux stuff
import { selectors as bandSelectors } from "../dux/bandsReducer.js";
import {
  // selectors as appearancesSelectors,
  selectAppearancesForBandByDateTime
} from "../dux/appearancesReducer.js";
import { toggleBandFavouriteStatus } from "../dux/favouritesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleBandFavouriteStatus }, dispatch);

const mapStateToProps = (state, props) => ({
  bandsAlphabetical: bandSelectors.selectAlphabetical(state.bandsState),
  // appearancesByBandThenDateTime: appearancesSelectors.selectAppearancesByBandNameThenDateTime(
  //   state
  // ),
  selectAppearancesForBandByDateTime: selectAppearancesForBandByDateTime(
    state,
    props
  ),
  favouritesState: state.favouritesState
});

// class BandCardWrapper extends Component {
//   static navigationOptions = {
//     tabBarLabel: "Schedule",
//     tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
//   };
//   render() {
//     return <BandCard {...this.props} />;
//   }
// }

const BandCardConn = connect(mapStateToProps, mapDispatchToProps)(BandCard);

export default BandCardConn;
