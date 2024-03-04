import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import COLORS from "../../../constants/colors.js";

const BBBGameScreen = ({ route }) => {
  const { data, title } = route.params;
  const [balls, setBalls] = useState(Array(18).fill(null)); // 3 overs = 18 balls
  const [over, setOver] = useState(0);
  const [ballIndex, setBallIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(20);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Dummy real match score for 18 balls i.e 3 overs
  const dummyBalls = [
    ".",
    1,
    2,
    4,
    6,
    "W",
    ".",
    1,
    2,
    4,
    6,
    "W",
    ".",
    1,
    2,
    4,
    6,
    "W",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0) {
        handleTimerEnd();
      } else {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (over === 3) {
      setIsGameOver(true);
      Alert.alert("Game Over", `Final Score: ${points}`, [{ text: "OK" }]);
    }
  }, [over, points]);

  const handleTimerEnd = () => {
    const userChoice = selectedOption;
    const ballResult = dummyBalls[ballIndex];

    const isCorrect = userChoice === ballResult;

    updateBallResult(ballIndex, ballResult, isCorrect);

    if (isCorrect) {
      const updatedPoints = calculatePoints(ballResult);
      setPoints(points + updatedPoints);
    } else {
      Alert.alert("Incorrect", "You chose the wrong option.", [{ text: "OK" }]);
    }

    if ((ballIndex + 1) % 6 === 0) {
      // If over completed
      Alert.alert("Over Completed", "Move to the next over.", [{ text: "OK" }]);
      setOver((prevOver) => prevOver + 1);
      setBallIndex(0);
    } else {
      setBallIndex((prevIndex) => (prevIndex + 1) % 6);
    }

    setTimer(20);
    setSelectedOption(null);
  };

  const handleOptionSelect = (option) => {
    if (isGameOver || selectedOption !== null || timer === 0) return;

    setSelectedOption(option);
  };

  const updateBallResult = (index, result, isCorrect) => {
    const newBalls = [...balls];
    const actualIndex = over * 6 + index;
    newBalls[actualIndex] = { result, isCorrect };
    setBalls(newBalls);
  };

  const calculatePoints = (ballResult) => {
    switch (ballResult) {
      case ".":
        return 2;
      case 1:
        return 5;
      case 2:
      case 3:
        return 10;
      case 4:
        return 20;
      case 6:
        return 50;
      case "W":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <View style={styles.gameContainer}>
      <View style={styles.upperContainer}>
        <View style={styles.oversContainer}>
          <Text
            style={[
              styles.gameTitle,
              {
                backgroundColor: COLORS.secondary,
                color: COLORS.dark,
                borderWidth: 0,
              },
            ]}
          >
            {title}
          </Text>
          <Text style={styles.gameTitle}>Innings: {data.teamAName}</Text>
          <Text style={styles.gameTitle}>Over: {Math.floor(over) + 1}</Text>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>
            {"Points: "}
            <Text style={styles.points}>{points}</Text>
          </Text>
          <View style={styles.ballsContainer}>
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.balls,
                  index === ballIndex && {
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                  },
                  balls[over * 6 + index] &&
                    balls[over * 6 + index].isCorrect && {
                      backgroundColor: COLORS.green,
                    },
                  balls[over * 6 + index] &&
                    !balls[over * 6 + index].isCorrect && {
                      backgroundColor: COLORS.red,
                    },
                ]}
                disabled={true}
              >
                <Text
                  style={{
                    color: COLORS.light,
                    fontWeight: "bold",
                    fontSize: 11,
                  }}
                >
                  {balls[over * 6 + index]
                    ? balls[over * 6 + index].result
                    : "."}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.mainContainer}>
          {["Dot", "Single", "2/3 Runs", "4 Runs", "6 Runs", "Wicket"].map(
            (option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.btns,
                  selectedOption !== null || timer === 0
                    ? { backgroundColor: COLORS.disabledBg, opacity: 0.5 }
                    : null,
                  selectedOption === option && {
                    backgroundColor: COLORS.secondary,
                  },
                ]}
                onPress={() => handleOptionSelect(option)}
                disabled={selectedOption !== null || timer === 0}
              >
                <Text style={styles.options}>{option}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
        <View style={styles.timerContainer}>
          <Text
            style={{
              color: COLORS.light,
              fontSize: 20,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {timer > 0 ? timer : 0}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BBBGameScreen;

const styles = StyleSheet.create({
  btns: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.transparentBg,
    width: 150,
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
    marginVertical: 4,
    textAlign: "center",
  },
  mainContainer: {
    gap: 20,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainer: {
    borderWidth: 3,
    borderColor: COLORS.secondary,
    marginTop: 10,
    borderRadius: 50,
    height: 65,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerContainer: {
    backgroundColor: COLORS.transparentBg,
    marginVertical: 30,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  ballsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 6,
    width: "65%",
  },
  balls: {
    color: COLORS.light,
    fontWeight: "bold",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: COLORS.lightGray,
    borderWidth: 2,
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
    borderWidth: 1,
    borderColor: COLORS.primary,
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
    width: "37%",
  },
  points: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});
