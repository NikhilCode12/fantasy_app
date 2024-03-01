import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from "react-native";
import styles from "../../styles/variations.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PreviewScreen = ({ route }) => {
  const { data, details } = route.params;
  const navigation = useNavigation();
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
            <Text style={styles.matchTeamText}>
              {data.teamAName} vs {data.teamBName}
            </Text>
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
      {/* Display Container */}
      <View style={styles2.displayContainer}>
        {/* Bottom Container to show players selected, team logos and their respective players and credits left */}
        <View style={styles2.displayMiddleContainer}>
          {/* Players Selected */}
          <View style={styles2.playersSelectedContainer}>
            <Text style={styles2.playersText}>{"Players"}</Text>
            <Text style={styles2.playersSelectedText}>
              {details.totalPlayers}
              <Text style={styles2.playersText}>{" / 11"}</Text>
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
                  {details.teamABCPlayers}
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
                  {details.teamDEFPlayers}
                </Text>
              </View>
              <Image src={data.teamBImage} style={styles2.teamLogo} />
            </View>
          </View>
          {/* Credit Left Container */}
          <View style={styles2.creditsLeftContainer}>
            <Text style={styles2.playersText}>{"Credits Left"}</Text>
            <Text style={styles2.playersSelectedText}>
              {details.totalCredits}
            </Text>
          </View>
        </View>
      </View>
      {/* Preview Field Screen */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          borderWidth: 4,
          borderColor: COLORS.bgLightBlack,
          marginVertical: 30,
          marginHorizontal: 16,
          borderRadius: 10,
        }}
      >
        <Text
          style={[styles2.tabText, { fontSize: 20, color: COLORS.lightGray }]}
        >
          Field Design Required!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PreviewScreen;

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
