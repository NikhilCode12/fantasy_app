import { FlatList, Text, TouchableOpacity, View, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../styles/variations.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const BallByBallPredictor = ({ route }) => {
  const { data, variation } = route.params;
  const navigation = useNavigation();
  const amount = (0).toPrecision(3);

  const [isMatchLive, setIsMatchLive] = useState(false);
  const [choices, setChoices] = useState([
    {
      id: "1",
      title: "Overs: 1-3",
      isLive: false,
      isStarting: false,
      isYetToStart: true,
    },
    {
      id: "2",
      title: "Overs: 3-6",
      isLive: false,
      isStarting: false,
      isYetToStart: false,
    },
    {
      id: "3",
      title: "Overs: 6-9",
      isLive: false,
      isStarting: false,
      isYetToStart: false,
    },
    {
      id: "4",
      title: "Overs: 9-12",
      isLive: false,
      isStarting: false,
      isYetToStart: false,
    },
    {
      id: "5",
      title: "Overs: 12-15",
      isLive: false,
      isStarting: false,
      isYetToStart: false,
    },
    {
      id: "6",
      title: "Overs: 15-18",
      isLive: false,
      isStarting: false,
      isYetToStart: false,
    },
    {
      id: "7",
      title: "Overs: 18-20",
      isLive: false,
      isStarting: false,
      isYetToStart: false,
    },
  ]);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    fetchLiveMatchData(data.matchId);

    const interval = setInterval(() => {
      fetchLiveMatchData(data.matchId);
    }, 100000);
  }, []);

  const fetchLiveMatchData = async (matchId) => {
    try {
      const response = await axios.get(
        `https://fanverse-backend.onrender.com/api/live-match/?matchId=${matchId}`
      );
      // const responseData = ""; // Placeholder for actual response data
      const responseData = response.data;
      if (responseData === "Data unavailable") {
        setIsMatchLive(false);
      } else {
        setIsMatchLive(true);

        const { live_score } = responseData;

        const currentOver = live_score?.overs;

        const [minutes, seconds] = data.timeRemaining
          .split(":")
          .map((part) => part.trim())
          .map((part) =>
            part.endsWith("m") ? parseInt(part) * 60 : parseInt(part)
          );

        const remainingSeconds = minutes + seconds;

        const isTimeLessThanThirtySeconds = remainingSeconds < 30;

        const updatedChoices = choices.map((choice, index) => {
          // 1-3, 3-6, 6-9, 9-12, 12-15, 15-18, 18-20
          const [startOver, endOver] = choice.title
            .substring(7)
            .split("-")
            .map(Number);

          const isLive = currentOver >= startOver && currentOver <= endOver;
          const isStarting =
            currentOver >= startOver + 1 && currentOver <= endOver && !isLive;
          const isYetToStart =
            isTimeLessThanThirtySeconds &&
            currentOver < startOver &&
            !isLive &&
            !isStarting;

          return {
            ...choice,
            isLive,
            isStarting,
            isYetToStart,
          };
        });

        setChoices(updatedChoices);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const animateLiveIcon = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animateLiveIcon();
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
          style={styles.walletIcon}
          onPress={() => {
            navigation.navigate("Wallet");
          }}
        >
          <Text style={styles.walletText}>&#8377;{amount}</Text>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.variationHeading}>Select Overs</Text>
      <FlatList
        data={choices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.variationCard]}
            onPress={() => {
              navigation.navigate("ContestBottomNavigation", {
                data: data,
                amount: amount,
                variation: variation,
                title: item.title,
              });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <Text
                style={[
                  styles.variationTitle,
                  {
                    color: COLORS.light,
                  },
                ]}
              >
                {item.title}
              </Text>
              {(item.id === "1" || item.id === "2") && (
                <Text
                  style={{
                    color: COLORS.light,
                    fontSize: 10,
                    fontWeight: "500",
                    paddingHorizontal: 10,
                    textAlign: "center",
                    paddingVertical: 4,
                    borderRadius: 4,
                    backgroundColor: COLORS.transparentBg,
                  }}
                >
                  Powerplay
                </Text>
              )}

              {item.id === "7" && (
                <Text
                  style={{
                    color: COLORS.light,
                    fontSize: 10,
                    fontWeight: "500",
                    paddingHorizontal: 10,
                    textAlign: "center",
                    paddingVertical: 4,
                    borderRadius: 4,
                    backgroundColor: COLORS.transparentBg,
                  }}
                >
                  Final Overs
                </Text>
              )}
              {item.isLive && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                    backgroundColor: COLORS.transparentBg,
                    gap: 4,
                  }}
                >
                  <Animated.View
                    style={{
                      opacity: opacity,
                    }}
                  >
                    <Ionicons name="ellipse" size={8} color={COLORS.darkRed} />
                  </Animated.View>
                  <Text
                    style={{
                      color: COLORS.light,
                      fontSize: 10,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {"Live"}
                  </Text>
                </View>
              )}
              {item.isStarting && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                    backgroundColor: COLORS.transparentBg,
                    gap: 4,
                  }}
                >
                  <Animated.View
                    style={{
                      opacity: opacity,
                    }}
                  >
                    <Ionicons name="ellipse" size={8} color={"yellow"} />
                  </Animated.View>
                  <Text
                    style={{
                      color: COLORS.light,
                      fontSize: 10,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {"Starting"}
                  </Text>
                </View>
              )}
              {item.isYetToStart && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                    backgroundColor: COLORS.transparentBg,
                    gap: 4,
                  }}
                >
                  <Ionicons name="ellipse" size={8} color={COLORS.silver} />
                  <Text
                    style={{
                      color: COLORS.light,
                      fontSize: 10,
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    {"Soon"}
                  </Text>
                </View>
              )}
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default BallByBallPredictor;
