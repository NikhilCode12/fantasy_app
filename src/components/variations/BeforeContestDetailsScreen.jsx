import { Text, TouchableOpacity, View, BackHandler, Alert } from "react-native";
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
import { useStripe } from "@stripe/stripe-react-native";
import axios from "axios";

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

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const handleJoinContest = async () => {
    // send request to server to create payment intent
    try {
      const response = await axios.post(
        "https://localhost:5000/api/payments/intents",
        {
          amount: Math.floor(1500),
        }
      );

      if (response.error) {
        Alert.alert("Something went wrong!");
        return;
      }

      // initialize payment sheet to place order
      const paymentIntent = response.data.paymentIntent;

      const initResponse = await initPaymentSheet({
        merchantDisplayName: "Fannverse",
        paymentIntentClientSecret: paymentIntent,
      });
      if (initResponse.error) {
        Alert.alert("Something went wrong!");
        return;
      }

      // present payment sheet from stripe
      const paymentResponse = await presentPaymentSheet();
      if (paymentResponse.error) {
        Alert.alert(
          `Error code: ${paymentResponse.error.code}`,
          paymentResponse.error.message
        );
        return;
      }

      // after payment is done, navigate to contest screen
      navigation.navigate("Contest", {
        data: data,
        amount: amount,
        variation: variation,
      });
    } catch (err) {}
  };

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
        initialRouteName="Details"
      >
        <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen name="Rules" component={RulesScreen} />
        <Tab.Screen name="Teams" component={TeamsScreen} />
      </Tab.Navigator>
      {/* Join Contest Button */}
      <TouchableOpacity
        style={styles.joinContestButton}
//         onPress={() => {
//           if (variation === "7 + 4" || variation === "10 + 1") {
//             navigation.navigate("PlayerSelection", {
//               data: data,
//               amount: amount,
//               variation: variation,
//             });
//           } else if (variation === "Fantastic 5") {
//             navigation.navigate("PlayerSelection2", {
//               data: data,
//               amount: amount,
//               variation: variation,
//             });
//           } else {
//             navigation.navigate("PlayerSelection3", {
//               data: data,
//               amount: amount,
//               variation: variation,
//             });
//           }
//         }}
        onPress={handleJoinContest}
        // disabled={!loading}
      >
        <Text style={styles.joinContestButtonText}>
          {"Join Contest at \u20B950"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BeforeContestDetailsScreen;
