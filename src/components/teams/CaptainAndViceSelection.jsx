import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  FlatList,
  ScrollView,
} from "react-native";
import styles from "../../styles/variations.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PlayerCardsComponent from "./PlayerCardsComponent.jsx";
// import PlayersData from "../../constants/dummyPlayers.json";

const CaptainAndViceSelection = ({ route }) => {
  const { data, details, PlayersData, amount, variation } = route.params;
  const navigation = useNavigation();
  const filterWK = PlayersData.filter((player) => player.skill === "WK");
  const filterBAT = PlayersData.filter((player) => player.skill === "BAT");
  const filterAR = PlayersData.filter((player) => player.skill === "AR");
  const filterBOWL = PlayersData.filter((player) => player.skill === "BOWL");
  const combinedData = [...filterWK, ...filterBAT, ...filterAR, ...filterBOWL];
  const [captainName, setcaptainName] = useState("");
  const [viceCaptainName, setViceCaptainName] = useState("");

  function updateCaptain(pname, set) {
    if (set == true) {
      setcaptainName(pname);
    } else {
      setcaptainName("");
    }
  }
  function updateViceCaptain(pname, set) {
    if (set == true) {
      setViceCaptainName(pname);
    } else {
      setViceCaptainName("");
    }
  }
  const renderPlayerCardsList = (data) => {
    return data.map((item) => (
      <PlayerCardsComponent
        key={item.name.toString()}
        data={item}
        captainName={captainName}
        viceCaptainName={viceCaptainName}
        updateCaptain={updateCaptain}
        updateViceCaptain={updateViceCaptain}
      />
    ));
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Container */}
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
            <Text style={styles.matchTeamText}>{"ABC vs DEF"}</Text>
            <Text style={styles.matchTimeText}>
              {data.timeRemaining}
              {" left"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TeamPreview", {
              data: data,
              details: details,
            });
          }}
          style={styles.backArrow}
        >
          <MaterialCommunityIcons
            name="stadium-variant"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      {/* Info Display to select vc and captain on basis of points */}
      <View
        style={[
          styles2.displayContainer,
          {
            backgroundColor: COLORS.transparentBg,
            marginHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 5,
          },
        ]}
      >
        <Text
          style={[
            styles2.displayText,
            {
              fontSize: 14,
            },
          ]}
        >
          {"Select your Captain and Vice-Captain"}
        </Text>
        <View style={styles2.displayMiddleContainer}>
          <Text
            style={[styles2.playersText, { fontSize: 12, fontWeight: "bold" }]}
          >
            {"C gets 2X points"}
          </Text>
          <Text
            style={[styles2.playersText, { fontSize: 12, fontWeight: "bold" }]}
          >
            {"VC gets 1.5X points"}
          </Text>
        </View>
      </View>
      {/* Sorting Container */}
      <View style={styles2.topContainer}>
        <Text style={styles2.topTitle}>SORT BY</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles2.topTitle}>POINTS</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 36,
          }}
        >
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles2.topTitle}>
              BY %C
              {/* {false ? (
                <Ionicons name="ios-arrow-up" size={13} color={COLORS.dark} />
              ) : (
                <Ionicons name="ios-arrow-down" size={13} color={COLORS.dark} />
              )} */}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles2.topTitle}>
              BY %VC
              {/* {false ? (
                <Ionicons name="ios-arrow-up" size={13} color={COLORS.dark} />
              ) : (
                <Ionicons name="ios-arrow-down" size={13} color={COLORS.dark} />
              )} */}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 12 }}
      >
        {/* Wicketkeepers list */}
        <View style={{ marginBottom: 12 }}>
          {renderPlayerCardsList(filterWK)}
        </View>

        {/* Batters list */}
        <View style={{ marginBottom: 12 }}>
          {renderPlayerCardsList(filterBAT)}
        </View>

        {/* All rounders list */}
        <View style={{ marginBottom: 12 }}>
          {renderPlayerCardsList(filterAR)}
        </View>

        {/* Bowlers list */}
        <View>{renderPlayerCardsList(filterBOWL)}</View>
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: COLORS.dark,
          marginVertical: 20,
          marginHorizontal: 20,
          alignItems: "center",
          paddingVertical: 12,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: COLORS.primary,
        }}
        onPress={() => {
          if (captainName === "" && viceCaptainName === "") {
            ToastAndroid.show(
              "Please Select Captain and Vice captain",
              ToastAndroid.SHORT
            );
          } else if (captainName === "") {
            ToastAndroid.show("Please Select Captain ", ToastAndroid.SHORT);
          } else if (viceCaptainName === "") {
            ToastAndroid.show(
              "Please Select Vice Captain ",
              ToastAndroid.SHORT
            );
          } else {
            // navigation.navigate("ContestBottomNavigation", {
            //   screen: "My Teams",
            //   params: {
            //     data: data,
            //     amount: amount,
            //     variation: variation,
            //     PlayersData: PlayersData,
            //     captainName: captainName,
            //     viceCaptainName: viceCaptainName,
            //   },
            // });
            navigation.navigate("MyTeamsScreen", {
              data: data,
              amount: amount,
              variation: variation,
              PlayersData: PlayersData,
              captainName: captainName,
              viceCaptainName: viceCaptainName,
            });
          }
        }}
      >
        <Text style={{ color: COLORS.light, fontSize: 16, fontWeight: "500" }}>
          Confirm Team
        </Text>
      </TouchableOpacity>
      {/* 3 Containers to have different Flatlists rendering */}
      {/* <View style={styles2.playersComponentContainer}> */}
      {/* <FlatList
          data={combinedData}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => (
            <PlayerCardsComponent
              data={item}
              captainName={captainName}
              viceCaptainName={viceCaptainName}
              updateCaptain={updateCaptain}
              updateViceCaptain={updateViceCaptain}
            />
          )}
        /> */}

      {/* <FlatList
          data={filterWK}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => (
            <PlayerCardsComponent
              data={item}
              captainName={captainName}
              viceCaptainName={viceCaptainName}
              updateCaptain={updateCaptain}
              updateViceCaptain={updateViceCaptain}
            />
          )}
        />
        
        <FlatList
          data={filterBAT}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => (
            <PlayerCardsComponent
              data={item}
              captainName={captainName}
              viceCaptainName={viceCaptainName}
              updateCaptain={updateCaptain}
              updateViceCaptain={updateViceCaptain}
            />
          )}
        />
        
        <FlatList
          data={filterAR}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => (
            <PlayerCardsComponent
              data={item}
              captainName={captainName}
              viceCaptainName={viceCaptainName}
              updateCaptain={updateCaptain}
              updateViceCaptain={updateViceCaptain}
            />
          )}
        />
        
        <FlatList
          data={filterBOWL}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => (
            <PlayerCardsComponent
              data={item}
              captainName={captainName}
              viceCaptainName={viceCaptainName}
              updateCaptain={updateCaptain}
              updateViceCaptain={updateViceCaptain}
            />
          )}
        />
      </View> */}
    </SafeAreaView>
  );
};

export default CaptainAndViceSelection;

const styles2 = StyleSheet.create({
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
  playerStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  playerStatusText: {
    color: COLORS.secondary,
    fontSize: 10,
  },
  playerLogoContainer: {
    position: "relative",
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
  playersComponentContainer: {
    flexDirection: "column",
    flex: 1,
    gap: 12,
    marginTop: 16,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.transparentBg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: "center",
  },
  topTitle: {
    color: COLORS.light_grey,
    fontSize: 12,
    fontWeight: "bold",
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
    color: COLORS.light_grey,
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
    color: COLORS.light,
  },
});
