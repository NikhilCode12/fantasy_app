import React,{useRef, useState,useEffect} from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Clipboard from '@react-native-clipboard/clipboard';
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/RewardsScreen.style";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import RewardsCard from "../components/common/RewardsCard";
const RewardsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>

     
      <View style={{height:180,backgroundColor:"teal",    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,}}>
         <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backArrow}>
          <Ionicons
            name="arrow-back"
            size={24}
            onPress={() => {
              navigation.goBack();
            }}
            color={COLORS.primary}
            />
        </TouchableOpacity>
        {/* <Text style={styles.headerText}>Rewards</Text> */}
      </View>
            <Text style={{color:COLORS.light,fontSize:40, paddingHorizontal:70,paddingVertical:15,fontWeight:"600"}}>Rewards</Text>
          <View style={{flexDirection:"row",marginTop:1, alignItems:"center",justifyContent:"space-around",backgroundColor:COLORS.light , borderRadius:20,paddingVertical:10,marginHorizontal:20}}>
            <Ionicons name="md-star" size={40} color={"#666312"} />
            <View>
           <Text style={{fontSize:25}}>365</Text>
           <Text style={{fontSize:15}}>Available Points</Text>
            </View>
           <TouchableOpacity style={{backgroundColor:COLORS.bgLightBlack,gap:3, flexDirection:"row", paddingHorizontal:8,paddingVertical:5,borderRadius:10}}>
            <Ionicons name="time-outline"size={25} color={"#89adad"}/><Text style={{color:"#89adad",fontSize:18}}>History</Text>
           </TouchableOpacity>
          </View>
      </View>
            <ScrollView >
      <View style={{paddingTop:15}}>
        <RewardsCard name={"starbucks"} title={"10$ spotify card"} currentpoints={300} totalpoints={300} />
        <RewardsCard name={"amazon"} title={"50$ gift Card on Amazon"} currentpoints={500} totalpoints={2500} />
        <RewardsCard name={"meesho"} title={"10$ gift Card on Meesho"} currentpoints={1000} totalpoints={2000} />
        <RewardsCard name={"best_buy"} title={"50$ gift Card on Best Buy"} currentpoints={150} totalpoints={1000} />
        <RewardsCard name={"book_my_show"} title={"20% off on Movie Tickets"} currentpoints={100} totalpoints={750} />
        <RewardsCard name={"starbucks"} title={"10$ spotify card"} currentpoints={300} totalpoints={300} />
        <RewardsCard name={"amazon"} title={"50$ gift Card on Amazon"} currentpoints={500} totalpoints={2500} />
        <RewardsCard name={"meesho"} title={"10$ gift Card on Meesho"} currentpoints={1000} totalpoints={2000} />
        <RewardsCard name={"best_buy"} title={"50$ gift Card on Best Buy"} currentpoints={150} totalpoints={1000} />
        <RewardsCard name={"book_my_show"} title={"20% off on Movie Tickets"} currentpoints={100} totalpoints={750} />
        <RewardsCard name={"starbucks"} title={"10$ spotify card"} currentpoints={300} totalpoints={300} />
        <RewardsCard name={"amazon"} title={"50$ gift Card on Amazon"} currentpoints={500} totalpoints={2500} />
        <RewardsCard name={"meesho"} title={"10$ gift Card on Meesho"} currentpoints={1000} totalpoints={2000} />
        <RewardsCard name={"best_buy"} title={"50$ gift Card on Best Buy"} currentpoints={150} totalpoints={1000} />
        <RewardsCard name={"book_my_show"} title={"20% off on Movie Tickets"} currentpoints={100} totalpoints={750} />
        <RewardsCard name={"starbucks"} title={"10$ spotify card"} currentpoints={300} totalpoints={300} />
        <RewardsCard name={"amazon"} title={"50$ gift Card on Amazon"} currentpoints={500} totalpoints={2500} />
        <RewardsCard name={"meesho"} title={"10$ gift Card on Meesho"} currentpoints={1000} totalpoints={2000} />
        <RewardsCard name={"best_buy"} title={"50$ gift Card on Best Buy"} currentpoints={150} totalpoints={1000} />
        <RewardsCard name={"book_my_show"} title={"20% off on Movie Tickets"} currentpoints={100} totalpoints={750} />
      </View>
            </ScrollView>
    </View>
  );
};

export default RewardsScreen;
