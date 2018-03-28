import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import AppearancesByDay from "./appearances-byday.js";
import AppearancesByDayStage from "./appearances-bydaystage.js";

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

const getCommonStateObject = state => ({
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
  showOnlyFavourites: false // Change this.  Get from local state
});

const mapStateToPropsByDay = state => ({
  ...getCommonStateObject(state),
  groupAppearancesByDay: appearances => groupAppearancesByDay(appearances)
});

const mapStateToPropsByDayStage = state => ({
  ...getCommonStateObject(state),
  groupAppearancesByDayStage: appearances =>
    groupAppearancesByDayStage(appearances)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadappearancesProp: loadAppearances }, dispatch);

export const AppearancesByDayConn = connect(
  mapStateToPropsByDay,
  mapDispatchToProps
)(AppearancesByDay);

export const AppearancesByDayStageConn = connect(
  mapStateToPropsByDayStage,
  mapDispatchToProps
)(AppearancesByDayStage);

/*
  getBandInfoForId: bandId =>
    getBandInfoForId(state.bandsState.bandsList, bandId),
*/
