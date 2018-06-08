import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Components
import Home from "./home.js";

import { loadBandsNow } from "../dux/bandsReducer.js";
import { loadFavouritesNow } from "../dux/favouritesReducer.js";
import { loadUIStateNow } from "../dux/uiReducer.js";
import { clearAllLocalData } from "../dux/homeReducer.js";

console.log("home-conn, clearAllLocalData=" +  clearAllLocalData);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadBandsProp: loadBandsNow,
      loadFavouritesNowProp: loadFavouritesNow,
      loadUIStateNowProp: loadUIStateNow,
      clearAllLocalDataProp: clearAllLocalData
    },
    dispatch
  );

const mapStateToProps = state => ({
  homeProp: state.homeState
});

const HomeConn = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeConn;
