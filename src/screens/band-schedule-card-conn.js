// import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import BandCard from "./band-schedule-card.js";

// Dux stuff
import { selectors as bandSelectors } from "../dux/bandsReducer.js";
import { selectors as appearancesSelectors } from "../dux/appearancesReducer.js";

const mapDispatchToProps = () => ({});
const mapStateToProps = state => ({
  bandsAlphabetical: bandSelectors.selectAlphabetical(state.bandsState),
  appearancesByBandThenDateTime: appearancesSelectors.selectAppearancesByBandNameThenDateTime(
    state.appearancesState
  )
});

const BandCardConn = connect(mapStateToProps, mapDispatchToProps)(BandCard);

export default BandCardConn;
