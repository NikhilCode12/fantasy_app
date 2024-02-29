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
    color: COLORS.light_grey,
    fontWeight: "500",
    marginBottom: 10,
    fontSize: 11,
  },

  teamNameText: {
    color: COLORS.silver,
    fontWeight: "500",
    fontSize: 12,
    width: 44,
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
    justifyContent: "space-between",
    gap: 6,
    flexWrap: "wrap",
    width: 90,
  },

  teamLogos: {
    borderRadius: 25,
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: COLORS.transparentBg,
    resizeMode: "contain",
  },

  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.transparentBg,
    backgroundColor: COLORS.bgLightBlack,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    width: 100,
  },

  dateTimeText: {
    color: COLORS.light,
    fontSize: 9,
    fontWeight: "400",
    textAlign: "center",
  },

  remainTimeText: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: "700",
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },

  winningsCard: {
    backgroundColor: COLORS.bgLightBlack,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderColor: COLORS.secondary,
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
