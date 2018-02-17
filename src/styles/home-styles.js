const React = require("react-native");

const { Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;

export default {
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  logo: {
    // position: "absolute",
    // left: Platform.OS === "android" ? 30 : 40,
    // top: Platform.OS === "android" ? 15 : 40,
    width: 300,
    height: 150
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  }
};

// logoContainer: {
//   flex: 1,
//   marginTop: deviceHeight / 32,
//   marginBottom: 30
// },
