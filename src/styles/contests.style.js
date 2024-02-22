import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const cStyles = StyleSheet.create({
  sortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
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
  createTeamButton: {
    backgroundColor: COLORS.dark,
    position: "absolute",
    bottom: 70,
    left: 16,
    right: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: COLORS.silver,
    fontWeight: "bold",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  buttonText: {
    color: COLORS.light,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default cStyles;
