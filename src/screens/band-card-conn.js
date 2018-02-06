// import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import BandCard from "./band-card.js";

// Dux stuff
import { selectors as bandSelectors } from "../dux/bandsReducer.js";

const mapDispatchToProps = () => {};
const mapStateToProps = state => ({
  bandsAlphabeticalProp: bandSelectors.selectAlphabetical(state.bandsState)
});

const BandCardConn = connect(mapStateToProps, mapDispatchToProps)(BandCard);

export default BandCardConn;
