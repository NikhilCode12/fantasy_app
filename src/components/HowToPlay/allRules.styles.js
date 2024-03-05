import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
const styles = StyleSheet.create({
  impContainer: {},
  mainContainer: { backgroundColor: COLORS.bgLightBlack, flex: 1 },
  ScrollContainer: { marginBottom: 40 },
  colorRed: { color: COLORS.darkRed },
  impContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  impRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    borderRadius: 2,
    borderWidth: 1,
    borderColor: COLORS.darkRed,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  insideTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  insideminiTitle: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  PointRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.bgMateBlack,

    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  tiltleLeft: {
    maxWidth: 220,
    color: COLORS.primary,
    fontSize: 14,
  },
  pointsRight: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
  details: {
    // opacity: 0.65,
  },
  title: {
    textTransform: "capitalize",
    color: COLORS.light,
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 10,
    // color: COLORS.light_grey,
  },
  content: {
    marginTop: 8,
    // backgroundColor: COLORS.transparentBg,
  },
  container: {
    margin: 10,
    marginTop: 15,
    // backgroundColor: COLORS.light,
    backgroundColor: COLORS.bgMateBlack,
    padding: 15,
    // backgroundColor: "white",
    borderRadius: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",

    // marginBottom: 20,
    backgroundColor: COLORS.bgMateBlack,
  },
});
export default styles;