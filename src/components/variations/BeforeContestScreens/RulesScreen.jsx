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

const RulesScreen = () => {
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
          <Text style={styles.rulesHeading}>Normal</Text>
          <View style={{ gap: 3 }}>
            {/* Normal Rules */}
            {normalRules.map((rule, index) => (
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
          <View>
            <Text style={styles.rulesHeading}>Bonus</Text>
          </View>

          {/* Economy Rates Rules */}
          <View>
            <Text style={styles.rulesHeading}>Economy Rate</Text>
          </View>

          {/* Strike Rate */}
          <View>
            <Text style={styles.rulesHeading}>Strike Rate</Text>
          </View>
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
    fontSize: 14,
    fontWeight: "bold",
  },
  rulesText: {
    color: COLORS.silver,
    fontSize: 12,
  },
  rulesPoint: {
    color: "lightgreen",
    fontSize: 12,
  },
});
