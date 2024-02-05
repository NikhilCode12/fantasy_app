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
    const patth = "../../../assets/favicon.png"
    // console.log('Image Path:', patth);
    const score = (currentpoints/totalpoints);
    const lockDesign = currentpoints==totalpoints?"lock-open":"lock-closed";
  return (
    <View style={{
        backgroundColor:COLORS.light,
        paddingHorizontal:10,
        paddingVertical:8,
        flexDirection:"row",
        justifyContent:"flex-start", 
        alignItems:"center",
        gap:20,
        marginVertical:10, 
        marginHorizontal:40,
        borderRadius:10,
        }}>
        <View style={{}}>
            <Image source= {require(patth)} style={{height:30, width:30}}/>
        </View>
        <View style={{}}>
            <Text>{title}</Text>
            <Progress.Bar progress={score} width={190} height={2} color='teal'/>
            <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                <Text>{currentpoints} points </Text>
                <Ionicons name={lockDesign} size={15}/>
            </View>
        </View>
    </View>
  )
}

export default RewardsCard;
const styles = StyleSheet.create({
    
})
