import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import LeaderBoard from "../components/leaderboard/LeaderBoard";
import animationData from "../../assets/comingsoon.json";
import LottieView from "lottie-react-native";
import { ActivityIndicator } from "react-native";
import TypeWriter from "react-native-typewriter";

const LeaderBoardScreen = ({ navigation }) => {
  const [selectedWidget, setSelectedWidget] = useState("Ranking");
  const [isLoading, setIsLoading] = useState(true);

  const handleWidgetPress = (widgetName) => {
    setSelectedWidget(widgetName);
  };

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

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
        <Text style={styles.headerText}>Leaderboard</Text>
        <TouchableOpacity style={styles.backArrow}>
          <Ionicons name="headset" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.midContainer}>
        <TouchableOpacity
          style={[
            styles.widgetStyle,
            {
              backgroundColor:
                selectedWidget === "Ranking"
                  ? COLORS.light
                  : COLORS.transparentBg,
            },
          ]}
          onPress={() => handleWidgetPress("Ranking")}
        >
          <Text
            style={[
              styles.widgetText,
              {
                color:
                  selectedWidget === "Ranking"
                    ? COLORS.bgMateBlack
                    : COLORS.light,
              },
            ]}
          >
            Ranking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.widgetStyle,
            {
              backgroundColor:
                selectedWidget === "Rewards"
                  ? COLORS.light
                  : COLORS.transparentBg,
            },
          ]}
          onPress={() => handleWidgetPress("Rewards")}
        >
          <Text
            style={[
              styles.widgetText,
              {
                color:
                  selectedWidget === "Rewards"
                    ? COLORS.bgMateBlack
                    : COLORS.light,
              },
            ]}
          >
            Rewards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.widgetStyle,
            {
              backgroundColor:
                selectedWidget === "Rules"
                  ? COLORS.light
                  : COLORS.transparentBg,
            },
          ]}
          onPress={() => handleWidgetPress("Rules")}
        >
          <Text
            style={[
              styles.widgetText,
              {
                color:
                  selectedWidget === "Rules"
                    ? COLORS.bgMateBlack
                    : COLORS.light,
              },
            ]}
          >
            Rules
          </Text>
        </TouchableOpacity>
      </View>
      {selectedWidget === "Ranking" ? <LeaderBoard /> : null}
      {selectedWidget === "Rules" || selectedWidget === "Rewards" ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
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
          )}
        </View>
      ) : null}
    </SafeAreaView>
  );
};

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
  midContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    marginHorizontal: 16,
  },
  widgetStyle: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 26,
  },
  widgetText: {
    color: COLORS.light,
    fontSize: 14,
    fontWeight: "700",
  },
  leaderBoardContainer: {
    flex: 1,
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 5,
  },
});

export default LeaderBoardScreen;
