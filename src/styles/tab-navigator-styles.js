import { Platform } from "react-native";

const activeTintColor = Platform.OS === "ios" ? "blue" : "#fff";

export default {
  icon: {
    activeTintColor
  }
};
