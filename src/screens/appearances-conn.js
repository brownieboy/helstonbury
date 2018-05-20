import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Appearances from "./appearanceswrapper.js";

// Reducers
import {
  getAppearancesList,
  filterAppearancesByBandId,
  groupAppearancesByDay,
  groupAppearancesByDayStage,
  getAppearancesGroupedByDay,
  getFetchStatus,
  loadAppearances,
  selectors as appearanceSelectors
} from "../dux/appearancesReducer.js";

import {
  getShowOnlyFavourites,
  setShowOnlyFavourites,
  getAppearancesView,
  setShowAppearancesView
  // getAppearancesSideMenuVisible,
  // setShowAppearancesSideMenu
} from "../dux/uiReducer.js";

const mapStateToProps = state => ({
  appearancesListByDateTime: appearanceSelectors.selectAppearancesByDateTime(
    state.appearancesState
  ),
  appearancesGroupedByDayThenStage: appearanceSelectors.selectAppearancesGroupedByDayThenStage(
    state.appearancesState
  ),
  favouritesState: state.favouritesState,
  favourites: state.favouritesState.favourites,
  fetchStatus: getFetchStatus(state),
  // appearancesGroupedByDay: getAppearancesGroupedByDay(state),
  showOnlyFavourites: getShowOnlyFavourites(state),
  appearancesView: getAppearancesView(state),
  appearancesList: getAppearancesList(state),
  // appearancesSideMenuVisible: getAppearancesSideMenuVisible(state),
  filterAppearancesByBandId: (appearances, bandsToFilterArray) =>
    filterAppearancesByBandId(appearances, bandsToFilterArray),
  groupAppearancesByDay: appearances => groupAppearancesByDay(appearances),
  groupAppearancesByDayStage: appearances =>
    groupAppearancesByDayStage(appearances)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadappearancesProp: loadAppearances,
      setShowOnlyFavourites,
      setShowAppearancesView
      // setShowAppearancesSideMenu
    },
    dispatch
  );

const AppearancesConn = connect(mapStateToProps, mapDispatchToProps)(
  Appearances
);

export default AppearancesConn;

/*
  getBandInfoForId: bandId =>
    getBandInfoForId(state.bandsState.bandsList, bandId),
*/
