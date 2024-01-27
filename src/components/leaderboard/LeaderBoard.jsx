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

  for (let i = 1; i <= 100; i++) {
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
        users.map((user, index) => (
          <TouchableOpacity key={index} style={styles.personCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 4,
                marginHorizontal: 8,
              }}
            >
              <Ionicons name="person-circle" color={COLORS.light} size={36} />
              <View style={{ marginHorizontal: 4 }}>
                <Text style={styles.personNameText}>{user.name}</Text>
                <Text style={styles.personPointsText}>
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
          </TouchableOpacity>
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
    marginBottom: 16,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderBottomRightRadius: 6,
    borderRightColor: COLORS.lightGray,
    borderBottomColor: COLORS.lightGray,
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
