import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
  TextInput,
  ScrollView,
  Image
} from "react-native";
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import DeleteIcon from "../components/common/DeleteIcon.js";
import Toast from "react-native-toast-message";
import { StyleSheet } from "react-native";
import T20Rules from "../components/HowToPlay/T20Rules.jsx";
import OdiRules from "../components/HowToPlay/OdiRules.jsx";
import TestRules from "../components/HowToPlay/TestRules.jsx";
import T10Rules from "../components/HowToPlay/T10Rules.jsx";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
export default function HowToPlayScreen({navigation}) {
  return (
   <SafeAreaView style={styles.container}>

         <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backArrow}  onPress={() => {
              navigation.goBack();
            }}>
          <Ionicons
            name="arrow-back"
            size={24}
           
            color={COLORS.primary}
            />
        </TouchableOpacity>
        <Text style={styles.headerText}>How To Play</Text>
      </View>
                <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
          tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
          tabBarStyle: { backgroundColor: COLORS.bgMateBlack },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.lightGray,
        }}
        initialRouteName="T20"
      >
        <Tab.Screen
          name="T20"
          component={T20Rules}
          options={{ title: "T20" }}
        />
        <Tab.Screen
          name="Odi"
          component={OdiRules}
          options={{ title: "Odi" }}
        />
        <Tab.Screen
          name="Test"
          component={TestRules}
          options={{ title: "Test" }}
        />
        <Tab.Screen
          name="T10"
          component={T10Rules}
          options={{ title: "T10" }}
        />
      </Tab.Navigator> 
      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
      container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  scrollarea:{
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
  colorslight:{color:COLORS.light},
  colorslight_grey:{color:COLORS.light_grey},
   Ques:{color:COLORS.light , marginTop:10},
  Ans:{color:COLORS.light_grey , marginTop:5},
  boxx:{ backgroundColor:COLORS.bgLightBlack, paddingVertical:5, paddingHorizontal:14, borderRadius:10,marginTop:12},
})
