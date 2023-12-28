import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bgMateBlack,
  },
  text: {
    color: COLORS.primary,
    fontSize: 24,
    marginTop: "-20%",
    fontWeight: "bold",
    fontStyle: "italic",
  },
});

export default styles;
