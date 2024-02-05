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
  mainContainer:{
    paddingHorizontal:14
  },
  joinContestHead:{
    fontSize:18,
    fontWeight:"600",
    paddingHorizontal:8,
    color:COLORS.light
  },
  mainHead:
    { fontSize:18,
    
    paddingHorizontal:8,
    color:COLORS.light},
  
  btnContainer:{marginTop:20,width:"200%",flexDirection:"row"},
  warningText:{fontSize:12, color:COLORS.darkRed, marginTop:8},
  inputBox:{fontSize:16,color:COLORS.light, paddingHorizontal:10,paddingVertical:8, borderRadius:5,borderColor:COLORS.light, backgroundColor:COLORS.transparentBg,width:"95%",marginTop:8},

});

export default styles;
