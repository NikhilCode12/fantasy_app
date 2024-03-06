import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import COLORS from "../../../constants/colors";

const normalRules = [
  {
    title: "In announced lineups",
    point: 4,
  },
  {
    title: "Run",
    point: 1,
  },
  {
    title: "Wicket Excluding Run Out",
    point: 25,
  },
  {
    title: "Catch",
    point: 8,
  },
  {
    title: "Stumping",
    point: 12,
  },
  {
    title: "Run out (Thrower)",
    point: 6,
  },
  {
    title: "Run out (Catcher)",
    point: 6,
  },
  {
    title: "Run out (Direct Hit)",
    point: 12,
  },
  {
    title: "Dismissal for a duck (BAT, WK & AR)",
    point: -2,
  },
];

const BonusRules = [
  {
    title: "",
    point: "",
  },
];
const EconomyRateRules = [];
const StrikeRateRules = [];

const ballByBallRules = [
  {
    title: "Dot Ball",
    point: 1,
  },
  {
    title: "Single - 1 Run",
    point: 1,
  },
  {
    title: "2 Runs",
    point: 2,
  },
  {
    title: "3 Runs",
    point: 3,
  },
  {
    title: "Boundary - 4 Runs",
    point: 5,
  },
  {
    title: "Sixer - 6 Runs",
    point: 8,
  },
  {
    title: "Wicket",
    point: 25,
  },
];

const RulesScreen = ({ route }) => {
  const { variation } = route.params;

  const getRules = (variation) => {
    switch (variation) {
      case "Ball by Ball Predictor":
        return ballByBallRules;
      default:
        return normalRules;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* Point system rules are shown here.. */}
        <View style={styles.shareContestContainer}>
          <Text style={styles.shareContestText}>
            Player points are calculated based on the following rules.
          </Text>
        </View>
        {/* Rules */}
        <View style={styles.detailsContainer}>
          {variation === "Ball by Ball Predictor" ? (
            <Text style={styles.rulesHeading}>Predictor Rules</Text>
          ) : (
            <Text style={styles.rulesHeading}>Normal</Text>
          )}
          <View style={{ gap: 3 }}>
            {/* Normal Rules */}
            {getRules(variation).map((rule, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.rulesText}>{rule.title}</Text>
                <Text
                  style={[
                    styles.rulesPoint,
                    {
                      ...styles.rulesPoint,
                      color: rule.point > 0 ? "lightgreen" : COLORS.darkRed,
                    },
                  ]}
                >
                  {rule.point > 0 ? "+" + rule.point : rule.point}
                </Text>
              </View>
            ))}
          </View>
          {/* Bonus Rules */}
          {variation === "Ball by Ball Predictor" ? null : (
            <View>
              <Text style={styles.rulesHeading}>Bonus</Text>
            </View>
          )}

          {/* Economy Rates Rules */}
          {variation === "Ball by Ball Predictor" ? null : (
            <View>
              <Text style={styles.rulesHeading}>Economy Rate</Text>
            </View>
          )}

          {/* Strike Rate */}
          {variation === "Ball by Ball Predictor" ? null : (
            <View>
              <Text style={styles.rulesHeading}>Strike Rate</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RulesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  shareContestContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shareContestText: {
    fontWeight: "500",
    color: COLORS.light_grey,
    fontSize: 13,
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 16,
    paddingVertical: 18,
    gap: 16,
    borderRadius: 5,
  },
  rulesHeading: {
    color: COLORS.light_grey,
    fontSize: 15,
    fontWeight: "bold",
  },
  rulesText: {
    color: COLORS.silver,
    fontSize: 14,
  },
  rulesPoint: {
    color: "lightgreen",
    fontSize: 14,
  },
});
