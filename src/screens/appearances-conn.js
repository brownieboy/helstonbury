import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Appearances from "./appearances.js";

// Reducer
import { loadBands, selectors as bandSelectors } from "../dux/bandsReducer.js";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadBandsProp: loadBands }, dispatch);

const mapStateToProps = state => ({
  bandsProp: state.bands,
  bandsListByDateTime: bandSelectors.selectBandsByDateTime(state.bands)
});

const AppearancesConn = connect(mapStateToProps, mapDispatchToProps)(
  Appearances
);

export default AppearancesConn;
