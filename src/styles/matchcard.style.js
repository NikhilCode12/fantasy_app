import COLORS from "../constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.transparentBg,
    marginVertical: 8,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  topContainer: {
    marginBottom: 1,
    // borderRadius: 5,
  },

  leagueText: {
    color: COLORS.silver,
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 11,
  },

  teamNameText: {
    color: COLORS.silver,
    fontWeight: "700",
    textAlign: "center",
    fontSize: 13,
  },

  teamContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
  },

  teamLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  teamLogos: {
    borderRadius: 50,
    width: 36,
    height: 36,
  },

  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.transparentBg,
    backgroundColor: COLORS.bgLightBlack,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },

  dateTimeText: {
    color: COLORS.light_grey,
    fontSize: 9,
    fontWeight: "400",
  },

  remainTimeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "500",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 8,
  },

  winningsCard: {
    backgroundColor: COLORS.bgLightBlack,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderColor: COLORS.silver,
    alignItems: "center",
  },

  winningsCardText: {
    fontSize: 10,
    fontWeight: "500",
    color: COLORS.silver,
  },

  winningsText: {
    fontSize: 10,
    fontWeight: "400",
    color: COLORS.light_grey,
  },

  notifyText: {
    fontSize: 10,
    fontWeight: "400",
    color: COLORS.light_grey,
  },
});

export default styles;
