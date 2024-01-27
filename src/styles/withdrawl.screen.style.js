// withdrawal.screen.style.js

import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.bgMateBlack,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.light_grey,
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  backArrow: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  arrowStyle: {
    backgroundColor: COLORS.bgMateBlack,
    borderRadius: 5,
    padding: 4,
  },
  withdrawalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  numberSize: {
    fontSize: 20,
    paddingVertical: 0,
  },
});

export default styles;
