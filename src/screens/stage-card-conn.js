import React, { Component } from "react";
// import { bindActionCreators } from "redux";

import { connect } from "react-redux";

// Components
import StageCard from "./stage-card.js";
import StagesTabIcon from "../components/stages-tab-icon.js";

// Dux stuff
import { selectors as stagesSelectors } from "../dux/stagesReducer.js";

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  stagesList: stagesSelectors.selectAlphabetical(state)
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
