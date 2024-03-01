import COLORS from "../constants/colors.js";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  playerTeamName: {
    color: COLORS.light,
    fontSize: 10,
    fontWeight: "bold",
    position: "absolute",
    top: -12,
    backgroundColor: COLORS.dark,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: COLORS.transparentBg,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: "center",
    borderTopWidth: 0,
  },
  playerLogoContainer: {
    position: "relative",
  },
  playerPoints: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
  },
  playerPointsText: {
    color: COLORS.light,
    fontSize: 13,
    fontWeight: "bold",
  },
  playerCreditsText: {
    color: COLORS.light,
    fontSize: 13,
    fontWeight: "bold",
  },
  playerCredits: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 50,
    marginLeft: 50,
  },
  playerDetails: {
    flexDirection: "column",
    marginLeft: 10,
    gap: 1,
    width: 150,
    alignItems: "flex-start",
  },
  playerLogo: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 2,
    marginTop: 10,
    marginLeft: 10,
  },
  playerName: {
    color: COLORS.light,
    fontSize: 12,
    fontWeight: "bold",
  },
  playerSelectionPercentage: {
    color: COLORS.silver,
    fontSize: 11,
  },
  playerStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  playerStatusText: {
    color: COLORS.secondary,
    fontSize: 10,
  },
  playerContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.transparentBg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.transparentBg,
  },
  selectedPlayerContainer: {
    backgroundColor: COLORS.dark,
    borderColor: COLORS.secondary,
  },
  selectedPlayerName: {
    color: COLORS.secondary,
  },
  selectedPlayerSelectionPercentage: {
    color: COLORS.light_grey,
  },
  selectedPlayerStatusText: {
    color: COLORS.secondary,
  },
  selectedPlayerPointsText: {
    color: COLORS.secondary,
  },
  selectedPlayerCreditsText: {
    color: COLORS.secondary,
  },
  playergridContainer: {
    flex: 1,
    flexDirection: "column",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.dark,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  topTitle: {
    color: COLORS.silver,
    fontSize: 11,
    fontWeight: "bold",
  },
});

export default styles;
