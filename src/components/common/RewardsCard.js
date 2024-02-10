import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  ToastAndroid,
 Animated, 
 Image,
 Easing, 
Share,
TextInput
} from "react-native";
import COLORS from '../../constants/colors';
// import MyProgressBar from './MyProgressBar';
import * as Progress from 'react-native-progress';
import { Ionicons } from '@expo/vector-icons';

const RewardsCard = ({name,title,currentpoints,totalpoints}) => {
    let patth = require("../../../assets/favicon.png");
    // console.log('Image Path:', patth);
    const score = (currentpoints/totalpoints);
    const lockDesign = currentpoints==totalpoints?"lock-open":"lock-closed";
  return (
    <View style={{
        backgroundColor:COLORS.bgLightBlack,
        paddingHorizontal:10,
        paddingVertical:8,
        flexDirection:"row",
        justifyContent:"flex-start", 
        alignItems:"center",
        gap:20,
        marginVertical:10, 
        marginHorizontal:20,
        borderRadius:4,
        }}>
        <View style={{}}>
            <Image source= {patth} style={{height:30, width:30}}/>
        </View>
        <View style={{}}>
            <Text style={{color:COLORS.light, fontSize:12}}>{title}</Text>
            <Progress.Bar progress={score} width={240} height={4} color='teal' style={{marginVertical:2}}/>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:2}}>
                <Text style={{color:COLORS.light, fontSize:12}}>{currentpoints} points </Text>
                <Ionicons name={lockDesign} size={15} color={COLORS.light_grey}/>
            </View>
        </View>
    </View>
  )
}

export default RewardsCard;
const styles = StyleSheet.create({
    
})
