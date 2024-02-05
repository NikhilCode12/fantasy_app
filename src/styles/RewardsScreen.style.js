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
    padding: 5,
    // backgroundColor: COLORS.transparentBg,
    backgroundColor: COLORS.bgMateBlack,
    position:"absolute",
    top:15,left:6,
    borderRadius:50,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.light_grey,
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  backArrow: {
    // backgroundColor: COLORS.transparentBg,
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

  
});

export default styles;
