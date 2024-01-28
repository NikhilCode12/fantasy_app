import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const generateDummyUsers = () => {
  const users = [];

  for (let i = 1; i <= 50; i++) {
    const points = (Math.random() * (2500 - 500) + 500).toFixed(2);

    const user = {
      name: `User${i}`,
      points: parseFloat(points),
    };

    users.push(user);
  }
  users.sort((a, b) => b.points - a.points);
  users.forEach((user, index) => {
    user.rank = index + 1;
  });

  return users;
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
      return "skyblue";
  }
};

const getGradientColorsForRank = (rank) => {
  switch (rank) {
    case 1:
      return [COLORS.gold, COLORS.light];
    case 2:
      return [COLORS.silver, COLORS.light];
    case 3:
      return [COLORS.bronze, COLORS.light];
    default:
      return [COLORS.light, COLORS.light];
  }
};

const calculateRankCardSize = (rank) => {
  const baseSize = 76;
  const maxSize = 80;
  const dynamicSize = baseSize + (maxSize - baseSize) * (rank / 100);

  return dynamicSize;
};

const LeaderBoard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const dummyUsers = generateDummyUsers();
      setUsers(dummyUsers);
      setLoading(false);
    };

    fetchData();
  }, []);

  const targetUserName = "User1";
  const targetUser = users.find((user) => user.name === targetUserName);
  const updatedUsers = targetUser
    ? [targetUser, ...users.filter((user) => user.name !== targetUserName)]
    : users;

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: 16,
        justifyContent: loading ? "center" : null,
        alignItems: loading ? "center" : null,
        paddingVertical: loading ? "50%" : 8,
        paddingBottom: loading ? null : 76,
      }}
      showsVerticalScrollIndicator={false}
    >
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        updatedUsers.map((user, index) => (
          <View
            key={index}
            style={[
              styles.personCard,
              user.name === targetUserName && {
                backgroundColor: "#F0F0F0",
                borderLeftColor: "red",
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 6,
                marginHorizontal: 8,
              }}
            >
              <Ionicons
                name="person-circle"
                color={
                  user.name === targetUserName ? COLORS.dark : COLORS.light
                }
                size={40}
              />
              <View style={{ marginHorizontal: 4 }}>
                <Text
                  style={[
                    styles.personNameText,
                    user.name === targetUserName
                      ? { color: COLORS.dark }
                      : { color: COLORS.light },
                  ]}
                >
                  {user.name}
                </Text>
                <Text
                  style={[
                    styles.personPointsText,
                    user.name === targetUserName && {
                      color: COLORS.bgMateBlack,
                    },
                  ]}
                >
                  {user.points.toFixed(2)} Points
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.rankCard,
                {
                  backgroundColor: getColorForRank(user.rank),
                  background: `linear-gradient(to right, ${getGradientColorsForRank(
                    user.rank
                  ).join(",")})`,
                  width: calculateRankCardSize(user.rank),
                },
              ]}
            >
              {user.rank <= 3 ? (
                <Ionicons name="medal" size={13} color={COLORS.bgMateBlack} />
              ) : (
                <Ionicons name="star" size={13} color={COLORS.bgLightBlack} />
              )}
              <Text style={styles.personRankText}>Rank {user.rank}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  personCard: {
    borderRadius: 5,
    // backgroundColor: COLORS.bgLightBlack,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    shadowColor: COLORS.lightGray,
    elevation: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderLeftWidth: 3,
    borderBottomRightRadius: 6,
    borderLeftColor: COLORS.primary,
  },
  personNameText: {
    color: COLORS.light,
    fontSize: 14,
    fontWeight: "700",
  },
  personPointsText: {
    color: COLORS.light_grey,
    fontSize: 12,
    fontWeight: "700",
  },
  personRankText: {
    color: COLORS.bgMateBlack,
    fontSize: 13,
    fontWeight: "bold",
  },
  rankCard: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 30,
    flexDirection: "row",
  },
});
