import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Animated,
} from "react-native";
import COLORS from "../../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const BBBGameScreen = ({ route }) => {
  const navigate = useNavigation();
  const { data, title } = route.params;
  const [balls, setBalls] = useState(Array(6).fill(null));
  const [over, setOver] = useState("--");
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(20);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionLocked, setIsOptionLocked] = useState(false);
  const [scoreTeamA, setScoreTeamA] = useState("-- / --");
  const [scoreTeamB, setScoreTeamB] = useState("-- / --");
  const [liveInning, setLiveInning] = useState("");
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");

  useEffect(() => {
    fetchLiveMatchData(data.matchId);

    // fetch live match data every 20 seconds
    const interval = setInterval(() => {
      fetchLiveMatchData(data.matchId);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Timer logic
    let interval;
    if (timer > 0 && !isOptionLocked) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      // Timer expired, reset timer and unlock option
      clearInterval(interval);
      setTimer(20);
      setIsOptionLocked(false);
    }

    return () => clearInterval(interval);
  }, [timer, isOptionLocked]);

  const fetchLiveMatchData = async (matchId) => {
    try {
      // get data by sending match id as query param to the api
      const response = await axios.get(
        `https://fanverse-backend.onrender.com/api/live-match/?matchId=${matchId}`
      );
      const responseData = response.data.response;

      if (responseData === "Data unavailable") {
        Alert.alert(
          "Match not started yet!",
          "Time to start, " + data.timeRemaining
        );
        return null;
      }
      const { teams, live_inning } = responseData;
      const teamA = teams[0];
      const teamB = teams[1];
      if (live_inning.short_name.includes(teamAName)) {
        setLiveInning(teamAName);
      } else {
        setLiveInning(teamBName);
      }

      setTeamAName(teamA.abbr);
      setTeamBName(teamB.abbr);
      setScoreTeamA(teamA.scores || "-- / --");
      setScoreTeamB(teamB.scores || "-- / --");
      setOver(responseData.live_score.overs);
      updateBallScore(responseData.commentaries);
    } catch (error) {
      console.error(error);
    }
  };

  const updateBallScore = (commentaries) => {
    if (!commentaries || !Array.isArray(commentaries)) return;

    let newBalls = Array(6).fill(null);
    let ballIndex = 0;
    let currentOver = -1;
    let extraBall = false;

    commentaries.forEach((commentary) => {
      const over = parseInt(commentary.over);
      const ball = parseInt(commentary.ball);
      const score = commentary.score;

      if (score === "nb" || score === "wd") {
        extraBall = true;
      } else {
        extraBall = false;
      }

      if (over !== currentOver) {
        currentOver = over;
        ballIndex = 0;

        if (extraBall) {
          newBalls = Array(7).fill(null);
        } else {
          newBalls = Array(6).fill(null);
        }
      }

      if (ballIndex < 6) {
        newBalls[ballIndex - 1] = commentary.score;
      }

      ballIndex++;
    });

    setBalls(newBalls);
  };

  const handleOptionSelection = (option) => {
    if (!isOptionLocked) {
      setSelectedOption(option);
      setIsOptionLocked(true);

      // Calculate points based on the selection
      let selectedScore;
      switch (option) {
        case "Dot":
          selectedScore = 0;
          break;
        case "Single":
          selectedScore = 1;
          break;
        case "2/3 Runs":
          selectedScore = 2 || 3;
          break;
        case "4 Runs":
          selectedScore = 4;
          break;
        case "6 Runs":
          selectedScore = 6;
          break;
        case "Wicket":
          selectedScore = "w";
          break;
        default:
          selectedScore = "";
      }

      updatePoints(selectedScore);
    }
  };

  const updatePoints = (selectedScore) => {
    let newPoints = points;

    // Check if the selected score matches the actual score of the current ball
    const currentBallIndex = (parseInt(over) - 1) * 6; // Calculate the index of the current ball
    const actualScore = balls[currentBallIndex]; // Get the actual score of the current ball

    if (selectedScore === actualScore) {
      // Award points based on the selected score
      switch (selectedScore) {
        case "w":
          newPoints += 25;
          break;
        case 6:
          newPoints += 8;
          break;
        case 4:
          newPoints += 5;
          break;
        case 3:
        case 2:
          newPoints += 3;
          break;
        case 1:
        case 0:
          newPoints += 1;
          break;
        default:
          break;
      }

      // Display an alert to notify the user of correct prediction and their total points
      Alert.alert(
        "Correct Prediction!",
        `You earned points for predicting the score correctly. Total points: ${newPoints}`
      );
    } else {
      // Display an alert to notify the user of incorrect prediction
      Alert.alert(
        "Incorrect Prediction!",
        "You did not earn any points for this prediction."
      );
    }

    // Update the points state with the new points value
    setPoints(newPoints);
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
          {/* Match Scorecard live */}
          <View style={styles.liveScoreCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={styles.teamTitle}>{teamAName}</Text>
              <Text style={styles.teamTitle}>vs</Text>
              <Text style={styles.teamTitle}>{teamBName}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={[
                  styles.teamScore,
                  {
                    color:
                      liveInning === teamAName ? COLORS.primary : COLORS.light,
                  },
                ]}
              >
                {scoreTeamA}
              </Text>
              <Text
                style={[
                  styles.teamScore,
                  {
                    color:
                      liveInning === teamBName ? COLORS.primary : COLORS.light,
                  },
                ]}
              >
                {scoreTeamB}
              </Text>
            </View>
          </View>
          <Text style={styles.gameTitle}>Over: {over}</Text>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>
            {"Points: "}
            <Text style={styles.points}>{points}</Text>
          </Text>
          <View style={styles.ballsContainer}>
            {balls.map((ball, index) => (
              <View key={index} style={[styles.balls]}>
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
                  isOptionLocked || timer === 0
                    ? { backgroundColor: COLORS.transparentBg, opacity: 0.5 }
                    : { backgroundColor: COLORS.transparentBg },
                  selectedOption === option && {
                    opacity: 1,
                    backgroundColor: COLORS.dark,
                  },
                ]}
                onPress={() => handleOptionSelection(option)}
                disabled={isOptionLocked || timer === 0}
              >
                <Text style={styles.options}>{option}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
        <View style={[styles.timerContainer]}>
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
  teamTitle: {
    color: COLORS.light,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  teamScore: {
    color: COLORS.light,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  liveScoreCard: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "35%",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
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
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  timerContainer: {
    borderColor: COLORS.secondary,
    marginTop: 14,
    borderRadius: 50,
    height: 65,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
  },
  lowerContainer: {
    backgroundColor: COLORS.transparentBg,
    marginVertical: 20,
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
    borderWidth: 1,
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
    color: COLORS.light,
    paddingHorizontal: 6,
    fontSize: 14,
    fontWeight: "bold",
    width: "32.5%",
  },
  points: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "bold",
  },
});
