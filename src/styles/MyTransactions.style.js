import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";
const styles = StyleSheet.create({
      container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  scrollarea:{
     flex: 1,
    // padding: 2,
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
  detailsContainer: {
    marginHorizontal: 12,
    marginVertical: 8,
  },
  detailsBox: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginVertical: 1,
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsText: {
    color: COLORS.light,
    fontSize:12
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
  transType:{
    fontSize:18,
    color:COLORS.light_grey,
    fontWeight:"700",

  },   
  transMoney:{
    //  color: COLORS.logoutcolor,
    //  color: COLORS.dar,
    fontSize:16,
    fontWeight:"500"
  } ,
  withdrawlMoney:{
    color:"#e0707b"
  },
  AddedMoney:{
    color:"#4fd64d"
  },
});
export default styles