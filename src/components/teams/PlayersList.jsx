import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../styles/playerList.style.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PlayersList = ({
  data,
  activePlayerTab,
  onAddPlayerPress,
  onPlayerSelectionPress,
  onUpdateCredits,
  onUpdateTotalPlayers,
  onUpdateTeamABCPlayers,
  onUpdateTeamDEFPlayers,
  tabConditions,
  CheckMaxLimit,
  variation,
  teamA,
  teamB,
  AllplayersData,
  // onSelectedPlayersChange,
}) => {
  const [squadsData, setSquadsData] = useState([]);
  const [playersData, setPlayersData] = useState([]);
  const [pointsToggle, setPointsToggle] = useState(false);
  const [creditsToggle, setCreditsToggle] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [totalCreditsSelected, setTotalCreditsSelected] = useState(0);

  // useEffect(() => {
  //   console.log(activePlayerTab);
  // }, [activePlayerTab]);
  const getTeamName = (player) => {
    if (teamA.players.includes(player)) {
      return teamA.team.abbr;
    }
    if (teamB.players.includes(player)) {
      return teamB.team.abbr;
    }
  };

  const getLastMatchStatus = (player) => {
    if (teamA.last_match_played.find((p) => p.title === player.title)) {
      return "Played last";
    }
    if (teamB.last_match_played.find((p) => p.title === player.title)) {
      return "Played last";
    }
    return "";
  };

  useEffect(() => {
    console.log(AllplayersData.length);
    const filteredPlayers = AllplayersData.filter(
      (player) => player.playing_role === activePlayerTab
    );

    // console.log(filteredPlayers.length);
    // console.log("filteredPlayers", filteredPlayers);
    if (pointsToggle) {
      sortPlayersByPoints(filteredPlayers, pointsToggle);
    } else {
      sortPlayersByCredits(filteredPlayers, creditsToggle);
    }
  }, [activePlayerTab, pointsToggle, creditsToggle]);

  useEffect(() => {
    // Calculate total credits selected
    const totalCredits = selectedPlayers.reduce((total, player) => {
      return total + parseFloat(player.fantasy_player_rating);
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
      activePlayerTab === "wk" &&
      isAddingPlayer &&
      CheckMaxLimit(activePlayerTab) >= (variation === "7 + 4" ? 4 : 8)
    ) {
      ToastAndroid.showWithGravity(
        "Max limit exceed for Wicket keeper",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    if (
      activePlayerTab === "bowl" &&
      isAddingPlayer &&
      CheckMaxLimit(activePlayerTab) >= (variation === "7 + 4" ? 6 : 8)
    ) {
      ToastAndroid.showWithGravity(
        "Max limit exceed for BOWL",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    if (
      activePlayerTab === "bat" &&
      isAddingPlayer &&
      CheckMaxLimit(activePlayerTab) >= (variation === "7 + 4" ? 6 : 8)
    ) {
      ToastAndroid.showWithGravity(
        "Max limit exceed for BATSMEN",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    if (
      activePlayerTab === "all" &&
      isAddingPlayer &&
      CheckMaxLimit(activePlayerTab) >= (variation === "7 + 4" ? 4 : 8)
    ) {
      ToastAndroid.showWithGravity(
        "Max limit exceed for ALL ROUNDER",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      return;
    }
    if (isAddingPlayer) {
      if (
        totalCreditsSelected + parseFloat(player.fantasy_player_rating) <=
        100
      ) {
        if (selectedPlayers.length < 11) {
          setSelectedPlayers([...selectedPlayers, player]);
          setTotalCreditsSelected(
            totalCreditsSelected + parseFloat(player.fantasy_player_rating)
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
        totalCreditsSelected - parseFloat(player.fantasy_player_rating)
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
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
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
                  getTeamName(item) === teamA.team.abbr
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
                {getTeamName(item)}
              </Text>
              {item.logo_url === "" ? (
                <Ionicons
                  name="person"
                  size={26}
                  color={
                    getTeamName(item) === teamA.team.abbr
                      ? COLORS.secondary
                      : COLORS.silver
                  }
                  style={styles.playerLogo}
                />
              ) : (
                <Image
                  style={styles.playerLogo}
                  source={{ uri: item.logo_url }}
                />
              )}
            </View>
            {/* Player details like name and their selection percentage */}
            <View style={styles.playerDetails}>
              <Text
                style={[
                  styles.playerName,
                  selectedPlayers.includes(item) && styles.selectedPlayerName,
                ]}
              >
                {item.short_name}
              </Text>
              <Text
                style={[
                  styles.playerSelectionPercentage,
                  selectedPlayers.includes(item) &&
                    styles.selectedPlayerSelectionPercentage,
                ]}
              >
                Sel by {"50%"}
              </Text>
              <View style={[styles.playerStatus, { width: 95 }]}>
                {getLastMatchStatus(item) === "" ? null : (
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
                  {getLastMatchStatus(item)}
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
                {Math.floor(Number(item.fantasy_player_rating)) * 15 + 1}
              </Text>
            </View>
            {/* Player credits */}
            <View style={styles.playerCredits}>
              <Text
                style={[
                  styles.playerCreditsText,
                  selectedPlayers.includes(item) &&
                    styles.selectedPlayerCreditsText,
                ]}
              >
                {item.fantasy_player_rating
                  ? item.fantasy_player_rating.toFixed(1)
                  : "1"}
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
