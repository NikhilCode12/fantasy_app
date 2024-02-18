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
import icon from "../../../assets/icon.png";

const PlayerCardsComponent = ({
  data,
  captainName,
  viceCaptainName,
  updateCaptain,
  updateViceCaptain,
}) => {
  const [CaptainSelected, setCaptainSelected] = useState(false);
  const [ViceCaptainSelected, setViceCaptainSelected] = useState(false);
  function handleCaptain() {
    if (ViceCaptainSelected == false) {
      // setCaptainSelected(!CaptainSelected);
      updateCaptain(data.name, !CaptainSelected);
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
      updateViceCaptain(data.name, !ViceCaptainSelected);
    } else {
      ToastAndroid.showWithGravity(
        "Captain and Vice Captain Cannot be same player's",
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

  return (
    <View style={styles.playerContainer}>
      <View style={styles.playerLogoContainer}>
        <Text style={[styles.playerTeamName]}>
          {data.team} {data.skill}
        </Text>
        <View style={styles.playerLogo} />
      </View>
      <View
        style={{
          flexDirection: "column",
          marginLeft: 65,
          minWidth: 90,
        }}
      >
        <Text style={{ color: COLORS.light, fontSize: 12, fontWeight: "bold" }}>
          {data.name}
        </Text>
        <Text style={{ color: COLORS.silver, fontSize: 12, fontWeight: "600" }}>
          {data.points} pts
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
    fontSize: 14,
    color: COLORS.silver,
  },
  unselectedText: {
    fontSize: 18,
  },
  Captaincicle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: COLORS.silver,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCaptainCircle: {
    backgroundColor: COLORS.dark,
    color: COLORS.light,
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
    backgroundColor: COLORS.silver,
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
    backgroundColor: COLORS.transparentBg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.transparentBg,
  },
  playerLogoContainer: {
    position: "relative",
  },
  playerTeamName: {
    color: COLORS.light,
    fontSize: 10,
    fontWeight: "bold",
    position: "absolute",
    top: -12,
    backgroundColor: COLORS.dark,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: COLORS.transparentBg,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    textAlign: "center",
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
