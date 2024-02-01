import { StyleSheet ,Dimensions} from "react-native";
import COLORS from "../constants/colors";
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
    // padding: 20,
  },
  referralCode: {
    alignItems:"center",
    borderWidth: 1,
    marginHorizontal:80,
    borderColor: COLORS.light,
    paddingHorizontal:8,
    paddingVertical:12,
    marginTop:-70,
    flexDirection:"coloumn",
    borderRadius: 20,
  },
  referralCodeText: {
    color: COLORS.light,
    fontSize: 20,
  },
  referralCodeText2: {
    color: COLORS.light,
    fontSize: 15,
  },
  howItWorks: {
    marginTop: 20,
  },
  howItWorksTitle: {
    color: COLORS.light,
    fontSize: 20,
    padding:20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  steps: {
    marginLeft: 20,
  },
  step: {
    color: COLORS.light,
    fontSize: 16,
    padding:5
    // marginBottom: 10,
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
  Imgcontainer: {
    // justifyContent:"flex-start",
    // alignItems:"flex-start"
  },
  image: {
    width: width,
    marginTop:-100,
    resizeMode: 'contain', // Adjust the resizeMode as needed
  },
  coupounContainer:{
    marginHorizontal:"10",
    height:"25%",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  coupounCode:{
    color:"#9aa2a6",
    fontSize:25
},
coupountext:{
    color:"#90cbe8",
    fontSize:25
  },
  coupounCodeContainer:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    paddingHorizontal:12,
    paddingVertical:15,
    backgroundColor:"#11171a",
    width:"65%",
    borderColor:"transparent",
    borderWidth:1,
    borderRadius:10
  }
 
 
});
export default styles