import { Text, TouchableOpacity, View, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../styles/variations.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  DetailsScreen,
  RulesScreen,
  TeamsScreen,
} from "./BeforeContestScreens/index.js";

const Tab = createMaterialTopTabNavigator();

const BeforeContestDetailsScreen = ({ route }) => {
  const { data, amount, variation } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
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
              {"Team A"} vs {"Team B"}
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
      >
        <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen name="Rules" component={RulesScreen} />
        <Tab.Screen name="Teams" component={TeamsScreen} />
      </Tab.Navigator>
      {/* Join Contest Button */}
      <TouchableOpacity
        style={styles.joinContestButton}
        onPress={() => {
          navigation.navigate("PlayerSelection", {
            data,
            amount,
            variation,
          });
        }}
      >
        <Text style={styles.joinContestButtonText}>
          {"Join Contest at \u20B950"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BeforeContestDetailsScreen;
