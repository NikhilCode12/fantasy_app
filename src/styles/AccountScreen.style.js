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
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.transparentBg,
    marginHorizontal: 24,
  },
  imageContainer: {
    width: 75,
    height: 75,
    borderRadius: 50,
    overflow: "hidden",
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
    backgroundColor: COLORS.transparentBg,
    alignItems: "center",
    paddingVertical: "10",
    marginHorizontal: 24,
    marginTop: 20,
    borderRadius: 12,
  },
  financialHistoryText: {
    color: COLORS.light_grey,
    fontSize: 18,
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
  playingExperienceText: { color: COLORS.light_grey },
  playingExperienceContainer: { marginTop: 15, paddingHorizontal: 25 },

  contestRecordBox: {
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 10,
    paddingVertical: 18,
    width: "45%",
    marginTop: 8,
    borderRadius: 10,
  },
  contestRecordBoxPoints: { color: COLORS.light, fontSize: 20 },
  contestRecordBoxPointsDesc: { color: COLORS.light_grey, fontSize: 15 },
  // primary info
  primaryInfoContainer: { marginTop: 15, paddingHorizontal: 25 },
  primaryInfoBox: {
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  primaryInfoBoxRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  ChangeText: { color: COLORS.primary, fontWeight: "bold", fontSize: 14 },
  primaryItem: { fontSize: 12, color: COLORS.light_grey },
  // basic info
  basicInfoContainer: { marginTop: 15, paddingHorizontal: 25 },
  basicInfoBox: {
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 15,
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
