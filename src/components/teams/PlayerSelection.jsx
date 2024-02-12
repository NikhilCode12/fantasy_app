import {
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../styles/variations.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlayerListComponent from "./PlayersList.jsx";

const PlayerSelection = ({ route }) => {
  const { data, amount, variation } = route.params;
  const navigation = useNavigation();
  const [totalCredits, setTotalCredits] = useState(100);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [teamABCPlayers, setTeamABCPlayers] = useState(0);
  const [teamDEFPlayers, setTeamDEFPlayers] = useState(0);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  const [selectedPlayers, setSelectedPlayers] = useState(Array(11).fill(false));
  const [activeTab, setActiveTab] = useState("WK");

  const tabText = {
    WK: "Pick 1-4 Wicket-Keepers",
    BAT: "Pick 3-6 Batsmen",
    AR: "Pick 1-4 All-Rounders",
    BOWL: "Pick 3-6 Bowlers",
  };

  const handleAddPlayer = (index) => {
    const newSelectedPlayers = [...selectedPlayers];
    newSelectedPlayers[index] = true;
    setSelectedPlayers(newSelectedPlayers);
  };

  const handleRemovePlayer = (index) => {
    const newSelectedPlayers = [...selectedPlayers];
    newSelectedPlayers[index] = false;
    setSelectedPlayers(newSelectedPlayers);
  };

  const handlePlayerSelectionPress = (player, selectionStatus) => {
    const index = selectedPlayers.indexOf(player);

    if (selectionStatus && totalPlayers < 11 && index === -1) {
      // If the player is selected and the total number of players is less than 11 and the player is not already selected
      const newSelectedPlayers = [...selectedPlayers];
      const emptyIndex = newSelectedPlayers.indexOf(false);
      newSelectedPlayers[emptyIndex] = player;
      setSelectedPlayers(newSelectedPlayers);
      setTotalPlayers(totalPlayers + 1);
      if (player.team === "ABC") {
        setTeamABCPlayers(teamABCPlayers + 1);
      } else {
        setTeamDEFPlayers(teamDEFPlayers + 1);
      }
    } else if (!selectionStatus && totalPlayers > 0 && index !== -1) {
      // If the player is deselected and the player is already selected
      const newSelectedPlayers = [...selectedPlayers];
      newSelectedPlayers[index] = false;
      setSelectedPlayers(newSelectedPlayers);
      setTotalPlayers(totalPlayers - 1);
      if (player.team === "ABC") {
        setTeamABCPlayers(teamABCPlayers - 1);
      } else {
        setTeamDEFPlayers(teamDEFPlayers - 1);
      }
    }
  };

  const handleUpdateCredits = (credits) => {
    setTotalCredits(100 - credits);
  };

  const handleUpdateTotalPlayers = (count) => {
    setTotalPlayers(count);
  };

  const handleUpdateTeamABCPlayers = (count) => {
    setTeamABCPlayers(count);
  };

  const handleUpdateTeamDEFPlayers = (count) => {
    setTeamDEFPlayers(count);
  };

  const handleResetButton = () => {
    setSelectedPlayers(Array(11).fill(false));
    setTotalPlayers(0);
    setTeamABCPlayers(0);
    setTeamDEFPlayers(0);
    setTotalCredits(100);
    ToastAndroid.showWithGravity(
      "Team Reset Successfully.",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const handleContinueButtonPress = () => {
    if (totalPlayers < 11) {
      ToastAndroid.showWithGravity(
        "Please select a team of 11 players.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

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
            <Text style={styles.matchTeamText}>{"Create Team 1"}</Text>
            <Text style={styles.matchTimeText}>
              {data.timeRemaining}
              {" left"}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.backArrow}>
          <Ionicons
            name="help-circle-outline"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles2.displayContainer}>
        <Text style={styles2.displayText}>
          {"Maximum of 10 players from one team"}
        </Text>
        {/* Bottom Container to show players selected, team logos and their respective players and credits left */}
        <View style={styles2.displayMiddleContainer}>
          {/* Players Selected */}
          <View style={styles2.playersSelectedContainer}>
            <Text style={styles2.playersText}>{"Players"}</Text>
            <Text style={styles2.playersSelectedText}>
              {totalPlayers}
              <Text style={styles2.playersText}>{"/ 11"}</Text>
            </Text>
          </View>
          {/* Team logos and their players selected data */}
          <View style={styles2.teamContainer}>
            {/* Team 1 logo,title and players */}
            <View style={styles2.logoContainer}>
              <View style={styles2.teamLogo} />
              <View style={styles2.teamDataContainer}>
                <Text style={styles2.playersText}>{"ABC"}</Text>
                <Text style={styles2.playersSelectedText}>
                  {teamABCPlayers}
                </Text>
              </View>
            </View>
            {/* Team 2 logo,title and players */}
            <View style={styles2.logoContainer}>
              <View style={styles2.teamDataContainer}>
                <Text style={styles2.playersText}>{"DEF"}</Text>
                <Text
                  style={[styles2.playersSelectedText, { textAlign: "right" }]}
                >
                  {teamDEFPlayers}
                </Text>
              </View>
              <View style={styles2.teamLogo} />
            </View>
          </View>
          {/* Credit Left Container */}
          <View style={styles2.creditsLeftContainer}>
            <Text style={styles2.playersText}>{"Credits Left"}</Text>
            <Text style={styles2.playersSelectedText}>{totalCredits}</Text>
          </View>
        </View>
        {/* Players selected blocks bar with removal icon */}
        <View style={styles2.playerSelectedProgressContainer}>
          <View style={{ flexDirection: "row", gap: 4 }}>
            {selectedPlayers.map((isSelected, index) => (
              <View
                key={index}
                style={[
                  styles2.block,
                  isSelected ? styles2.selectedPlayerProgressBlock : null,
                ]}
              >
                {index == 10 ? (
                  <Text
                    style={{
                      color: isSelected ? COLORS.dark : COLORS.light,
                      fontSize: 10,
                      fontWeight: "500",
                    }}
                  >
                    11
                  </Text>
                ) : null}
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={() => handleRemovePlayer(0)}>
            <Ionicons
              name="remove-circle-outline"
              size={24}
              color={COLORS.silver}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Tabs container to select WK(0), BAT(0), AR(0) and BOWL(0) */}
      <View style={styles2.tabsContainer}>
        {["WK", "BAT", "AR", "BOWL"].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles2.tab, activeTab === tab ? styles2.activeTab : null]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles2.tabText,
                activeTab === tab ? styles2.activeTabText : null,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Info and Filter */}
      <View style={styles2.infoFilterContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            width: "50%",
          }}
        >
          <Text style={styles2.infoFromTab}>{tabText[activeTab]}</Text>
          <TouchableOpacity>
            <Ionicons
              name="information-circle-outline"
              size={16}
              color={COLORS.silver}
              style={{ marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "50%",
            gap: 8,
          }}
        >
          <TouchableOpacity
            style={styles2.resetElement}
            onPress={handleResetButton}
          >
            <MaterialCommunityIcons
              name="refresh"
              size={14}
              style={{ marginVertical: 4 }}
              color={COLORS.silver}
            />
            <Text style={styles2.matchText2}>{"Reset Team"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles2.filterElement}>
            <MaterialCommunityIcons
              name="filter"
              size={14}
              style={{ marginVertical: 4 }}
              color={COLORS.silver}
            />
            <Text style={styles2.matchText2}>{"Filter"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Component rendering on basis of above tab selection */}
      <View style={styles2.playerComponentContainer}>
        <PlayerListComponent
          activePlayerTab={activeTab}
          onAddPlayerPress={() => handleAddPlayer(0)}
          onPlayerSelectionPress={(player, selectionStatus) =>
            handlePlayerSelectionPress(player, selectionStatus)
          }
          onUpdateCredits={(credits) => handleUpdateCredits(credits)}
          onUpdateTotalPlayers={handleUpdateTotalPlayers}
          onUpdateTeamABCPlayers={handleUpdateTeamABCPlayers}
          onUpdateTeamDEFPlayers={handleUpdateTeamDEFPlayers}
          tabConditions={tabText}
          // on reset button clicked
        />
      </View>
      {/* Buttons Container for preview and next */}
      <View style={styles2.buttonsContainer}>
        <TouchableOpacity style={styles2.button}>
          <Text style={styles2.buttonText}>{"Preview"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles2.button,
            {
              backgroundColor:
                totalPlayers === 11 ? COLORS.primary : COLORS.lightGray,
              borderWidth: 0,
            },
          ]}
          onPress={handleContinueButtonPress}
        >
          <Text style={[styles2.buttonText, { color: COLORS.dark }]}>
            {"Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PlayerSelection;

const styles2 = StyleSheet.create({
  playerComponentContainer: {
    height: "48.25%",
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.transparentBg,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.light,
  },
  filterElement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 8,
    gap: 6,
  },
  resetElement: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 8,
    gap: 6,
  },
  matchText2: {
    fontSize: 12,
    fontWeight: "bold",
    marginVertical: 6,
    color: COLORS.light_grey,
  },
  infoFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  infoFromTab: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.silver,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    width: "100%",
    backgroundColor: COLORS.transparentBg,
  },
  tab: {
    paddingVertical: 10,
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: COLORS.light_grey,
  },
  tabText: {
    color: COLORS.light,
    fontWeight: "bold",
    fontSize: 14,
  },
  activeTabText: {
    color: COLORS.dark,
    fontWeight: "bold",
    fontSize: 14,
  },
  selectedPlayerProgressBlock: {
    backgroundColor: COLORS.secondary,
    color: COLORS.light,
  },
  block: {
    width: 21,
    height: 19,
    borderWidth: 1,
    borderColor: COLORS.silver,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  playerSelectedProgressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 16,
  },
  creditsLeftContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  teamDataContainer: {
    marginHorizontal: 8,
  },
  teamLogo: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: COLORS.light_grey,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "center",
  },
  playersSelectedText: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.light,
  },
  playersText: {
    fontSize: 11,
    color: COLORS.silver,
  },
  playersSelectedContainer: {
    flexDirection: "column",
  },
  displayMiddleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    width: "90%",
  },
  displayContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  displayText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.light_grey,
  },
});
