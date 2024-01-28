import { StyleSheet } from "react-native";
import COLORS from "../constants/colors";

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "80%",
    justifyContent: "center",
  },
  overlayBox: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.bgMateBlack,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 20,
    marginBottom:50
  },
  linkItem: {
    marginBottom: 15,
  },
  linkContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkIcon: {
    marginRight: 10,
  },
  linkText: {
    fontSize: 14,
    color: COLORS.light,
    marginLeft:"4%",
    fontWeight:400,
    flex: 1,
  },
  arrowIcon: {
    marginLeft: 10,
    
  },
  solidLink: {
    backgroundColor:COLORS.transparentBg,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 35, width:"80%"
  },
  solidLinkText: {
    color: COLORS.light,
    fontWeight: "bold",
  },

  // Dark mode container styles
  darkModeContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
    paddingVertical:18,
    borderColor:COLORS.delta,
    borderTopWidth:1,
    borderBottomWidth:1
  },
  darkModeText: {
    color: COLORS.light,
  fontSize: 14,
    marginLeft:"6%"
    
  },
  darkmodetoggler:{
    position:"absolute",
    right:"0%"
  },

  // Divider styles
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS,
  },
  // follow us
  followuscontainer:{
    marginTop:"95%", 
  },
  followustext:{
    color:COLORS.light,
    fontSize: 14,
    fontWeight:"700",
  },
  iconscontainer:{
    flexDirection:"row",
    marginTop:"5%",
    justifyContent:"space-between",
    maxWidth:"90%"
  },

  //logout
 button: {
    backgroundColor:COLORS.bgLightBlack,
    padding: 10,
    borderRadius: 5,
    // borderWidth: 2,
    borderColor: COLORS.light,
    marginBottom:"5%",
  },
  text: {
    color: COLORS.logoutcolor,
    textAlign: 'center',
    fontWeight:"600",
    fontSize: 14,
  },
});

export default styles;
