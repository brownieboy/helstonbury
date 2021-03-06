import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Appearances from "./appearanceswrapper.js";

// Reducers
import {
  getAppearancesList,
  filterAppearancesByBandId,
  // groupAppearancesByDay,
  // groupAppearancesByDayStage,
  // getAppearancesGroupedByDay,
  getFetchStatus,
  loadAppearances,
  selectAppearancesGroupedByDay,
  selectAppearancesGroupedByDayStage
  // selectors as appearanceSelectors
} from "../dux/appearancesReducer.js";

import { getFavouritesCount } from "../dux/favouritesReducer.js";

import {
  getReverseTimesOrder,
  getShowOnlyFavourites,
  setShowOnlyFavourites,
  getAppearancesView,
  setShowAppearancesView,
  setReverseTimesOrder
  // getAppearancesSideMenuVisible,
  // setShowAppearancesSideMenu
} from "../dux/uiReducer.js";

import { selectStages, getStageInfoForId } from "../dux/stagesReducer.js";

const mapStateToProps = state => ({
  // appearancesListByDateTime: appearanceSelectors.selectAppearancesByDateTime(
  //   state.appearancesState
  // ),
  // appearancesGroupedByDayThenStage: appearanceSelectors.selectAppearancesGroupedByDayThenStage(
  //   state.appearancesState
  // ),
  favouritesState: state.favouritesState,
  favourites: state.favouritesState.favourites,
  fetchStatus: getFetchStatus(state),
  // appearancesGroupedByDay: getAppearancesGroupedByDay(state),
  reverseTimesOrder: getReverseTimesOrder(state),
  showOnlyFavourites: getShowOnlyFavourites(state),
  appearancesView: getAppearancesView(state),
  // appearancesList: getAppearancesList(state),
  // appearancesSideMenuVisible: getAppearancesSideMenuVisible(state),
  appearancesSelGroupedByDay: selectAppearancesGroupedByDay(state),
  appearancesSelGroupedByDayStage: selectAppearancesGroupedByDayStage(state),
  getStageInfo: stageId => getStageInfoForId(selectStages(state), stageId),
  favouritesCount: getFavouritesCount(state)
  // filterAppearancesByBandId: (appearances, bandsToFilterArray) =>
  // filterAppearancesByBandId(appearances, bandsToFilterArray)rr
  // groupAppearancesByDay: (appearances, reverseTimesOrder) =>
  //   groupAppearancesByDay(appearances, reverseTimesOrder),
  // groupAppearancesByDayStage: (appearances, reverseTimesOrder) =>
  //   groupAppearancesByDayStage(appearances, reverseTimesOrder)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadappearancesProp: loadAppearances,
      setReverseTimesOrder,
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
