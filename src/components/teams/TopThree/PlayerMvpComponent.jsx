import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../../constants/colors.js";
import { Ionicons } from "@expo/vector-icons";

const PlayerMvpComponent = ({
  data,
  captainName,
  viceCaptainName,
  mvpName,
  updateCaptain,
  updateViceCaptain,
  updateMvp,
  details,
}) => {
  const [CaptainSelected, setCaptainSelected] = useState(false);
  const [ViceCaptainSelected, setViceCaptainSelected] = useState(false);
  const [MvpSelected, setMvpSelected] = useState(false);
  function handleCaptain() {
    if (ViceCaptainSelected == false && MvpSelected == false) {
      // setCaptainSelected(!CaptainSelected);
      updateCaptain(data.short_name, !CaptainSelected);
    } else if (ViceCaptainSelected) {
      ToastAndroid.showWithGravity(
        "This Player is already Vice Captain...",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      ToastAndroid.showWithGravity(
        "This Player is already  MVP...",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }
  function handleViceCaptain() {
    if (CaptainSelected == false && MvpSelected == false) {
      // setViceCaptainSelected(!ViceCaptainSelected);
      updateViceCaptain(data.short_name, !ViceCaptainSelected);
    } else if (CaptainSelected) {
      ToastAndroid.showWithGravity(
        "This Player is already  Captain...",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      ToastAndroid.showWithGravity(
        "This Player is already  Mvp...",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }
  function handleMvp() {
    if (CaptainSelected == false && ViceCaptainSelected == false) {
      updateMvp(data.short_name, !MvpSelected);
    } else if (CaptainSelected) {
      ToastAndroid.showWithGravity(
        "This Player is already Captain..",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      ToastAndroid.showWithGravity(
        "This Player is already Vice Captain..",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }
  useEffect(() => {
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

  useEffect(() => {
    if (mvpName === data.short_name) {
      setMvpSelected(true);
    } else {
      setMvpSelected(false);
    }
  }, [handleMvp]);

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
        <View
          style={[
            styles.playerTeamName,
            {
              alignItems: "center",
              top:
                !MvpSelected && !CaptainSelected && !ViceCaptainSelected
                  ? -21
                  : CaptainSelected
                  ? -12
                  : ViceCaptainSelected
                  ? -12
                  : MvpSelected
                  ? -21
                  : -21,
            },
          ]}
        >
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
          color={data.team === "DEF" ? COLORS.secondary : COLORS.light}
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
            fontSize: 13,
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
        {!CaptainSelected && !ViceCaptainSelected && (
          <TouchableOpacity
            style={MvpSelected ? styles.selectedMvpCircle : styles.MvpCircle}
            onPress={() => {
              handleMvp();
            }}
          >
            <Text
              style={[
                MvpSelected ? styles.selectedText : styles.unselectedText,
                {
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                },
              ]}
            >
              {MvpSelected ? "3X" : "MVP"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ flexDirection: "row", gap: 30, marginLeft: 20 }}>
        {/* <TouchableOpacity
          style={MvpSelected ? styles.selectedMvpCircle : styles.MvpCircle}
          onPress={() => {
            handleMvp();
          }}
        >
          <Text
            style={[
              MvpSelected ? styles.selectedText : styles.unselectedText,
              {
                paddingHorizontal: 4,
                paddingVertical: 2,
              },
            ]}
          >
            {MvpSelected ? "3X" : "MVP"}
          </Text> 
        </TouchableOpacity> */}
        <TouchableOpacity
          style={
            CaptainSelected ? styles.selectedCaptainCircle : styles.Captaincicle
          }
          onPress={() => {
            handleCaptain();
          }}
        >
          <Text
            style={
              CaptainSelected ? styles.selectedText : styles.unselectedText
            }
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
    </View>
  );
};

export default PlayerMvpComponent;
const styles = StyleSheet.create({
  selectedText: {
    fontSize: 12,
    color: COLORS.light,
  },
  unselectedText: {
    fontSize: 13,
    fontWeight: "bold",
  },
  Captaincicle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.secondary,
    marginLeft: 0,
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
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  ViceCaptainCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.light_grey,
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedViceCaptainCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.dark,
    color: COLORS.light,
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  MvpCircle: {
    borderRadius: 10,
    backgroundColor: COLORS.bronze,
    marginTop: 4,
    marginLeft: 50,
    alignItems: "center",
    width: 40,
    height: 20,
    justifyContent: "center",
  },
  selectedMvpCircle: {
    borderRadius: 10,
    width: 40,
    height: 20,
    backgroundColor: COLORS.dark,
    marginTop: 4,
    color: COLORS.light,
    marginLeft: 50,
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
  },
  playerLogoContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  playerTeamName: {
    position: "absolute",
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
    marginRight: 2,
    marginLeft: 12,
    marginTop: 10,
  },
});
