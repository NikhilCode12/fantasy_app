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

  formContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    marginTop: 12,
    padding: 8,
    color: COLORS.light,
    // placeholderTextColor: COLORS.wheat,
  },
  addButton: {
    backgroundColor: COLORS.transparentBg,
    padding: 12,
    borderRadius: 5,
    marginTop: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: COLORS.light,
    fontSize: 16,
  },
});
export default styles;
