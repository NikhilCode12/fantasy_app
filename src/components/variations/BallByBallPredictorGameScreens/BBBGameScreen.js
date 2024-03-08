import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
  Alert,
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
  const [timer, setTimer] = useState(15);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOptionLocked, setIsOptionLocked] = useState(false);
  const [scoreTeamA, setScoreTeamA] = useState("-- / --");
  const [scoreTeamB, setScoreTeamB] = useState("-- / --");
  const [liveInning, setLiveInning] = useState("");
  const [teamAName, setTeamAName] = useState("");
  const [teamBName, setTeamBName] = useState("");
  const [currentBallIndex, setCurrentBallIndex] = useState(-1);
  const [contestOver, setContestOver] = useState(false);

  useEffect(() => {
    const gameWorking = async () => {
      const [startOver, endOver] = title.substring(7).split("-").map(Number);

      if (parseInt(over) < startOver) {
        setIsOptionLocked(true);
      }
      if (parseInt(over) > endOver) {
        setContestOver(true);
        setScoreTeamA("-- / --");
        setScoreTeamB("-- / --");
        setOver("--");
        setTimer(0);
        ToastAndroid.show("Contest Over!", ToastAndroid.SHORT);
        navigate.navigate("Ranking");
      }
    };

    gameWorking();
  }, [over]);

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
      setTimer(15);
      if (!selectedOption) {
        // If no option selected, disable options
        setIsOptionLocked(true);
      }
    }

    return () => clearInterval(interval);
  }, [timer, isOptionLocked, selectedOption]);

  const fetchLiveMatchData = async (matchId) => {
    try {
      // get data by sending match id as query param to the api
      const response = await axios.get(
        `https://fanverse-backend.onrender.com/api/live-match/?matchId=${matchId}`
      );
      const responseData = response.data.response;

      if (responseData === "Data unavailable") {
        ToastAndroid.show("Match not started yet!", ToastAndroid.SHORT);
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

      newBalls[ballIndex - 1] = score;

      ballIndex++;
    });

    setBalls(newBalls);

    // Set the index of the current ball
    setCurrentBallIndex((parseInt(over) - 1) * 6 + ballIndex - 1);
  };

  const getCorrectMap = (option) => {
    switch (option) {
      case "Dot":
        return 0;
      case "Single":
        return 1;
      case "2/3 Runs":
        return 3;
      case "4 Runs":
        return 4;
      case "6 Runs":
        return 6;
      case "Wicket":
        return "w";
    }
  };

  const handleOptionSelection = (option, actualScore) => {
    if (timer > 0) {
      const currentBallIndex =
        (parseInt(over) - 1) * 6 + balls.filter((ball) => ball !== null).length;
      let selectedScore;
      switch (option) {
        case "Dot":
          selectedScore = 0;
          break;
        case "Single":
          selectedScore = 1;
          break;
        case "2/3 Runs":
          selectedScore = 3;
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

      updatePoints(selectedScore, actualScore);

      setTimer(15);
      setSelectedOption(null);
      setIsOptionLocked(false);
    }
  };

  const updatePoints = (selectedScore, actualScore) => {
    let newPoints = points;

    if (selectedScore === actualScore) {
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
          newPoints += 0;
          break;
      }
      setPoints((prevPoints) => prevPoints + newPoints);

      ToastAndroid.show("Correct Prediction!", ToastAndroid.SHORT);
    } else {
      setPoints((prevPoints) => prevPoints + 0);
      ToastAndroid.show("Incorrect Prediction!", ToastAndroid.SHORT);
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
              <View
                key={index}
                style={[
                  styles.balls,
                  {
                    backgroundColor:
                      index === currentBallIndex
                        ? selectedOption === ball
                          ? "green"
                          : actualScore === ball
                          ? "red"
                          : COLORS.lightGray
                        : COLORS.lightGray,
                    borderWidth: 1,
                    borderColor:
                      index === currentBallIndex
                        ? COLORS.primary
                        : "transparent",
                  },
                ]}
              >
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
                onPress={() =>
                  handleOptionSelection(
                    getCorrectMap(option),
                    balls[(parseInt(over) - 1) * 6 + index]
                  )
                }
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
