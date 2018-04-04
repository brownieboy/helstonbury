import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import AppearancesByDay from "./appearances-byday.js";
import AppearancesByDayStage from "./appearances-bydaystage.js";

import {
  getAppearancesList,
  filterAppearancesByBandId,
  groupAppearancesByDay,
  groupAppearancesByDayStage,
  getAppearancesGroupedByDay,
  loadAppearances,
  selectors as appearanceSelectors
} from "../dux/appearancesReducer.js";

import {
  getShowOnlyFavourites,
  setShowOnlyFavourites,
  getAppearancesView,
  setShowAppearancesView,
  getAppearancesSideMenuVisible,
  setShowAppearancesSideMenu
} from "../dux/uiReducer.js";

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
  showOnlyFavourites: getShowOnlyFavourites(state),
  appearancesView: getAppearancesView(state),
  appearancesList: getAppearancesList(state),
  appearancesSideMenuVisible: getAppearancesSideMenuVisible(state),
  filterAppearancesByBandId: (appearances, bandsToFilterArray) =>
    filterAppearancesByBandId(appearances, bandsToFilterArray)
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
  bindActionCreators(
    {
      loadappearancesProp: loadAppearances,
      setShowOnlyFavourites,
      setShowAppearancesView,
      setShowAppearancesSideMenu
    },
    dispatch
  );

export const AppearancesByDayConn = connect(
  mapStateToPropsByDay,
  mapDispatchToProps
)(AppearancesByDay);

export const AppearancesByDayStageConn = connect(
  mapStateToPropsByDayStage,
  mapDispatchToProps
)(AppearancesByDayStage);
