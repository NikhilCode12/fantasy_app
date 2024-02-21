import { StyleSheet, View, Text } from "react-native";
import COLORS from "../../../../constants/colors";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const UserTeamsCard = ({ username, teams }) => {
  return (
    <View style={styles.detailsContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: 16,
        }}
      >
        <Ionicons name="person-circle" size={40} color={COLORS.silver} />
        <Text style={styles.userNameText}>{username}</Text>
      </View>
      <Text style={styles.teamText}>
        {teams <= 1 ? teams + " Team" : teams + " Teams"}
      </Text>
    </View>
  );
};

export default UserTeamsCard;

const styles = StyleSheet.create({
  detailsContainer: {
    marginBottom: 20,
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
  userNameText: {
    fontSize: 13,
    color: COLORS.light_grey,
    fontWeight: "bold",
    marginLeft: 8,
  },
  teamText: {
    color: COLORS.light_grey,
    fontSize: 13,
    fontWeight: "bold",
  },
});
