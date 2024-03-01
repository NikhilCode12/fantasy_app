import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import styles from "../../styles/cricket.matches.style";
import COLORS from "../../constants/colors";
import MatchesScreen from "./MatchesScreen";

const CricketMatches = ({ onMatchCardPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <MatchesScreen onMatchCardPress={onMatchCardPress} />
    </View>
  );
};

export default CricketMatches;
