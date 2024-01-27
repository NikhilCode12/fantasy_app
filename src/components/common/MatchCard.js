import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../constants/colors";

const MatchCard = ({ team1, team2, time, venue }) => {
  const isTeamNameLong = (teamName) => teamName.length > 10;

  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <View style={styles.matchDetails}>
          <View style={styles.teamContainer}>
            <Text
              style={[
                styles.teamName,
                isTeamNameLong(team1) && styles.longText,
                { textAlign: "left" },
              ]}
            >
              {team1}
            </Text>
          </View>
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>
              <Text style={styles.goldText}>V</Text>
              <Text style={styles.primaryText}>S</Text>
            </Text>
          </View>
          <View style={[styles.teamContainer, { alignItems: "flex-end" }]}>
            <Text
              style={[
                styles.teamName,
                styles.textRight,
                isTeamNameLong(team2) && styles.longText,
                { textAlign: "right" },
              ]}
            >
              {team2}
            </Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.venue}>{venue}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 90,
    borderRadius: 10,
    marginVertical: 12,
    marginHorizontal: 8,
    backgroundColor: COLORS.transparentBg,
    padding: 20,
    shadowColor: COLORS.black,
  },
  matchDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  teamContainer: {
    flex: 1,
  },
  textRight: {
    textAlign: "right",
  },
  teamName: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.light_grey,
    textAlign: "center",
  },
  vsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  vsText: {
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  goldText: {
    color: "#FFD700",
  },
  primaryText: {
    color: COLORS.primary,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 12,
    color: COLORS.light_grey,
  },
  venue: {
    fontSize: 10,
    color: COLORS.light_grey,
  },
  longText: {
    textAlign: "center",
    flexWrap: "wrap",
  },
});

export default MatchCard;
