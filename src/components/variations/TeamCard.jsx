import React, { useEffect, useState } from "react";
import COLORS from "../../constants/colors";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ContestsScreen from "./ContestsScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DataTable } from "react-native-paper";
export default function TeamCard({
  index,
  matchData,
  PlayersData,
  captainName,
  viceCaptainName,
}) {
  const navigation = useNavigation();
  const filterWK = PlayersData.filter((player) => player.skill === "WK");
  const filterBAT = PlayersData.filter((player) => player.skill === "BAT");
  const filterAR = PlayersData.filter((player) => player.skill === "AR");
  const filterBOWL = PlayersData.filter((player) => player.skill === "BOWL");
  const teamA = PlayersData.filter((player) => player.team === "ABC");
  const teamB = PlayersData.filter((player) => player.team === "DEF");
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: COLORS.bgMateBlack,
          paddingHorizontal: 20,
          marginHorizontal: 8,
          paddingVertical: 12,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <Text style={{ color: COLORS.light, fontSize: 18 }}>
          Team {index + 1}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 20,
        }}
      >
        <View
          style={{ flexDirection: "column", justifyContent: "space-around" }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              gap: 25,
            }}
          >
            <Text
              style={{ color: COLORS.silver, fontWeight: "bold", fontSize: 16 }}
            >
              {matchData.teamAName}
            </Text>
            <Text
              style={{ color: COLORS.silver, fontWeight: "bold", fontSize: 16 }}
            >
              {matchData.teamBName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              gap: 25,
            }}
          >
            <Text
              style={{ color: COLORS.silver, fontWeight: "800", fontSize: 16 }}
            >
              {teamA.length}
            </Text>
            <Text
              style={{ color: COLORS.silver, fontWeight: "800", fontSize: 16 }}
            >
              {teamB.length}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            gap: 25,
          }}
        >
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: COLORS.transparentBg,
              borderRadius: 10,
            }}
          >
            <Text style={styles.CVcName}>{captainName}</Text>
            <Text style={styles.circle}>C</Text>
          </View>
          <View
            style={{
              height: 50,
              width: 50,
              backgroundColor: COLORS.transparentBg,
              borderRadius: 10,
            }}
          >
            <Text style={styles.CVcName}>{viceCaptainName}</Text>
            <Text style={styles.circle}>VC</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 10,
        }}
      >
        <Text style={styles.categoryText}>WK {filterWK.length}</Text>
        <Text style={styles.categoryText}>BAT {filterBAT.length}</Text>
        <Text style={styles.categoryText}>AR {filterAR.length}</Text>
        <Text style={styles.categoryText}>BOWL {filterBOWL.length}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.light_grey,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    fontSize: 10,
    backgroundColor: COLORS.dark,
    color: COLORS.light,
    textAlign: "center",
    position: "absolute",
    top: "0%",
    left: "0%",
    borderColor: COLORS.light,
    borderWidth: 1,
    paddingVertical: 2,
  },
  CVcName: {
    fontSize: 10,
    textAlign: "center",
    backgroundColor: COLORS.dark,
    color: COLORS.light,
    position: "relative",
    top: "80%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  mainContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 2,
    // paddingHorizontal: 2
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: COLORS.transparentBg,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
});
