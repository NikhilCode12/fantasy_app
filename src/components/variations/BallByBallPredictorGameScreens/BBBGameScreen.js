import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../../constants/colors.js";

const BBBGameScreen = ({ route }) => {
  const { data, title } = route.params;
  const [balls, setBalls] = useState(Array(6).fill(0));
  const [over, setOver] = useState(0);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <View style={styles.gameContainer}>
      {/* Upper points container with balls display with over number */}
      <View style={styles.upperContainer}>
        {/* overs title and overs container */}
        <View style={styles.oversContainer}>
          <Text style={styles.gameTitle}>{title}</Text>
          <Text
            style={[
              styles.gameTitle,
              {
                backgroundColor: COLORS.wheat,
                color: COLORS.dark,
              },
            ]}
          >
            Innings: {data.teamAName}
          </Text>
          <Text style={[styles.gameTitle]}>Over: {over + 3}</Text>
        </View>
        {/* Points and balls container */}
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>
            {"Points: "}
            <Text style={styles.points}>{points}</Text>
          </Text>
          <View style={styles.ballsContainer}>
            {balls.map((ball, index) => {
              return (
                <View key={index} style={styles.balls}>
                  <Text
                    style={{
                      color: COLORS.light,
                      fontWeight: "bold",
                      fontSize: 11,
                    }}
                  >
                    {ball}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      {/* Main Screen with 6 choices for each ball */}
      <View style={styles.mainContainer}>
        {/* 6 choices for user to select */}
        <TouchableOpacity style={styles.btns}>
          <Text style={styles.options}>{"Dot"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Text style={styles.options}>{"Single"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Text style={styles.options}>{"2/3 Runs"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Text style={styles.options}>{"4 Runs"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Text style={styles.options}>{"6 Runs"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Text style={styles.options}>{"Run out"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Text style={styles.options}>{"Wicket"}</Text>
        </TouchableOpacity>
      </View>
      {/* Lower screen with a 5 seconds timer for each ball */}
      <View style={styles.lowerContainer}>
        {/* Timer for 5 seconds */}
        <View style={styles.timerContainer}>
          <Text
            style={{
              color: COLORS.light,
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {"Timer: "}
            {timer}
            {" seconds"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BBBGameScreen;

const styles = StyleSheet.create({
  btns: {
    backgroundColor: COLORS.lightGray,
    width: "60%",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 150,
  },
  options: {
    color: COLORS.light,
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 6,
    textAlign: "center",
  },
  mainContainer: {
    marginVertical: 20,
    gap: 20,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainer: {
    backgroundColor: COLORS.btn,
    width: "60%",
    paddingVertical: 18,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  ballsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 6,
    width: "55%",
  },
  balls: {
    color: COLORS.light,
    fontWeight: "bold",
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: COLORS.lightGray,
  },
  gameContainer: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  oversContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  pointsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gameTitle: {
    color: COLORS.light,
    fontSize: 14,
    backgroundColor: COLORS.btn,
    textAlign: "center",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
    fontWeight: "bold",
  },
  pointsText: {
    color: COLORS.light_grey,
    paddingHorizontal: 6,
    fontSize: 14,
    fontWeight: "bold",
    width: "45%",
  },
  points: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});
