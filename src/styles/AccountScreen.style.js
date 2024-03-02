import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  scrollarea: {
    flex: 1,
    // paddingBottom:5,
    // marginBottom:15
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
  colorslight: { color: COLORS.light },
  colorslight_grey: { color: COLORS.light_grey },
  //personal info top
  personalInfoTop: {
    flexDirection: "row",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.transparentBg,
    marginHorizontal: 16,
    alignItems: "center",
  },
  imageContainer: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: COLORS.darkRed,
    overflow: "hidden",
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: COLORS.light,
  },
  image_profile: { flex: 1, width: null, height: null },
  top_profile_left: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "",
    paddingLeft: 15,
  },

  verfied_container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  // finacial history
  financialHistoryContainer: {
    backgroundColor: COLORS.btn,
    alignItems: "center",
    paddingVertical: "10",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 10,
  },
  financialHistoryText: {
    color: COLORS.light,
    fontSize: 16,
    paddingVertical: 15,
  },
  //   playing experience
  contestRecordContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
  },
  playingExperienceText: {
    color: COLORS.light_grey,
    marginLeft: 4,
    marginBottom: 10,
  },
  playingExperienceContainer: {
    marginTop: 15,
    paddingHorizontal: 16,
    width: "100%",
  },

  contestRecordBox: {
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    width: "47.5%",
    marginTop: 8,
    borderRadius: 10,
  },
  contestRecordBoxPoints: {
    color: COLORS.light_grey,
    fontSize: 20,
    fontWeight: "bold",
  },
  contestRecordBoxPointsDesc: {
    color: COLORS.silver,
    fontSize: 14,
    marginTop: 4,
  },
  // primary info
  primaryInfoContainer: { marginTop: 12, paddingHorizontal: 16 },
  primaryInfoBox: {
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    gap: 14,
  },
  primaryInfoBoxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ChangeText: { color: COLORS.primary, fontWeight: "bold", fontSize: 14 },
  primaryItem: { fontSize: 12, color: COLORS.light_grey },
  // basic info
  basicInfoContainer: { marginTop: 14, paddingHorizontal: 16 },
  basicInfoBox: {
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 14,
    borderRadius: 10,
  },
  basicInfoRow1: { flexDirection: "row", justifyContent: "", gap: 70 },
  basicInfoRow2: {
    flexDirection: "row",
    justifyContent: "",
    gap: 70,
    marginTop: 15,
  },
});
export default styles;
