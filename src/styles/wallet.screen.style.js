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
  balanceContainer: {
    flexDirection: "column",
    backgroundColor: COLORS.bgLightBlack,
    marginHorizontal: 12,
    borderRadius: 5,
  },
  balanceBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 14,
    gap: 10,
  },
  balanceHeadingText: {
    fontSize: 14,
    color: COLORS.light,
  },
  balanceText: {
    color: COLORS.light,
    fontSize: 22,
    fontWeight: "bold",
  },
  separator: {
    borderTopWidth: 0.25,
    marginVertical: 6,
    borderTopColor: COLORS.lightGray,
    marginHorizontal: 2,
  },
  menuContainer: {
    marginHorizontal: 16,
    marginVertical: 6,
  },
  boxText: {
    color: COLORS.light,
    fontSize: 12,
  },
  topBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountText: {
    color: COLORS.light,
    fontSize: 14,
    fontWeight: "700",
  },
  buttonContainer: {
    position: "absolute",
    right: 50,
    top: -18,
    backgroundColor: COLORS.bgMateBlack,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.light,
    fontSize: 12,
    fontWeight: "bold",
  },
  detailsContainer: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  detailsBox: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsText: {
    color: COLORS.light,
  },
  detailsContainerBox: {
    flexDirection: "column",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 8,
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
  },
  detailssubText: {
    color: COLORS.light_grey,
    fontSize: 11,
  },
});

export default styles;
