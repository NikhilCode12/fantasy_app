import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import COLORS from "../../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const BBBGameScreen = ({ route }) => {
  const navigate = useNavigation();
  const { data, title } = route.params;
  const [balls, setBalls] = useState(Array(18).fill(null));
  const [over, setOver] = useState("--");
  const [ballIndex, setBallIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [timer, setTimer] = useState(20);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [scoreTeamA, setScoreTeamA] = useState("-- / --");
  const [scoreTeamB, setScoreTeamB] = useState("-- / --");
  const [liveInning, setLiveInning] = useState(1);
  const [recentScores, setRecentScores] = useState("");

  useEffect(() => {
    fetchLiveMatchData(data.matchId);

    // fetch live match data every 20 seconds
    // const interval = setInterval(() => {
    //   if (fetchLiveMatchData(data.matchId) === null) {
    //     clearInterval(interval);
    //   }
    // }, 20000);

    // return () => clearInterval(interval);
  }, []);

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

      // Split recent scores string into an array
      const recentScoresArray = live_inning.recent_scores.split(",");
      const lastScore = recentScoresArray[recentScoresArray.length - 1];

      // Update the balls array with the last score
      const updatedBalls = [...balls];
      updatedBalls[balls.length - 1] = lastScore;

      // Update other state variables
      setBalls(updatedBalls);
      setScoreTeamA(teamA.scores);
      setScoreTeamB(teamB.scores);

      if (
        parseInt(scoreTeamA.split("/")[0]) >
          parseInt(scoreTeamB.split("/")[0]) ||
        parseInt(scoreTeamA.split("/")[0]) < parseInt(scoreTeamB.split("/")[0])
      ) {
        Alert.alert("Game Over", "Game is over. You can not predict now.");
        navigate.goBack();
      }
      setOver(responseData.live_score.overs);
      setLiveInning(responseData.live_inning_number);
    } catch (error) {
      console.error(error);
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
              <Text style={styles.teamTitle}>{data.teamAName}</Text>
              <Text style={styles.teamTitle}>vs</Text>
              <Text style={styles.teamTitle}>{data.teamBName}</Text>
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
                    color: liveInning === 1 ? COLORS.primary : COLORS.light,
                  },
                ]}
              >
                {scoreTeamA}
              </Text>
              <Text
                style={[
                  styles.teamScore,
                  {
                    color: liveInning === 2 ? COLORS.primary : COLORS.light,
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
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.balls,
                  index === ballIndex && {
                    borderColor: COLORS.primary,
                    borderWidth: 1,
                  },
                  balls[index] &&
                    balls[index].isCorrect && {
                      borderColor: COLORS.darkGreen,
                    },
                  balls[index] &&
                    !balls[index].isCorrect && {
                      backgroundColor: COLORS.darkRed,
                    },
                  balls[index] &&
                    !balls[index].result && {
                      opacity: 0.5,
                    },
                ]}
                disabled={false}
              >
                <Text
                  style={{
                    color: COLORS.light,
                    fontWeight: "bold",
                    fontSize: 11,
                  }}
                >
                  {balls[index]}
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
                    ? { backgroundColor: COLORS.transparentBg, opacity: 0.5 }
                    : { backgroundColor: COLORS.transparentBg },
                  selectedOption === option && {
                    opacity: 1,
                    backgroundColor: COLORS.dark,
                  },
                ]}
                disabled={selectedOption !== null || timer === 0}
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
    color: COLORS.light_grey,
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
