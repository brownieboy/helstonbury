import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Appearances from "./appearanceswrapper.js";

// Reducer
import {
  getAppearancesList,
  filterAppearancesByBandId,
  groupAppearancesByDay,
  groupAppearancesByDayStage,
  getAppearancesGroupedByDay,
  loadAppearances,
  selectors as appearanceSelectors
} from "../dux/appearancesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadappearancesProp: loadAppearances }, dispatch);

/*
  getAppearanceInfoForId: appearanceId =>
    getAppearanceInfoForIdAction(
      state.appearancesState.appearancesList,
      appearanceId
    )
 */

const mapStateToProps = state => ({
  // appearancesProp: state.appearancesState,
  appearancesListByDateTime: appearanceSelectors.selectAppearancesByDateTime(
    state.appearancesState
  ),
  appearancesGroupedByDayThenStage: appearanceSelectors.selectAppearancesGroupedByDayThenStage(
    state.appearancesState
  ),
  favouritesState: state.favouritesState,
  favourites: state.favouritesState.favourites,
  appearancesGroupedByDay: getAppearancesGroupedByDay(state),
  appearancesList: getAppearancesList(state),
  filterAppearancesByBandId: (appearances, bandsToFilterArray) =>
    filterAppearancesByBandId(appearances, bandsToFilterArray),
  groupAppearancesByDay: appearances => groupAppearancesByDay(appearances),
  groupAppearancesByDayStage: appearances =>
    groupAppearancesByDayStage(appearances)
});

const AppearancesConn = connect(mapStateToProps, mapDispatchToProps)(
  Appearances
);

export default AppearancesConn;

/*
  getBandInfoForId: bandId =>
    getBandInfoForId(state.bandsState.bandsList, bandId),
*/
