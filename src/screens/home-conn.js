import { connect } from "react-redux";

// Components
import Home from "./home.js";

const mapDispatchToProps = () => ({});
const mapStateToProps = state => ({
  homeProp: state.homeState
});

const HomeConn = connect(mapStateToProps, mapDispatchToProps)(
  Home
);

export default HomeConn;
