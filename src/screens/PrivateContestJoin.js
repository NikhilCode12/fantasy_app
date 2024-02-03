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
import styles from "../styles/PrivateContestJoin.style";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
export default function PrivateContestJoin({navigation}) {
    const[Code,ChangeCode]=useState("");
    const [displayWarning,ChangeDisplayWarning]=useState(false);
    useEffect(()=>{
       if(Code.length!=0 && Code.length<10)
    {
      // console.log(Code.length);
        ChangeDisplayWarning(true);
    }
    if(Code.length==10)
    {
        ChangeDisplayWarning(false);
    }
    },[Code])
   function EnterContest()
   {
      if(Code.length!=10)
      {
        ToastAndroid.show("Enter 10 Digit Invite Code",ToastAndroid.SHORT);
      }
      else{
        ToastAndroid.show(`Searching For Invite Code ${Code}`,ToastAndroid.SHORT);
      }
   }
  return (
    
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.headerText}>Private Contest</Text>
      </View>
      <View style={styles.mainContainer}>
            <Text style={styles.joinContestHead}>JOIN CONTEST</Text>
            <TextInput placeholder="Enter 10 Digit Invite Code" placeholderTextColor={COLORS.lightGray} onChangeText={(code)=>ChangeCode(code)} keyboardType="numeric"  maxLength={10}
            style={styles.inputBox}/>
            {displayWarning && <Text style={styles.warningText}>Invite Code Must be of 10 Digits</Text>}
            <View  style={styles.btnContainer}>
              {/* <Text style={{color:COLORS.light,fontSize:15,fontWeight:600}}>Search Contest</Text> */}
               <Button
            title="Search Contest Center"
            color={"teal"}
            onPress={EnterContest}
          />
            </View>
      </View>
    </SafeAreaView>
  );
}
