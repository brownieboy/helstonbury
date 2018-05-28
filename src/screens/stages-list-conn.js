// import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import StagesList from "./stages-list.js";

// Dux stuff
import { selectors as stagesSelectors, selectStages } from "../dux/stagesReducer.js";

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  // stagesStateProp: state.stagesState,
  stagesList: selectStages(state)
  // stagesList: stagesSelectors.selectAlphabetical(state)
});

const StagesListConn = connect(mapStateToProps, mapDispatchToProps)(StagesList);

export default StagesListConn;
