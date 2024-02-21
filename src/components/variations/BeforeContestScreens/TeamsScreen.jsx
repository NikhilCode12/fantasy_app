import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import UserTeamsCard from "./_components/UserTeamsCard";
import teamsData from "../../../constants/userteamsdummy.json";

const TeamsScreen = () => {
  const teams = 20;
  const totalTeams = Math.floor(Math.random() * 10000);
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Teams Details Container */}
        <View style={styles.detailsContainer}>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              gap: 4,
              borderRadius: 5,
              padding: 8,
            }}
          >
            <Text style={styles.headingText}>Teams Joined</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.teamText}>{teams}</Text>
              <Ionicons name="shirt-outline" size={14} color={COLORS.primary} />
            </View>
          </View>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              gap: 4,
              backgroundColor: COLORS.bgLightBlack,
              borderRadius: 5,
              padding: 8,
            }}
          >
            <Text style={styles.headingText}>Total Teams</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.teamText}>
                {totalTeams.toLocaleString("en-IN")}
              </Text>
              <Ionicons name="shirt" size={14} color={COLORS.primary} />
            </View>
          </View>
        </View>
        {/* User and their teams card */}
        {teamsData.map((user, index) => (
          <UserTeamsCard
            key={index}
            username={user.username}
            teams={user.teams}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeamsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  detailsContainer: {
    marginTop: 4,
    padding: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 20,
  },
  teamText: {
    color: COLORS.light,
    fontSize: 13,
    fontWeight: "bold",
  },
  headingText: {
    color: COLORS.silver,
    fontSize: 14,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
});
