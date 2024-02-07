import { View, Text } from "react-native";
import React from "react";
import CricketMatches from "../components/cricket/CricketMatches";

const MatchesScreen = ({ onMatchCardPress }) => {
  return (
    <View>
      <CricketMatches onMatchCardPress={onMatchCardPress} />
    </View>
  );
};

export default MatchesScreen;
