import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import LeaderBoard from "../components/leaderboard/LeaderBoard";
import animationData from "../../assets/comingsoon.json";
import LottieView from "lottie-react-native";
import TypeWriter from "react-native-typewriter";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const LeaderBoardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Leaderboard</Text>
        <TouchableOpacity style={styles.backArrow}>
          <Ionicons name="headset" size={22} color={COLORS.primary} />
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
        initialRouteName="Ranking"
      >
        <Tab.Screen
          name="Ranking"
          component={LeaderBoard}
          options={{ title: "Ranking" }}
        />
        <Tab.Screen
          name="Rewards"
          component={RulesRewardsScreen}
          options={{ title: "Rewards" }}
        />
        <Tab.Screen
          name="Rules"
          component={RulesRewardsScreen}
          options={{ title: "Rules" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const RulesRewardsScreen = () => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: COLORS.bgMateBlack,
      paddingBottom: 150,
    }}
  >
    <>
      <LottieView
        source={animationData}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
      <TypeWriter
        typing={1}
        style={{
          color: COLORS.primary,
          fontSize: 24,
          fontWeight: "bold",
          fontStyle: "italic",
        }}
      >
        {"COMING SOON..."}
      </TypeWriter>
    </>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  tabBar: {
    backgroundColor: COLORS.bgMateBlack,
    borderBottomWidth: 0,
  },
  tabLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});

export default LeaderBoardScreen;
