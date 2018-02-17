import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Appearances from "./appearances.js";

// Reducer
import {
  loadAppearances,
  selectors as appearanceSelectors
} from "../dux/appearancesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadappearancesProp: loadAppearances }, dispatch);

const mapStateToProps = state => ({
  // appearancesProp: state.appearancesState,
  appearancesListByDateTime: appearanceSelectors.selectAppearancesByDateTime(
    state.appearancesState
  ),
  appearancesGroupedByDayThenStage: appearanceSelectors.selectAppearancesGroupedByDayThenStage(
    state.appearancesState
  ),
  favouritesState: state.favouritesState
});

const AppearancesConn = connect(mapStateToProps, mapDispatchToProps)(
  Appearances
);

export default AppearancesConn;
