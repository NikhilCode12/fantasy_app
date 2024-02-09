import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const cStyles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.bgLightBlack,
  },
  sortText: {
    color: COLORS.light_grey,
    fontSize: 14,
    fontWeight: "500",
  },
  sortButton: {
    backgroundColor: COLORS.transparentBg,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  sortButtonText: {
    color: COLORS.light_grey,
    fontSize: 12,
    fontWeight: "500",
  },
  filterElement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 8,
    gap: 6,
  },
  matchText2: {
    fontSize: 12,
    paddingVertical: 6,
    fontWeight: "500",
    color: COLORS.light_grey,
  },
});

export default cStyles;
