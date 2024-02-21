import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgMateBlack,
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.bgMateBlack,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.light_grey,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  backArrow: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  matchTeamText: {
    color: COLORS.light_grey,
    fontSize: 14,
    fontWeight: "bold",
  },
  matchTimeText: {
    color: COLORS.light_grey,
    fontWeight: "500",
    fontSize: 12,
  },
  walletIcon: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 25,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "space-between",
    gap: 4,
    alignItems: "center",
  },
  walletText: {
    color: COLORS.light_grey,
    fontSize: 14,
    fontWeight: "bold",
  },
  variationsContainer: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
    height: "100%",
  },
  variationCard: {
    backgroundColor: COLORS.transparentBg,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  variationTitle: {
    color: COLORS.light_grey,
    fontSize: 16,
    fontWeight: "bold",
  },
  variationHeading: {
    color: COLORS.light_grey,
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  variationsTitleContainer: {
    borderBottomWidth: 1,
    width: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderBottomColor: "gray",
  },
  variationTitleText: {
    color: COLORS.light_grey,
    fontSize: 16,
    paddingVertical: 8,
    fontWeight: "700",
  },
  joinContestButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 5,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  joinContestButtonText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default styles;
