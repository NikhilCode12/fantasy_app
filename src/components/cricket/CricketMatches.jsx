import React from "react";
import { View } from "react-native";
import MatchesScreen from "./MatchesScreen";

const CricketMatches = ({ onMatchCardPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <MatchesScreen onMatchCardPress={onMatchCardPress} />
    </View>
  );
};

export default CricketMatches;
