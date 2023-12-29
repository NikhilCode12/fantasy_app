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
  matchesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.bgMateBlack,
    flexDirection: "column",
  },
  filterElement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.btn,
    borderRadius: 5,
    paddingHorizontal: 12,
    gap: 6,
    borderWidth: 1,
  },
  matchText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.light_grey,
  },
  matchText2: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 8,
    color: COLORS.primary,
  },
});
export default styles;
