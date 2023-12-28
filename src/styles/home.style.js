import COLORS from "../constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: COLORS.dark,
    paddingBottom: 16,
  },
  appBar: {
    marginTop: 16,
    marginHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appBarHeading: {
    fontSize: 20,
    marginLeft: "8%",
    color: COLORS.light,
    fontWeight: "bold",
  },
  appBarRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "center",
  },
});

export default styles;
