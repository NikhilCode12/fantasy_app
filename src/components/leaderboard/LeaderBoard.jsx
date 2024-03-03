import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Animated,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import COLORS from "../../constants/colors";

const LeaderBoard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const scaleValue = useRef(new Animated.Value(0.75)).current;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users data from the server
        const response = await axios.get(
          "https://fanverse-backend.onrender.com/api/user/all"
        );
        const data = response.data;

        // Sort data by points in descending order
        data.sort((a, b) => b.points - a.points);

        // Calculating rank for each user
        data.forEach((user, index) => {
          user.rank = index + 1;
        });

        // Getting current user from AsyncStorage
        const currentUserData = await AsyncStorage.getItem("user");
        if (currentUserData) {
          setCurrentUser(JSON.parse(currentUserData));
        }
        console.log(currentUserData);

        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshing]);

  useEffect(() => {
    // Animate the current user's card when the data is loaded
    if (!loading && users.length > 0) {
      animateCurrentUser();
    }
  }, [loading, users]);

  const animateCurrentUser = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Find the current user in the leaderboard data
  const currentUserIndex = users.findIndex(
    (user) => user.username === currentUser?.username
  );
  const currentUserData =
    currentUserIndex !== -1 ? users[currentUserIndex] : null;

  return (
    <ScrollView
      contentContainerStyle={{
        marginHorizontal: 16,
        justifyContent: loading ? "center" : null,
        alignItems: loading ? "center" : null,
        paddingVertical: loading ? "50%" : 20,
        paddingBottom: loading ? null : 76,
      }}
      style={{
        backgroundColor: COLORS.bgMateBlack,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          progressBackgroundColor={COLORS.bgLightBlack}
        />
      }
    >
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <>
          {/* Display current user's data on top */}
          {currentUserData && (
            <Animated.View
              style={[
                styles.personCard,
                {
                  transform: [{ scale: scaleValue }],
                  backgroundColor: "#2c3e50",
                  elevation: 0,
                },
              ]}
            >
              <View style={styles.personInfo}>
                {/* <Ionicons
                  name="person-circle"
                  color={COLORS.secondary}
                  size={36}
                /> */}
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={[
                      styles.personNameText,
                      {
                        color: COLORS.secondary,
                      },
                    ]}
                  >
                    {currentUserData.username}
                  </Text>
                  <Text style={styles.personPointsText}>
                    {currentUserData.points.toFixed(2)} Points
                  </Text>
                </View>
              </View>
              <View
                style={[styles.rankCard, { backgroundColor: COLORS.secondary }]}
              >
                {currentUserData.rank > 3 ? (
                  <Ionicons
                    name="star"
                    size={13}
                    color={COLORS.bgMateBlack}
                    style={{ opacity: 0.5 }}
                  />
                ) : (
                  <Ionicons name="medal" size={13} color={COLORS.teflon} />
                )}
                <Text style={styles.personRankText}>
                  Rank {currentUserData.rank}
                </Text>
              </View>
            </Animated.View>
          )}

          {/* Display other users' data */}
          {users.map((user, index) => {
            // Skip rendering the current user's data if it matches the currentUserData
            if (currentUserData && user.username === currentUserData.username) {
              return null;
            }

            return (
              <View key={index} style={styles.personCard}>
                <View style={styles.personInfo}>
                  <View
                    style={{
                      backgroundColor: COLORS.darkRed,
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 35,
                      width: 35,
                      borderRadius: 50,
                      borderWidth: 1,
                      borderColor: COLORS.light,
                    }}
                  >
                    <Text style={{ color: COLORS.light, fontSize: 16 }}>
                      {user.username.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  {/* <Ionicons
                    name="person-circle"
                    color={COLORS.light}
                    size={36}
                  /> */}
                  <View style={{ marginLeft: 8 }}>
                    <Text style={styles.personNameText}>{user.username}</Text>
                    <Text style={styles.personPointsText}>
                      {user.points.toFixed(2)} Points
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.rankCard,
                    { backgroundColor: getColorForRank(user.rank) },
                  ]}
                >
                  {index > 3 ? (
                    <Ionicons
                      name="medal"
                      size={13}
                      color={COLORS.bgMateBlack}
                      style={{ opacity: 0.5 }}
                    />
                  ) : (
                    <Ionicons name="medal" size={13} color={COLORS.teflon} />
                  )}
                  <Text style={styles.personRankText}>Rank {user.rank}</Text>
                </View>
              </View>
            );
          })}
        </>
      )}
    </ScrollView>
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
});

export default LeaderBoard;
