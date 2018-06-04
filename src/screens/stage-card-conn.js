import React, { Component } from "react";
// import { bindActionCreators } from "redux";

import { connect } from "react-redux";

// Components
import StageCard from "./stage-card.js";
import StagesTabIcon from "../components/stages-tab-icon.js";

// Dux stuff
import {
  // selectors as stagesSelectors,
  // selectStagesBySortOrder,
  selectStageDetails
} from "../dux/stagesReducer.js";

const mapDispatchToProps = () => ({});

const mapStateToProps = (state, props) => ({
  // stagesList: stagesSelectors.selectAlphabetical(state)
  // stagesList: selectStagesBySortOrder(state),
  selectStageDetails: selectStageDetails(state, props)
});

class StageCardWrapper extends Component {
  static navigationOptions = {
    tabBarLabel: "Stages",
    tabBarIcon: ({ tintColor }) => <StagesTabIcon tintColor={tintColor} />
  };
  render() {
    return <StageCard {...this.props} parentList="Stages" />;
  }
}

const StageCardConn = connect(mapStateToProps, mapDispatchToProps)(
  StageCardWrapper
);

export default StageCardConn;
