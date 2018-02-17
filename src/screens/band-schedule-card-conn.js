import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import React, { Component } from "react";

// Components
import BandCard from "./band-card.js";
import ScheduleTabIcon from "../components/schedule-tab-icon.js";

// Dux stuff
import { selectors as bandSelectors } from "../dux/bandsReducer.js";
import { selectors as appearancesSelectors } from "../dux/appearancesReducer.js";
import { toggleBandFavouriteStatus } from "../dux/favouritesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleBandFavouriteStatus }, dispatch);
const mapStateToProps = state => ({
  bandsAlphabetical: bandSelectors.selectAlphabetical(state.bandsState),
  appearancesByBandThenDateTime: appearancesSelectors.selectAppearancesByBandNameThenDateTime(
    state.appearancesState
  ),
  favouritesState: state.favouritesState
});

class BandCardWrapper extends Component {
  static navigationOptions = {
    tabBarLabel: "Schedule",
    tabBarIcon: ({ tintColor }) => <ScheduleTabIcon tintColor={tintColor} />
  };
  render() {
    return <BandCard {...this.props} parentList="Schedule" />;
  }
}

const BandCardConn = connect(mapStateToProps, mapDispatchToProps)(
  BandCardWrapper
);

export default BandCardConn;
