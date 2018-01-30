import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import BandsList from "./bands-list.js";

// Reducer
import { loadBands } from "../dux/bandsReducer.js";


const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadBandsProp: loadBands }, dispatch);

const mapStateToProps = state => ({ bandsProp: state.bands });

const BandsListConn = connect(mapStateToProps, mapDispatchToProps)(BandsList);


export default BandsListConn;

