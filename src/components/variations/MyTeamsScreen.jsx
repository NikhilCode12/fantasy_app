import React, { useEffect, useState } from "react";
import COLORS from "../../constants/colors";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TeamCard from "./TeamCard";
import TeamCard2 from "./TeamCard2";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function MyTeamsScreen({ route }) {
  const navigation = useNavigation();
  const [allTeamsData, setallTeamsData] = useState([]);
  const {
    data,
    amount,
    variation,
    PlayersData,
    captainName,
    viceCaptainName,
    mvpName,
  } = route.params;
  useEffect(() => {
    if (PlayersData) {
      // console.log("PLAYERS DATA");
      setallTeamsData((prevTeamsData) => [
        ...prevTeamsData,
        {
          PlayersData: PlayersData,
          captainName: captainName,
          viceCaptainName: viceCaptainName,
        },
      ]);
    }
  }, [PlayersData, captainName, viceCaptainName]);
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.bgMateBlack, flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => {
            navigation.navigate("VariationsScreen", { data: data });
          }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Teams</Text>
      </View>
      <ScrollView>
        {allTeamsData.length > 0 &&
          allTeamsData.map((team, index) =>
            variation === "Top 3" ? (
              <TeamCard2
                key={index}
                index={index}
                matchData={data}
                PlayersData={PlayersData}
                captainName={captainName}
                viceCaptainName={viceCaptainName}
                mvpName={mvpName}
              />
            ) : (
              <TeamCard
                key={index}
                index={index}
                matchData={data}
                PlayersData={PlayersData}
                captainName={captainName}
                viceCaptainName={viceCaptainName}
              />
            )
          )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          if (variation === "7 + 4" || variation === "10 + 1") {
            navigation.navigate("PlayerSelection", {
              data: data,
              amount: amount,
              variation: variation,
            });
          } else if (variation === "Fantastic 5") {
            navigation.navigate("PlayerSelection2", {
              data: data,
              amount: amount,
              variation: variation,
            });
          } else {
            navigation.navigate("PlayerSelection3", {
              data: data,
              amount: amount,
              variation: variation,
            });
          }
        }}
        style={styles.createTeamButton}
      >
        <Text style={styles.buttonText}>Create New Team</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  createTeamButton: {
    backgroundColor: COLORS.dark,
    position: "absolute",
    bottom: 75,
    left: 16,
    right: 16,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: COLORS.silver,
    fontWeight: "bold",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
  },
  buttonText: {
    color: COLORS.light,
    fontWeight: "bold",
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.bgMateBlack,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.light_grey,
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  backArrow: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});
