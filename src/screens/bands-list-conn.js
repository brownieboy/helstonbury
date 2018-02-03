import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import BandsList from "./bands-list.js";

// Reducer
import {
  loadBandsNow,
  selectors as bandSelectors
} from "../dux/bandsReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadBandsProp: loadBandsNow }, dispatch);

const mapStateToProps = state => ({
  // bandsStateProp: state.bandsState,
  bandsAlphabeticalProp: bandSelectors.selectAlphabetical(state.bandsState)
});

const BandsListConn = connect(mapStateToProps, mapDispatchToProps)(BandsList);

export default BandsListConn;
