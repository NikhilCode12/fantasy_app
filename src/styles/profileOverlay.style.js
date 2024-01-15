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
  linkItem: {
    marginBottom: 15,
  },
  linkContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkIcon: {
    marginRight: 10,
  },
  linkText: {
    fontSize: 18,
    color: COLORS.primary,
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  solidLink: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  solidLinkText: {
    color: COLORS.white,
    fontWeight: "bold",
  },

  // Dark mode container styles
  darkModeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  darkModeText: {
    color: COLORS.primary,
    fontSize: 18,
  },

  // Divider styles
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    marginBottom: 10,
  },
});

export default styles;
