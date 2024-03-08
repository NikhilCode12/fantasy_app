import React, { useEffect } from "react";
import { Text, TouchableOpacity, View, BackHandler, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  DetailsScreen,
  RulesScreen,
  TeamsScreen,
} from "./BeforeContestScreens/index.js";
import { useStripe, useConfirmPayment } from "@stripe/stripe-react-native";
import axios from "axios";
import styles from "../../styles/variations.style.js";
import COLORS from "../../constants/colors.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialTopTabNavigator();

const BeforeContestDetailsScreen = ({ route }) => {
  const { data, amount, variation, title, entryFee, contestId } = route.params;
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
  const { confirmPayment, loading } = useConfirmPayment();

  const handleJoinContest = async (entryFee) => {
    try {
      const gst = Math.floor((entryFee * 28) / 100);
      const totalAmount = entryFee + gst;

      const response = await axios.post(
        "https://fanverse-backend.onrender.com/api/payments/intents",
        {
          amount: Math.floor(totalAmount * 100),
        }
      );

      if (response.error) {
        Alert.alert("Something went wrong with the payment intent creation!");
        return;
      }

      const paymentIntent = response.data.paymentIntent;

      const initResponse = await initPaymentSheet({
        merchantDisplayName: "Fannverse",
        paymentIntentClientSecret: paymentIntent,
      });

      if (initResponse.error) {
        Alert.alert("Error initializing payment sheet!");
        return;
      }

      const paymentResponse = await presentPaymentSheet();

      if (paymentResponse.error.code === "Canceled") {
        Alert.alert("Payment canceled!");
        return;
      }

      const confirmResponse = await confirmPayment(paymentIntent);

      if (confirmResponse.error) {
        if (variation === "7 + 4" || variation === "10 + 1") {
          navigation.navigate("PlayerSelection", {
            data: data,
            amount: amount,
            variation: variation,
          });
        } else if (variation === "Fantastic 5") {
          navigation.navigate("PlayerSelection2", {
            data: data,
            amount: amount,
            variation: variation,
          });
        } else if (variation === "Top 3") {
          navigation.navigate("PlayerSelection3", {
            data: data,
            amount: amount,
            variation: variation,
          });
        } else if (variation === "Ball by Ball Predictor") {
          navigation.navigate("PlayerSelection4", {
            data: data,
            amount: amount,
            variation: variation,
            title: title,
          });
        }
      }
    } catch (error) {
      console.error("Error during payment:", error);
      Alert.alert("Something went wrong during payment!");
    }
  };
  async function handlejoin() {
    try {
      if (entryFee === 0) {
        Alert.alert("You have joined the contest successfully!");
        const token = await AsyncStorage.getItem("userToken");
        console.log("token is :", token);
        console.log("Contest id is :", contestId);
        // const response = await axios.post(
        //   "https://fanverse-backend.onrender.com/api/user/joincontest",
        //   {
        //     token: token,
        //     contestId: contestId,
        //   }
        // );
        // console.log(response.data);
        navigation.navigate("BallByBallPredictorGame", {
          data: data,
          amount: amount,
          variation: variation,
          title: title,
        });
      } else {
        handleJoinContest(entryFee);
      }
    } catch (e) {
      console.log(e);
    }
  }
  // async function handlejoin() {
  //   try {
  //     if (entryFee === 0) {
  //       Alert.alert("You have joined the contest successfully!");
  //       const token = await AsyncStorage.getItem("userToken");
  //       console.log("token is:", token);
  //       console.log("Contest id is:", contestId);

  //       const response = await fetch(
  //         "https://fanverse-backend.onrender.com/api/user/joincontest",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             token: token,
  //             contestId: contestId,
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const responseData = await response.json();
  //       console.log(responseData);

  //       navigation.navigate("BallByBallPredictorGame", {
  //         data: data,
  //         amount: amount,
  //         variation: variation,
  //         title: title,
  //       });
  //     } else {
  //       handleJoinContest(entryFee);
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

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
        <Tab.Screen
          name="Rules"
          component={RulesScreen}
          initialParams={{ variation }}
        />
        {variation !== "Ball by Ball Predictor" && (
          <Tab.Screen name="Teams" component={TeamsScreen} />
        )}
      </Tab.Navigator>
      {/* Join Contest Button */}
      <TouchableOpacity style={styles.joinContestButton} onPress={handlejoin}>
        <Text style={styles.joinContestButtonText}>
          {"Join Contest at ₹" + entryFee}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BeforeContestDetailsScreen;
