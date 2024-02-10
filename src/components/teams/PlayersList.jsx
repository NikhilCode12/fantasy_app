import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import players from "../../constants/players.json";

const PlayersList = ({ activePlayerTab, onAddPlayerPress }) => {
  const [pointsToggle, setPointsToggle] = useState(false);
  const [creditsToggle, setCreditsToggle] = useState(false);

  const handlePointsToggle = () => {
    setPointsToggle(!pointsToggle);
  };

  const handleCreditsToggle = () => {
    setCreditsToggle(!creditsToggle);
  };

  const handlePlayerPress = () => {
    console.log("Player Pressed");
  };
  return (
    <View style={styles.playergridContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.topTitle}>SELECTED BY</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          <TouchableOpacity onPress={handlePointsToggle}>
            <Text style={styles.topTitle}>
              POINTS
              {pointsToggle ? (
                <Ionicons name="ios-arrow-up" size={12} color={COLORS.silver} />
              ) : (
                <Ionicons
                  name="ios-arrow-down"
                  size={12}
                  color={COLORS.silver}
                />
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreditsToggle}>
            <Text style={styles.topTitle}>
              CREDITS
              {creditsToggle ? (
                <Ionicons name="ios-arrow-up" size={12} color={COLORS.silver} />
              ) : (
                <Ionicons
                  name="ios-arrow-down"
                  size={12}
                  color={COLORS.silver}
                />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Players List */}
      <TouchableOpacity
        style={styles.playerContainer}
        onPress={handlePlayerPress}
      >
        {/* Player logo */}
        <View style={styles.playerLogo} />
        {/* Player details like name and their selection percentage */}
        <View style={styles.playerDetails}>
          <Text style={styles.playerName}>Player Name</Text>
          <Text style={styles.playerSelectionPercentage}>
            Selected by 50.25%
          </Text>
          <View style={styles.playerStatus}>
            <Ionicons
              name="ios-checkmark-circle"
              size={10}
              color={COLORS.primary}
            />

            <Text style={styles.playerStatusText}>Played last match</Text>
          </View>
        </View>
        {/* Player points */}
        <View style={styles.playerPoints}>
          <Text style={styles.playerPointsText}>102</Text>
        </View>
        {/* Player credits */}
        <View style={styles.playerCredits}>
          <Text style={styles.playerCreditsText}>8.5</Text>
          {/* Add Player button */}
          <TouchableOpacity onPress={onAddPlayerPress}>
            <Ionicons
              name="ios-add-circle-outline"
              size={20}
              color={COLORS.silver}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PlayersList;

const styles = StyleSheet.create({
  playerPoints: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 32,
  },
  playerPointsText: {
    color: COLORS.light,
    fontSize: 13,
    fontWeight: "bold",
  },
  playerCreditsText: {
    color: COLORS.light,
    fontSize: 13,
    fontWeight: "bold",
  },
  playerCredits: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 24,
  },
  playerDetails: {
    flexDirection: "column",
    marginLeft: 10,
    gap: 1,
    marginRight: 10,
    alignItems: "flex-start",
  },
  playerLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 2,
    backgroundColor: COLORS.silver,
  },
  playerName: {
    color: COLORS.light,
    fontSize: 12,
    fontWeight: "bold",
  },
  playerSelectionPercentage: {
    color: COLORS.silver,
    fontSize: 11,
  },
  playerStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  playerStatusText: {
    color: COLORS.primary,
    fontSize: 10,
  },
  playerContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.transparentBg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.transparentBg,
  },

  playergridContainer: {
    flex: 1,
    flexDirection: "column",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.dark,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  topTitle: {
    color: COLORS.silver,
    fontSize: 11,
    fontWeight: "bold",
  },
});
