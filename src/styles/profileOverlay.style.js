import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "80%",
    justifyContent: "center",
  },
  overlayBox: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.dark,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  linksContainer: {
    marginTop: 20,
  },
  linkItem: {
    marginBottom: 15,
  },
  linkText: {
    fontSize: 18,
    color: COLORS.primary,
  },
});

export default styles;
