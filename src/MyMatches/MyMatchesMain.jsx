import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
// import styles from "../../styles/main.style";
import { MaterialIcons } from "@expo/vector-icons";
import Upcoming from "../components/upcoming/Upcoming";

import LiveMatchScreen from "./cricket/LiveMatchScreen";
import UpcomingMatchScreen from "./cricket/UpcomingMatchScreen";

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

const MyMatchesMain = ({ onMatchCardPress }) => {
  const [selectedGame, setSelectedGame] = useState("Cricket");
  const handleGameSelection = (gameName) => {
    setSelectedGame(gameName);
  };
  const [selectedWidget, setSelectedWidget] = useState("Live");
  const [isLoading, setIsLoading] = useState(true);

  const handleWidgetPress = (widgetName) => {
    setSelectedWidget(widgetName);
  };

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.bgMateBlack }}>
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
      <View style={styles.midContainer}>
        <TouchableOpacity
          style={[
            styles.widgetStyle,
            {
              backgroundColor:
                selectedWidget === "Live" ? COLORS.light : COLORS.transparentBg,
            },
          ]}
          onPress={() => handleWidgetPress("Live")}
        >
          <Text
            style={[
              styles.widgetText,
              {
                color:
                  selectedWidget === "Live" ? COLORS.bgMateBlack : COLORS.light,
              },
            ]}
          >
            Live
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.widgetStyle,
            {
              backgroundColor:
                selectedWidget === "Upcoming"
                  ? COLORS.light
                  : COLORS.transparentBg,
            },
          ]}
          onPress={() => handleWidgetPress("Upcoming")}
        >
          <Text
            style={[
              styles.widgetText,
              {
                color:
                  selectedWidget === "Upcoming"
                    ? COLORS.bgMateBlack
                    : COLORS.light,
              },
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.widgetStyle,
            {
              backgroundColor:
                selectedWidget === "Completed"
                  ? COLORS.light
                  : COLORS.transparentBg,
            },
          ]}
          onPress={() => handleWidgetPress("Completed")}
        >
          <Text
            style={[
              styles.widgetText,
              {
                color:
                  selectedWidget === "Completed"
                    ? COLORS.bgMateBlack
                    : COLORS.light,
              },
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {selectedGame !== "Cricket" ? (
        <Upcoming />
      ) : selectedWidget === "Live" ? (
        <LiveMatchScreen />
      ) : selectedWidget === "Upcoming" ? (
        <UpcomingMatchScreen />
      ) : (
        <Upcoming />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  matchesContainer: {},
  gameScrollBar: {
    flexDirection: "column",
    alignItems: "center",
  },
  gameScrollBarItems: {
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
  midContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    marginHorizontal: 16,
  },
  widgetStyle: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 26,
  },
  widgetText: {
    color: COLORS.light,
    fontSize: 14,
    fontWeight: "700",
  },
});
export default MyMatchesMain;
