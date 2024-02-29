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
import icon from "../../../../assets/icon.png";

const PlayerMvpComponent = ({
  data,
  captainName,
  viceCaptainName,
  mvpName,
  updateCaptain,
  updateViceCaptain,
  updateMvp,
}) => {
  const [CaptainSelected, setCaptainSelected] = useState(false);
  const [ViceCaptainSelected, setViceCaptainSelected] = useState(false);
  const [MvpSelected, setMvpSelected] = useState(false);
  function handleCaptain() {
    if (ViceCaptainSelected == false && MvpSelected == false) {
      // setCaptainSelected(!CaptainSelected);
      updateCaptain(data.name, !CaptainSelected);
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
      updateViceCaptain(data.name, !ViceCaptainSelected);
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
      updateMvp(data.name, !MvpSelected);
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
    if (captainName === data.name) {
      setCaptainSelected(true);
    } else {
      setCaptainSelected(false);
    }
  }, [handleCaptain]);

  useEffect(() => {
    if (viceCaptainName === data.name) {
      setViceCaptainSelected(true);
    } else {
      setViceCaptainSelected(false);
    }
  }, [handleViceCaptain]);

  useEffect(() => {
    if (mvpName === data.name) {
      setMvpSelected(true);
    } else {
      setMvpSelected(false);
    }
  }, [handleMvp]);

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
              paddingHorizontal: 6,
            }}
          >
            {data.team}
          </Text>
          <Text
            style={{
              color: COLORS.light,
              backgroundColor: COLORS.lightGray,
              fontSize: 10,
              fontWeight: "500",
              textAlign: "center",
              borderBottomRightRadius: 5,
              paddingHorizontal: 6,
            }}
          >
            {data.skill}
          </Text>
        </View>
        <View style={styles.playerLogo} />
      </View>
      <View
        style={{
          flexDirection: "column",
          marginLeft: 20,
          minWidth: 85,
        }}
      >
        <Text style={{ color: COLORS.light, fontSize: 13, fontWeight: "500" }}>
          {data.name}
        </Text>
        <Text style={{ color: COLORS.silver, fontSize: 12, fontWeight: "500" }}>
          {data.points} pts
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 28 }}>
        <TouchableOpacity
          style={MvpSelected ? styles.selectedMvpCircle : styles.MvpCircle}
          onPress={() => {
            handleMvp();
          }}
        >
          <Text
            style={MvpSelected ? styles.selectedText : styles.unselectedText}
          >
            {MvpSelected ? "3X" : "MVP"}
          </Text>
        </TouchableOpacity>
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
    fontSize: 14,
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
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.bronze,
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedMvpCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.dark,
    color: COLORS.light,
    marginLeft: 0,
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
    height: 40,
    borderRadius: 5,
    marginRight: 2,
    marginLeft: 6,
    backgroundColor: COLORS.silver,
    marginTop: 10,
  },
});
