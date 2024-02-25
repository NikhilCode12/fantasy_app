import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "../../styles/cricket.matches.style";
import COLORS from "../../constants/colors";
import MatchesScreen from "./MatchesScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const CricketMatches = ({ onMatchCardPress }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{ marginTop: "-20%" }}
          />
        </View>
      ) : (
        <MatchesScreen onMatchCardPress={onMatchCardPress} />
      )}
    </View>
  );
};

export default CricketMatches;
