import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../../styles/cricket.matches.style";
import COLORS from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MatchCard from "../common/MatchCard";
import matchesData from "../../constants/matchesdummy.json";
import { SafeAreaView } from "react-native-safe-area-context";
import icon from "../../../assets/icon.png";

const MatchesScreen = () => {
  const convertTimeToMinutes = (timeRemaining) => {
    const [hours, minutes] = timeRemaining.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  const sortedMatches = matchesData.sort((a, b) => {
    const timeA = convertTimeToMinutes(a.timeRemaining);
    const timeB = convertTimeToMinutes(b.timeRemaining);
    return timeA - timeB;
  });

  return (
    <SafeAreaView contentContainerStyle={{ flex: 1 }}>
      <ScrollView
        style={styles.matchesContainer}
        contentContainerStyle={{ paddingBottom: 56 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 6,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Text style={styles.matchText}>{"Upcoming Matches"}</Text>
          <TouchableOpacity style={styles.filterElement}>
            <MaterialCommunityIcons
              name="filter"
              size={16}
              style={{ marginVertical: 4 }}
              color={COLORS.primary}
            />
            <Text style={styles.matchText2}>{"Filter"}</Text>
          </TouchableOpacity>
        </View>
        {sortedMatches.map((match) => (
          <MatchCard
            key={match.id}
            league={match.league}
            teamAImage={icon}
            teamAName={match.teamAName}
            teamBName={match.teamBName}
            teamBImage={icon}
            timeRemaining={match.timeRemaining}
            timeVenue={match.timeVenue.time}
            winnings={match.winnings}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatchesScreen;
