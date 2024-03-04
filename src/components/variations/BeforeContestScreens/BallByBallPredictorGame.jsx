import React, { useEffect } from "react";
import { Text, TouchableOpacity, View, BackHandler, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  BBBGameScreen,
  BBBLeaderboardScreen,
  BBBResultScreen,
} from "../BallByBallPredictorGameScreens/index.js";
import axios from "axios";
import styles from "../../../styles/variations.style.js";
import COLORS from "../../../constants/colors.js";

const Tab = createMaterialTopTabNavigator();

const BallByBallPredictorGame = ({ route }) => {
  const { data, amount, variation, title } = route.params;

  const navigation = useNavigation();

  useEffect(() => {
    console.log(data);
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={styles.matchDetails}>
            <Text style={styles.matchTeamText}>
              {data.teamAName} vs {data.teamBName}
            </Text>
            <Text style={styles.matchTimeText}>
              {data.timeRemaining}
              {" left"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.walletIcon,
            {
              borderRadius: 5,
            },
          ]}
          onPress={() => {
            navigation.navigate("HelpAndSupport");
          }}
        >
          <Ionicons
            name="ios-help-circle-outline"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
          tabBarIndicatorStyle: { backgroundColor: COLORS.primary },
          tabBarStyle: { backgroundColor: COLORS.bgMateBlack },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.lightGray,
        }}
        initialRouteName="Game"
      >
        <Tab.Screen
          name="Game"
          component={BBBGameScreen}
          initialParams={{ data, title }}
        />
        <Tab.Screen name="Ranking" component={BBBLeaderboardScreen} />
        {/* <Tab.Screen name="Result" component={BBBResultScreen} /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BallByBallPredictorGame;
