import {
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/variations.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlayerListComponent from "./PlayerList3.jsx";

const PlayerSelection3 = ({ route }) => {
  const { data, amount, variation, newTeam } = route.params;
  const navigation = useNavigation();
  const [totalCredits, setTotalCredits] = useState(30);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [teamABCPlayers, setTeamABCPlayers] = useState(0);
  const [teamDEFPlayers, setTeamDEFPlayers] = useState(0);
  const [wkCount, setWkCount] = useState(0);
  const [batsmenCount, setbatsmenCount] = useState(0);
  const [bowlerCount, setbowlerCount] = useState(0);
  const [allRounderCount, setallRounderCount] = useState(0);
  const [selectedPlayersData, setselectedPlayersData] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState(Array(3).fill(false));
  const [activeTab, setActiveTab] = useState("wk");

  const [refreshing, setRefreshing] = useState(true);
  const [teamA, setTeamA] = useState([]);
  const [teamB, setTeamB] = useState([]);
  const [matchId, setMatchId] = useState(data.matchId);
  const [competitionId, setCompetitionId] = useState(data.competitionId);
  const [playersData, setPlayersData] = useState([]);
  const [squadsData, setSquadsData] = useState([]);
  useEffect(() => {
    const getMatchIdandCompetitionId = async () => {
      try {
        const matchId = await AsyncStorage.getItem("matchId");
        const competitionId = await AsyncStorage.getItem("competitionId");
        console.log("matchId: ", matchId);
        console.log("competitionId: ", competitionId);
        setMatchId(matchId);
        setCompetitionId(competitionId);
      } catch (e) {
        console.log("Error getting matchId and competitionId: ", e);
      }
    };

    getMatchIdandCompetitionId();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://fanverse-backend.onrender.com/api/squads?competitionId=${competitionId}&matchId=${matchId}`
        );
        const data = await response.json();
        setSquadsData(data.squads);

        const teamA = data.squads[0];
        const teamB = data.squads[1];
        // console.log("team a is : ".teamA);
        // console.log("team b is : ".teamB);
        setTeamA(teamA);
        setTeamB(teamB);

        // find the object from the data.squads array

        setPlayersData(shuffleArray(teamA.players.concat(teamB.players)));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (playersData.length > 0) {
      setRefreshing(false);
    }
  }, [playersData]);
  const getTeamName = (player) => {
    if (teamA.players.includes(player)) {
      return teamA.team.abbr;
    }
    if (teamB.players.includes(player)) {
      return teamB.team.abbr;
    }
  };
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

  const tabText = {
    wk: "Pick 0-3 Wicket Keepers",
    bat: "Pick 0-3 Batsmen",
    all: "Pick 0-3 All-Rounders",
    bowl: "Pick 0-3 Bowlers",
  };

  const variationType = {
    "7 + 4": "Maximum 7 players from one team",
    "10 + 1": "Maximum 10 players from one team",
    "Fantastic 5": "Maximum 4 players from one team",
    "Top 3": "No restrictions on team selection",
    Powerplay: "Select 1-4 players in powerplay",
    "Fanverse original": "SuperSmash players included",
    Playgrounds: "Create your own contests and play",
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

  const handlePlayerSelectionPress = (player, selectionStatus, tab) => {
    const index = selectedPlayers.indexOf(player);
    // console.log(index);
    if (selectionStatus && totalPlayers < 3 && index === -1) {
      const newSelectedPlayers = [...selectedPlayers];
      const emptyIndex = newSelectedPlayers.indexOf(false);
      newSelectedPlayers[emptyIndex] = player;
      setSelectedPlayers(newSelectedPlayers);
      setTotalPlayers(totalPlayers + 1);
      if (tab === "wk") setWkCount((wkCount) => wkCount + 1);
      else if (tab === "bat")
        setbatsmenCount((batsmenCount) => batsmenCount + 1);
      else if (tab === "bowl") setbowlerCount((bowlerCount) => bowlerCount + 1);
      else setallRounderCount((allRounderCount) => allRounderCount + 1);
      if (getTeamName(player) === teamA.team.abbr) {
        setTeamABCPlayers(teamABCPlayers + 1);
      } else {
        setTeamDEFPlayers(teamDEFPlayers + 1);
      }
      setselectedPlayersData([...selectedPlayersData, player]);
    } else if (!selectionStatus && totalPlayers > 0 && index !== -1) {
      // If the player is deselected and the player is already selected
      const newSelectedPlayers = [...selectedPlayers];
      newSelectedPlayers[index] = false;
      setSelectedPlayers(newSelectedPlayers);
      setTotalPlayers(totalPlayers - 1);

      // console.log(activeTab, totalPlayers);
      if (tab === "wk") setWkCount((wkCount) => wkCount - 1);
      else if (tab === "bat")
        setbatsmenCount((batsmenCount) => batsmenCount - 1);
      else if (tab === "bowl") setbowlerCount((bowlerCount) => bowlerCount - 1);
      else setallRounderCount((allRounderCount) => allRounderCount - 1);
      if (getTeamName(player) === teamA.team.abbr) {
        setTeamABCPlayers(teamABCPlayers - 1);
      } else {
        setTeamDEFPlayers(teamDEFPlayers - 1);
      }
      setselectedPlayersData(
        selectedPlayersData.filter((p) => p.title !== player.title)
      );
    }
    // console.log(totalPlayers);
  };
  // useEffect(() => {
  //   console.log(selectedPlayersData.length);
  // }, [selectedPlayersData]);
  const handleUpdateCredits = (credits) => {
    setTotalCredits(30 - credits);
  };

  const handleUpdateTotalPlayers = (count, tab) => {
    // if (tab === "wk") setWkCount((wkCount) => wkCount + 1);
    // else if (tab === "bat") setbatsmenCount((batsmenCount) => batsmenCount + 1);
    // else if (tab === "bowl") setbowlerCount((bowlerCount) => bowlerCount + 1);
    // else setallRounderCount((allRounderCount) => allRounderCount + 1);
    // if (tab === "wk") console.log("cb");
    setTotalPlayers(count);
  };

  const handleUpdateTeamABCPlayers = (count) => {
    setTeamABCPlayers(count);
  };

  const handleUpdateTeamDEFPlayers = (count) => {
    setTeamDEFPlayers(count);
  };

  const handleResetButton = () => {
    setSelectedPlayers(Array(3).fill(false));
    setTotalPlayers(0);
    setTeamABCPlayers(0);
    setTeamDEFPlayers(0);
    setTotalCredits(30);
    setWkCount(0);
    setbatsmenCount(0);
    setbowlerCount(0);
    setallRounderCount(0);
    ToastAndroid.showWithGravity(
      "Team Reset Successfully.",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const handleContinueButtonPress = () => {
    if (totalPlayers < 3) {
      ToastAndroid.showWithGravity(
        "Team must have 3 players.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else if (teamABCPlayers < 0) {
      ToastAndroid.showWithGravity(
        `Select atleast 1 from Team ${teamA.team.abbr}.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else if (teamDEFPlayers < 0) {
      ToastAndroid.showWithGravity(
        `Select atleast 1 from Team ${teamB.team.abbr}.`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else if (totalPlayers === 3) {
      navigation.navigate("MvpSelection", {
        data: data,
        amount: amount,
        variation: variation,
        PlayersData: selectedPlayersData,
        details: {
          totalPlayers,
          teamABCPlayers,
          teamDEFPlayers,
          totalCredits,
          teamA,
          teamB,
        },
      });
    } else {
      ToastAndroid.showWithGravity(
        "Each Team must have min 1 Player ",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  const handlePreviewButtonPress = () => {
    if (totalPlayers > 0) {
      navigation.navigate("TeamPreview", {
        data: data,
        amount: amount,
        variation: variation,
        details: {
          totalPlayers,
          teamABCPlayers,
          teamDEFPlayers,
          totalCredits,
        },
      });
    } else {
      ToastAndroid.showWithGravity(
        "Select atleast 1 player to preview.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };
  const CheckMaxLimit = (tab) => {
    if (tab === "wk") return wkCount;
    else if (tab === "bat") return batsmenCount;
    else if (tab === "bowl") return bowlerCount;
    return allRounderCount;
  };
  useEffect(() => {
    // console.log("---------------");
    // console.log("wk : ", wkCount);
    // console.log("bat : ", batsmenCount);
    // console.log("bowl : ", bowlerCount);
    // console.log("all : ", allRounderCount);
    // console.log("Total : ", totalPlayers);
  }, [totalPlayers]);
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
          {variationType[variation] ? variationType[variation] : variation}
        </Text>
        {/* Bottom Container to show players selected, team logos and their respective players and credits left */}
        <View style={styles2.displayMiddleContainer}>
          {/* Players Selected */}
          <View style={styles2.playersSelectedContainer}>
            <Text style={styles2.playersText}>{"Players"}</Text>
            <Text style={styles2.playersSelectedText}>
              {totalPlayers}
              <Text style={styles2.playersText}>{" / 3"}</Text>
            </Text>
          </View>
          {/* Team logos and their players selected data */}
          <View style={styles2.teamContainer}>
            {/* Team 1 logo,title and players */}
            <View style={styles2.logoContainer}>
              <Image src={data.teamAImage} style={styles2.teamLogo} />
              <View style={styles2.teamDataContainer}>
                <Text style={styles2.playersText}>{data.teamAName}</Text>
                <Text style={styles2.playersSelectedText}>
                  {teamABCPlayers}
                </Text>
              </View>
            </View>
            {/* Team 2 logo,title and players */}
            <View style={styles2.logoContainer}>
              <View style={styles2.teamDataContainer}>
                <Text style={styles2.playersText}>{data.teamBName}</Text>
                <Text
                  style={[styles2.playersSelectedText, { textAlign: "right" }]}
                >
                  {teamDEFPlayers}
                </Text>
              </View>
              <Image src={data.teamBImage} style={styles2.teamLogo} />
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
                  totalPlayers > index
                    ? styles2.selectedPlayerProgressBlock
                    : null,
                  // isSelected ? styles2.selectedPlayerProgressBlock : null,
                ]}
              >
                {index == 2 ? (
                  <Text
                    style={{
                      color: isSelected ? COLORS.dark : COLORS.light,
                      fontSize: 10,
                      fontWeight: "500",
                    }}
                  >
                    3
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
      {/* Tabs container to select wk(0), bat(0), all(0) and bowl(0) */}
      <View style={styles2.tabsContainer}>
        {["wk", "bat", "all", "bowl"].map((tab, index) => (
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
              {tab.toUpperCase()}
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
        {refreshing == true ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{ marginTop: "40%" }}
          />
        ) : (
          <PlayerListComponent
            data={data}
            activePlayerTab={activeTab}
            onAddPlayerPress={() => handleAddPlayer(0)}
            onPlayerSelectionPress={(player, selectionStatus, tab) =>
              handlePlayerSelectionPress(player, selectionStatus, tab)
            }
            onUpdateCredits={(credits) => handleUpdateCredits(credits)}
            onUpdateTotalPlayers={handleUpdateTotalPlayers}
            onUpdateTeamABCPlayers={handleUpdateTeamABCPlayers}
            onUpdateTeamDEFPlayers={handleUpdateTeamDEFPlayers}
            tabConditions={tabText}
            CheckMaxLimit={CheckMaxLimit}
            variation={variation}
            teamA={teamA}
            teamB={teamB}
            AllplayersData={playersData}
            // on reset button clicked
          />
        )}
      </View>
      {/* Buttons Container for preview and next */}
      <View style={styles2.buttonsContainer}>
        <TouchableOpacity
          style={styles2.button}
          onPress={handlePreviewButtonPress}
        >
          <Ionicons name="eye" size={16} color={COLORS.light} />
          <Text style={styles2.buttonText}>{"Preview"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles2.button,
            {
              backgroundColor:
                totalPlayers === 3 ? COLORS.secondary : COLORS.lightGray,
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

export default PlayerSelection3;

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
    flexDirection: "row",
    gap: 6,
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
    borderWidth: 1,
    borderColor: COLORS.transparentBg,
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
