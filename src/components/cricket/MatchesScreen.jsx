import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../../styles/cricket.matches.style";
import COLORS from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MatchCard from "../common/MatchCard";
import matchesData from "../../constants/matchesdummy.json";
import { SafeAreaView } from "react-native-safe-area-context";

const MatchesScreen = () => {
  const renderMatch = ({ item }) => (
    <MatchCard
      team1={item.team1}
      team2={item.team2}
      time={item.time}
      venue={item.venue}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.matchesContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 6,
            alignItems: "center",
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
        {matchesData.map((match) => (
          <MatchCard
            key={match.id}
            team1={match.team1}
            team2={match.team2}
            time={match.time}
            venue={match.venue}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default MatchesScreen;
