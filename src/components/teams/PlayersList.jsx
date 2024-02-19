import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import allPlayersData from "../../constants/dummyPlayers.json";

const PlayersList = ({
  activePlayerTab,
  onAddPlayerPress,
  onPlayerSelectionPress,
  onUpdateCredits,
  onUpdateTotalPlayers,
  onUpdateTeamABCPlayers,
  onUpdateTeamDEFPlayers,
  tabConditions,
  CheckMaxLimit,
  // onSelectedPlayersChange,
}) => {
  const [playersData, setPlayersData] = useState(allPlayersData);
  const [pointsToggle, setPointsToggle] = useState(false);
  const [creditsToggle, setCreditsToggle] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [totalCreditsSelected, setTotalCreditsSelected] = useState(0);

  // useEffect(() => {
  //   onSelectedPlayersChange(selectedPlayers);
  // }, [selectedPlayers, onSelectedPlayersChange]);

  useEffect(() => {
    const filteredPlayers = allPlayersData.filter(
      (player) => player.skill === activePlayerTab
    );
    if (pointsToggle) {
      sortPlayersByPoints(filteredPlayers, pointsToggle);
    } else {
      sortPlayersByCredits(filteredPlayers, creditsToggle);
    }
  }, [activePlayerTab, pointsToggle, creditsToggle]);

  useEffect(() => {
    // Calculate total credits selected
    const totalCredits = selectedPlayers.reduce((total, player) => {
      return total + parseFloat(player.credits);
    }, 0);
    // Update parent component with total credits
    onUpdateCredits(totalCredits);
  }, [selectedPlayers, onUpdateCredits]);

  const sortPlayersByPoints = (filteredPlayers, toggle) => {
    const sortedPlayers = [...filteredPlayers].sort((a, b) => {
      return toggle ? a.points - b.points : b.points - a.points;
    });
    setPlayersData(sortedPlayers);
  };

  const sortPlayersByCredits = (filteredPlayers, toggle) => {
    const sortedPlayers = [...filteredPlayers].sort((a, b) => {
      return toggle ? a.credits - b.credits : b.credits - a.credits;
    });
    setPlayersData(sortedPlayers);
  };

  const handlePointsToggle = () => {
    setPointsToggle(!pointsToggle);
    setCreditsToggle(false);
  };

  const handleCreditsToggle = () => {
    setCreditsToggle(!creditsToggle);
    setPointsToggle(false);
  };

  const handlePlayerPress = (player) => {
    const index = selectedPlayers.findIndex((p) => p === player);
    const isAddingPlayer = index === -1;
    if (
      activePlayerTab === "WK" &&
      isAddingPlayer &&
      CheckMaxLimit(activePlayerTab) >= 4
    ) {
      ToastAndroid.showWithGravity(
        "Max limit exceed for Wicket keeper",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    if (
      activePlayerTab === "BOWL" &&
      isAddingPlayer &&
      CheckMaxLimit(activePlayerTab) >= 6
    ) {
      ToastAndroid.showWithGravity(
        "Max limit exceed for BOWL",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    if (
      activePlayerTab === "BAT" &&
      isAddingPlayer &&
      CheckMaxLimit(activePlayerTab) >= 6
    ) {
      ToastAndroid.showWithGravity(
        "Max limit exceed for BATSMEN",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    if (
      activePlayerTab === "AR" &&
      isAddingPlayer &&
      CheckMaxLimit(activePlayerTab) >= 4
    ) {
      ToastAndroid.showWithGravity(
        "Max limit exceed for ALL ROUNDER",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    if (isAddingPlayer) {
      if (totalCreditsSelected + parseFloat(player.credits) <= 100) {
        if (selectedPlayers.length < 11) {
          setSelectedPlayers([...selectedPlayers, player]);
          setTotalCreditsSelected(
            totalCreditsSelected + parseFloat(player.credits)
          );
          onUpdateTotalPlayers((prev) => prev + 1);
          // if (player.team === "ABC") {
          //   onUpdateTeamABCPlayers((prev) => prev + 1);
          // } else if (player.team === "DEF") {
          //   onUpdateTeamDEFPlayers((prev) => prev + 1);
          // }
          onPlayerSelectionPress(player, true, activePlayerTab);
        } else {
          ToastAndroid.show(
            "You can select a maximum of 11 players",
            ToastAndroid.SHORT
          );
        }
      } else {
        ToastAndroid.show(
          "Total credits cannot exceed 100",
          ToastAndroid.SHORT
        );
      }
    } else {
      setSelectedPlayers(selectedPlayers.filter((p, i) => i !== index));
      setTotalCreditsSelected(
        totalCreditsSelected - parseFloat(player.credits)
      );
      onUpdateTotalPlayers((prev) => Math.max(prev - 1, 0));
      onPlayerSelectionPress(player, false, activePlayerTab);
      // if (player.team === "ABC") {
      //   onUpdateTeamABCPlayers((prev) => Math.max(prev - 1, 0));
      // } else if (player.team === "DEF") {
      //   onUpdateTeamDEFPlayers((prev) => Math.max(prev - 1, 0));
      // }
    }
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
      <FlatList
        data={playersData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.playerContainer,
              selectedPlayers.includes(item) && styles.selectedPlayerContainer,
            ]}
            onPress={() => handlePlayerPress(item)}
          >
            {/* Player logo */}
            <View style={styles.playerLogoContainer}>
              <Text
                style={
                  ([
                    styles.playerTeamName,
                    selectedPlayers.includes(item) && styles.selectedPlayerName,
                  ],
                  item.team === "DEF"
                    ? {
                        ...styles.playerTeamName,
                        backgroundColor: COLORS.secondary,
                        color: COLORS.dark,
                      }
                    : {
                        ...styles.playerTeamName,
                        backgroundColor: COLORS.dark,
                        color: COLORS.light,
                      })
                }
              >
                {item.team}
              </Text>
              <View style={styles.playerLogo} />
            </View>
            {/* Player details like name and their selection percentage */}
            <View style={styles.playerDetails}>
              <Text
                style={[
                  styles.playerName,
                  selectedPlayers.includes(item) && styles.selectedPlayerName,
                ]}
              >
                {item.name}
              </Text>
              <Text
                style={[
                  styles.playerSelectionPercentage,
                  selectedPlayers.includes(item) &&
                    styles.selectedPlayerSelectionPercentage,
                ]}
              >
                Sel by {item.selection_percentage}
              </Text>
              <View style={[styles.playerStatus, { width: 95 }]}>
                {item.last_match_status === "" ? null : (
                  <Ionicons
                    name="checkmark-done-circle"
                    size={10}
                    color={COLORS.secondary}
                  />
                )}
                <Text
                  style={[
                    styles.playerStatusText,
                    selectedPlayers.includes(item) &&
                      styles.selectedPlayerStatusText,
                  ]}
                >
                  {item.last_match_status}
                </Text>
              </View>
            </View>
            {/* Player points */}
            <View style={[styles.playerPoints, { width: 25 }]}>
              <Text
                style={[
                  styles.playerPointsText,
                  selectedPlayers.includes(item) &&
                    styles.selectedPlayerPointsText,
                ]}
              >
                {item.points}
              </Text>
            </View>
            {/* Player credits */}
            <View style={[styles.playerCredits, { width: 25 }]}>
              <Text
                style={[
                  styles.playerCreditsText,
                  selectedPlayers.includes(item) &&
                    styles.selectedPlayerCreditsText,
                ]}
              >
                {item.credits < 10
                  ? item.credits.toFixed(1).concat(" ")
                  : item.credits.toFixed(1)}
              </Text>
              {/* Add Player button */}
              <TouchableOpacity onPress={() => handlePlayerPress(item)}>
                <Ionicons
                  name={
                    selectedPlayers.includes(item)
                      ? "remove-circle-outline"
                      : "ios-add-circle-outline"
                  }
                  size={24}
                  color={
                    selectedPlayers.includes(item)
                      ? COLORS.silver
                      : COLORS.secondary
                  }
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PlayersList;

const styles = StyleSheet.create({
  playerTeamName: {
    color: COLORS.light,
    fontSize: 10,
    fontWeight: "bold",
    position: "absolute",
    top: -12,
    backgroundColor: COLORS.dark,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: COLORS.transparentBg,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: "center",
    borderTopWidth: 0,
  },
  playerLogoContainer: {
    position: "relative",
  },
  playerPoints: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
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
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginLeft: 22,
  },
  playerDetails: {
    flexDirection: "column",
    marginLeft: 10,
    gap: 1,
    marginRight: 22,
    alignItems: "flex-start",
  },
  playerLogo: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 2,
    backgroundColor: COLORS.silver,
    marginTop: 10,
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
    color: COLORS.secondary,
    fontSize: 10,
  },
  playerContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.transparentBg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.transparentBg,
  },
  selectedPlayerContainer: {
    backgroundColor: COLORS.dark,
    borderColor: COLORS.secondary,
  },
  selectedPlayerName: {
    color: COLORS.secondary,
  },
  selectedPlayerSelectionPercentage: {
    color: COLORS.light_grey,
  },
  selectedPlayerStatusText: {
    color: COLORS.secondary,
  },
  selectedPlayerPointsText: {
    color: COLORS.secondary,
  },
  selectedPlayerCreditsText: {
    color: COLORS.secondary,
  },
  playergridContainer: {
    flex: 1,
    flexDirection: "column",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.dark,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  topTitle: {
    color: COLORS.silver,
    fontSize: 11,
    fontWeight: "bold",
  },
});
