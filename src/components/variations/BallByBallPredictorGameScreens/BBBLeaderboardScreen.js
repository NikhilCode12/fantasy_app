import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../constants/colors.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BBBLeaderboardScreen = () => {
  const [username, setUsername] = useState("");
  const [showTopPoints, setShowTopPoints] = useState(false);
  const topPointsAnimation = new Animated.Value(0);

  useEffect(() => {
    // get user name from the async storage
    const fetchUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user !== null) {
          setUsername(JSON.parse(user).username);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 76,
      }}
      style={{
        backgroundColor: COLORS.bgMateBlack,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.topPointsContainer]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <Ionicons name="trophy-sharp" size={30} color={COLORS.primary} />
          <Text style={styles.topPointsText}>{"1600" + " Points"}</Text>
        </View>
        <Text style={styles.topPointsText}>
          {username + ", you ranked 4th!"}
        </Text>
      </View>
      <RankingEntry rank={1} username="John" points={1200} />
      <RankingEntry rank={2} username="Alice" points={1100} />
      <RankingEntry rank={3} username="Bob" points={1050} />
    </ScrollView>
  );
};

const RankingEntry = ({ rank, username, points }) => {
  return (
    <View
      style={[
        styles.personCard,
        {
          backgroundColor:
            username === "User" ? "slategray" : COLORS.bgLightBlack,
          elevation: 0,
        },
      ]}
    >
      <View style={styles.personInfo}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {username.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.personNameText}>{username}</Text>
          <Text
            style={[
              styles.personPointsText,
              {
                color: username === "User" ? COLORS.light : COLORS.light_grey,
                fontWeight: username === "User" ? "bold" : "normal",
              },
            ]}
          >
            {points.toFixed(2)} Points
          </Text>
        </View>
      </View>
      <View
        style={[styles.rankCard, { backgroundColor: getColorForRank(rank) }]}
      >
        {rank > 3 ? (
          <Ionicons
            name="star"
            size={13}
            color={COLORS.bgMateBlack}
            style={{ opacity: 0.5 }}
          />
        ) : (
          <Ionicons name="medal" size={13} color={COLORS.teflon} />
        )}
        <Text style={styles.personRankText}>Rank {rank}</Text>
      </View>
    </View>
  );
};

const getColorForRank = (rank) => {
  switch (rank) {
    case 1:
      return COLORS.gold;
    case 2:
      return COLORS.silver;
    case 3:
      return COLORS.bronze;
    default:
      return COLORS.light;
  }
};

const styles = StyleSheet.create({
  personCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    borderRadius: 10,
    backgroundColor: COLORS.bgLightBlack,
    shadowColor: COLORS.lightGray,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  personInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    backgroundColor: COLORS.darkRed,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 35,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.light,
  },
  avatarText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "bold",
  },
  personNameText: {
    color: COLORS.light,
    fontSize: 14,
    fontWeight: "700",
  },
  personPointsText: {
    color: COLORS.light_grey,
    fontSize: 13,
  },
  personRankText: {
    color: COLORS.teflon,
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
  },
  rankCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  topPointsContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },
  topPointsText: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BBBLeaderboardScreen;
