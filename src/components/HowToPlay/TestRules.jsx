import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
  TextInput,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  UIManager,
  Platform,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import COLORS from "../../constants/colors.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

import { Ionicons } from "@expo/vector-icons";
import DeleteIcon from "../../components/common/DeleteIcon.js";
import Toast from "react-native-toast-message";
import styles from "./allRules.styles.js";
export default function TestRules() {
  const [battingOpened, setBattingOpened] = useState(false);
  const [bowlingOpened, setBowlingOpened] = useState(false);
  const [fieldingOpened, setFieldingOpened] = useState(false);
  const [AdditionalOpened, setAdditionalOpened] = useState(false);

  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  function toggleAccordion() {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: "easeIn", property: "opacity" },
      update: { type: "linear", springDamping: 0.3, duration: 250 },
    });
    setBattingOpened(!battingOpened);
  }
  function toggleBowlingAccordion() {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: "easeIn", property: "opacity" },
      update: { type: "linear", springDamping: 0.3, duration: 250 },
    });
    setBowlingOpened(!bowlingOpened);
  }
  function toggleFieldingAccordion() {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: "easeIn", property: "opacity" },
      update: { type: "linear", springDamping: 0.3, duration: 250 },
    });
    setFieldingOpened(!fieldingOpened);
  }
  function toggleAdditionalAccordion() {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: "easeIn", property: "opacity" },
      update: { type: "linear", springDamping: 0.3, duration: 250 },
    });
    setAdditionalOpened(!AdditionalOpened);
  }
  const battingPoints = [
    {
      t: "Run",
      p: "+1 pts",
      flag: true,
    },
    {
      t: "Boundary Bonus",
      p: "+1 pts",
      flag: true,
    },
    {
      t: "Six Bonus",
      p: "+2 pts",
      flag: true,
    },
    {
      t: "Half-century Bonus",
      p: "+4 pts",
      flag: true,
    },
    {
      t: "Century Bonus",
      p: "+8 pts",
      flag: true,
    },
    {
      t: "Dismissial for a Duck",
      p: "-4 pts",
      flag: false,
    },
  ];
  const bowlingPoints = [
    {
      t: "Wicket (Excluding Run Out)",
      p: "+16 pts",
      flag: true,
    },
    {
      t: "Bonus (LBW/BOWLED) ",
      p: "+8 pts",
      flag: true,
    },
    {
      t: "4 Wicket Bonus",
      p: "+4 pts",
      flag: true,
    },
    {
      t: "5 Wicket Bonus",
      p: "+8 pts",
      flag: true,
    },
  ];
  const fieldingPoints = [
    {
      t: "Catch ",
      p: "+8 pts",
      flag: true,
    },
    {
      t: "Stumping",
      p: "+12 pts",
      flag: true,
    },
    {
      t: "Run Out (Direct Hit)",
      p: "+12 pts",
      flag: true,
    },
    {
      t: "Run Out (Not a Direct Hit)",
      p: "+6 pts",
      flag: true,
    },
  ];
  const additionalPoints = [
    {
      t: "Captain Points ",
      p: "2x",
      flag: true,
    },
    {
      t: "Vice-Captain Points ",
      p: "1.5x",
      flag: true,
    },
    {
      t: "In Announced Lineups",
      p: "+4 pts",
      flag: true,
    },
    {
      t: "Playing Substitute",
      p: "+4 pts",
      flag: true,
    },
  ];
  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.ScrollContainer}>
        <View style={styles.impContainer}>
          <View
            style={{
              backgroundColor: COLORS.darkRed,
              paddingVertical: 4,
              paddingHorizontal: 4,
              width: 210,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Text style={{ color: COLORS.light }}>
              IMPORTANT FANTASY POINTS
            </Text>
          </View>
          <View style={styles.impRow}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontSize: 16, color: COLORS.light, fontWeight: "700" }}
              >
                Wicket
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.silver }}>
                (Excluding run out)
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.secondary,
                  fontWeight: "bold",
                }}
              >
                +16 pts
              </Text>
            </View>
          </View>
          <View style={styles.impRow}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontSize: 16, color: COLORS.light, fontWeight: "700" }}
              >
                Stumping
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.secondary,
                  fontWeight: "bold",
                }}
              >
                +12 pts
              </Text>
            </View>
          </View>
          <View style={styles.impRow}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ fontSize: 16, color: COLORS.light, fontWeight: "700" }}
              >
                Run Out
              </Text>
              <Text style={{ fontSize: 14, color: COLORS.silver }}>
                (Direct Hit)
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.secondary,
                  fontWeight: "bold",
                }}
              >
                +12 pts
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={toggleAccordion}>
            <View style={styles.header}>
              <Text style={styles.title}>Batting</Text>
              <AntDesign
                name={battingOpened ? "caretup" : "caretdown"}
                size={16}
                color={COLORS.light}
              />
            </View>
          </TouchableWithoutFeedback>
          {battingOpened &&
            battingPoints.map((rule) => {
              if (rule.t === "Above 140 runs per 100 balls") {
                return (
                  <View key={rule.t}>
                    <Text style={styles.insideTitle}>
                      Strike Rate (Except Bowler) Points
                    </Text>
                    <Text style={styles.insideminiTitle}>
                      (Min 20 Balls to be Played)
                    </Text>
                    <View style={styles.PointRow}>
                      <Text style={styles.tiltleLeft}>{rule.t}</Text>
                      <Text
                        style={[
                          styles.pointsRight,
                          rule.flag === false && styles.colorRed,
                        ]}
                      >
                        {rule.p}
                      </Text>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View style={styles.PointRow} key={rule.t}>
                    <Text style={styles.tiltleLeft}>{rule.t}</Text>
                    <Text
                      style={[
                        styles.pointsRight,
                        rule.flag === false && styles.colorRed,
                      ]}
                    >
                      {rule.p}
                    </Text>
                  </View>
                );
              }
            })}
        </View>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={toggleBowlingAccordion}>
            <View style={styles.header}>
              <Text style={styles.title}>Bowling</Text>
              <AntDesign
                name={bowlingOpened ? "caretup" : "caretdown"}
                size={16}
                color={COLORS.light}
              />
            </View>
          </TouchableWithoutFeedback>
          {bowlingOpened &&
            bowlingPoints.map((rule) => {
              if (rule.t === "Below 2.5 runs per over") {
                return (
                  <View key={rule.t}>
                    <Text style={styles.insideTitle}>Economy Rate Points</Text>
                    <Text style={styles.insideminiTitle}>
                      (Min 5 Overs To be Bowled)
                    </Text>
                    <View style={styles.PointRow}>
                      <Text style={styles.tiltleLeft}>{rule.t}</Text>
                      <Text
                        style={[
                          styles.pointsRight,
                          rule.flag === false && styles.colorRed,
                        ]}
                      >
                        {rule.p}
                      </Text>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View style={styles.PointRow} key={rule.t}>
                    <Text style={styles.tiltleLeft}>{rule.t}</Text>
                    <Text
                      style={[
                        styles.pointsRight,
                        rule.flag === false && styles.colorRed,
                      ]}
                    >
                      {rule.p}
                    </Text>
                  </View>
                );
              }
            })}
        </View>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={toggleFieldingAccordion}>
            <View style={styles.header}>
              <Text style={styles.title}>Fielding</Text>
              <AntDesign
                name={fieldingOpened ? "caretup" : "caretdown"}
                size={16}
                color={COLORS.light}
              />
            </View>
          </TouchableWithoutFeedback>
          {fieldingOpened &&
            fieldingPoints.map((rule) => {
              return (
                <View style={styles.PointRow} key={rule.t}>
                  <Text style={styles.tiltleLeft}>{rule.t}</Text>
                  <Text
                    style={[
                      styles.pointsRight,
                      rule.flag === false && styles.colorRed,
                    ]}
                  >
                    {rule.p}
                  </Text>
                </View>
              );
            })}
        </View>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={toggleAdditionalAccordion}>
            <View style={styles.header}>
              <Text style={styles.title}>Additional Points</Text>
              <AntDesign
                name={AdditionalOpened ? "caretup" : "caretdown"}
                size={16}
                color={COLORS.light}
              />
            </View>
          </TouchableWithoutFeedback>
          {AdditionalOpened &&
            additionalPoints.map((rule) => {
              return (
                <View style={styles.PointRow} key={rule.t}>
                  <Text style={styles.tiltleLeft}>{rule.t}</Text>
                  <Text
                    style={[
                      styles.pointsRight,
                      rule.flag === false && styles.colorRed,
                    ]}
                  >
                    {rule.p}
                  </Text>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
}