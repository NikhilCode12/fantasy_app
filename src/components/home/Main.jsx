import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import styles from "../../styles/main.style";
import { MaterialIcons } from "@expo/vector-icons";
import CricketMatches from "../cricket/CricketMatches";
import Upcoming from "../upcoming/Upcoming";

const games = {
  Cricket: {
    name: "Cricket",
    icon: "sports-cricket",
  },
  Formula1: {
    name: "Formula 1",
    icon: "sports-motorsports",
  },
  UFC: {
    name: "UFC",
    icon: "sports-mma",
  },
  Football: {
    name: "Football",
    icon: "sports-soccer",
  },
  NBA: {
    name: "NBA",
    icon: "sports-basketball",
  },
  Esports: {
    name: "Esports",
    icon: "sports-esports",
  },
};

const Main = ({ onMatchCardPress }) => {
  const [selectedGame, setSelectedGame] = useState("Cricket");
  const handleGameSelection = (gameName) => {
    setSelectedGame(gameName);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.dark,
            padding: 16,
            height: "auto",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginTop: 2,
              color: COLORS.primary,
              fontWeight: "bold",
            }}
          >
            Games
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            flexDirection: "row",
            height: 57,
          }}
          style={{ flexGrow: 0 }}
        >
          {Object.keys(games).map((game, index) => (
            <TouchableOpacity
              style={{
                ...styles.gameScrollBar,
                backgroundColor:
                  selectedGame === game
                    ? COLORS.bgLightBlack
                    : COLORS.light_grey,
                height: "100%",
                paddingHorizontal: 9,
                borderBottomWidth: selectedGame === game ? 1.75 : 0,
                borderBottomColor:
                  selectedGame === game ? COLORS.primary : null,
              }}
              key={index}
              onPress={() => handleGameSelection(game)}
            >
              <MaterialIcons
                key={index}
                name={games[game].icon}
                style={{ marginTop: 8 }}
                size={22}
                color={selectedGame === game ? COLORS.primary : COLORS.dark}
              />
              <Text
                style={{
                  ...styles.gameScrollBarItems,
                  color: selectedGame === game ? COLORS.primary : COLORS.dark,
                  marginTop: 1,
                }}
              >
                {game}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {selectedGame === "Cricket" ? (
        <CricketMatches onMatchCardPress={onMatchCardPress} />
      ) : (
        <Upcoming />
      )}
    </SafeAreaView>
  );
};

export default Main;
