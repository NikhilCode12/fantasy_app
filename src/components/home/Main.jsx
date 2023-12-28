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
  Football: {
    name: "Football",
    icon: "sports-soccer",
  },
  Hockey: {
    name: "Hockey",
    icon: "sports-hockey",
  },
  Esports: {
    name: "Esports",
    icon: "sports-esports",
  },
};

const Main = () => {
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
                paddingHorizontal: 6,
              }}
              key={index}
              onPress={() => handleGameSelection(game)}
            >
              <MaterialIcons
                key={index}
                name={games[game].icon}
                style={{ marginTop: 8 }}
                size={20}
                color={selectedGame === game ? COLORS.primary : COLORS.dark}
              />
              <Text
                style={{
                  ...styles.gameScrollBarItems,
                  color: selectedGame === game ? COLORS.primary : COLORS.dark,
                  marginTop: 2,
                }}
              >
                {game}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {selectedGame === "Cricket" ? <CricketMatches /> : <Upcoming />}
    </SafeAreaView>
  );
};

export default Main;
