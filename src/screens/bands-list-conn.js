import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import BandsList from "./bands-list.js";

// Dux stuff
import {
  loadBandsNow,
  selectors as bandSelectors
} from "../dux/bandsReducer.js";
import { selectors as appearancesSelectors } from "../dux/appearancesReducer.js";
import { loadFavouritesNow } from "../dux/favouritesReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { loadBandsProp: loadBandsNow, loadFavouritesNowProp: loadFavouritesNow },
    dispatch
  );

const mapStateToProps = state => ({
  // bandsStateProp: state.bandsState,
  bandsAlphabeticalProp: bandSelectors.selectAlphabetical(state.bandsState),
  appearancesByBandThenDateTime: appearancesSelectors.selectAppearancesByBandNameThenDateTime(
    state
  ),
  favouritesState: state.favouritesState
});

const BandsListConn = connect(mapStateToProps, mapDispatchToProps)(BandsList);

export default BandsListConn;
