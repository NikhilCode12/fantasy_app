import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../constants/colors.js";
import { Ionicons } from "@expo/vector-icons";

const PlayerCardsComponent = ({
  data,
  captainName,
  viceCaptainName,
  updateCaptain,
  updateViceCaptain,
  details,
}) => {
  const [CaptainSelected, setCaptainSelected] = useState(false);
  const [ViceCaptainSelected, setViceCaptainSelected] = useState(false);
  function handleCaptain() {
    if (ViceCaptainSelected == false) {
      // setCaptainSelected(!CaptainSelected);
      updateCaptain(data.short_name, !CaptainSelected);
    } else {
      ToastAndroid.showWithGravity(
        "Captain and Vice Captain Cannot be same player's",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }
  function handleViceCaptain() {
    if (CaptainSelected == false) {
      // setViceCaptainSelected(!ViceCaptainSelected);
      updateViceCaptain(data.short_name, !ViceCaptainSelected);
    } else {
      ToastAndroid.showWithGravity(
        "Captain and Vice Captain Cannot be same player's",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }
  useEffect(() => {
    console.log(data);
    if (captainName === data.short_name) {
      setCaptainSelected(true);
    } else {
      setCaptainSelected(false);
    }
  }, [handleCaptain]);

  useEffect(() => {
    if (viceCaptainName === data.short_name) {
      setViceCaptainSelected(true);
    } else {
      setViceCaptainSelected(false);
    }
  }, [handleViceCaptain]);

  const getTeamName = (player) => {
    if (details.teamA.players.includes(player)) {
      return details.teamA.team.abbr;
    }
    if (details.teamB.players.includes(player)) {
      return details.teamB.team.abbr;
    }
  };
  return (
    <View style={styles.playerContainer}>
      <View style={styles.playerLogoContainer}>
        <View style={[styles.playerTeamName, { alignItems: "center" }]}>
          <Text
            style={{
              color: data.team === "DEF" ? COLORS.dark : COLORS.light,
              backgroundColor:
                data.team === "DEF" ? COLORS.secondary : COLORS.dark,
              fontSize: 10,
              fontWeight: "500",
              textAlign: "center",
              borderBottomLeftRadius: 5,
              paddingVertical: 1,
              width: 40,
            }}
          >
            {getTeamName(data)}
          </Text>
          <Text
            style={{
              color: COLORS.light,
              backgroundColor: COLORS.lightGray,
              fontSize: 10,
              fontWeight: "500",
              textAlign: "center",
              borderBottomRightRadius: 5,
              paddingVertical: 1,
              width: 40,
            }}
          >
            {data.playing_role.toUpperCase()}
          </Text>
        </View>
        <Ionicons
          name="person"
          size={26}
          color={data.team === "NSCW" ? COLORS.secondary : COLORS.light}
          style={styles.playerLogo}
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: 145,
        }}
      >
        <Text
          style={{
            color: COLORS.light,
            fontSize: 12,
            fontWeight: "500",
            textAlign: "left",
            marginLeft: 50,
          }}
        >
          {data?.short_name}
        </Text>
        <Text
          style={{
            color: COLORS.silver,
            fontSize: 12,
            fontWeight: "500",
            marginLeft: 50,
          }}
        >
          {data.fantasy_player_rating} pts
        </Text>
      </View>
      <TouchableOpacity
        style={
          CaptainSelected ? styles.selectedCaptainCircle : styles.Captaincicle
        }
        onPress={() => {
          handleCaptain();
        }}
      >
        <Text
          style={CaptainSelected ? styles.selectedText : styles.unselectedText}
        >
          {CaptainSelected ? "2X" : "C"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={
          ViceCaptainSelected
            ? styles.selectedViceCaptainCircle
            : styles.ViceCaptainCircle
        }
        onPress={() => {
          handleViceCaptain();
        }}
      >
        <Text
          style={
            ViceCaptainSelected ? styles.selectedText : styles.unselectedText
          }
        >
          {ViceCaptainSelected ? "1.5X" : "VC"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayerCardsComponent;
const styles = StyleSheet.create({
  selectedText: {
    fontSize: 12,
    color: COLORS.light,
  },
  unselectedText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  Captaincicle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCaptainCircle: {
    backgroundColor: COLORS.dark,
    color: COLORS.light,
    fontWeight: "bold",
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ViceCaptainCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.light_grey,
    marginLeft: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedViceCaptainCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.dark,
    color: COLORS.light,
    marginLeft: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  playerContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.bgLightBlack,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.transparentBg,
    // maxWidth: 200,
  },
  playerLogoContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  playerTeamName: {
    position: "absolute",
    top: -12,
    borderWidth: 1,
    borderColor: COLORS.transparentBg,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: "row",
    borderTopWidth: 0,
    width: 60,
  },
  playerLogo: {
    width: 40,
    borderRadius: 5,
    marginRight: 2,
    marginLeft: 10,
    marginTop: 10,
  },
});
