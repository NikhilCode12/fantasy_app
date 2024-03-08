import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";

const ContestCard = ({
  contest,
  variationSelected,
  oversSelected,
  handleContestCardPress,
}) => {
  const {
    title,
    winners,
    prizePool,
    entryFee,
    spotsLeft,
    totalSpots,
    megaPrize,
    variation,
    teams,
  } = contest;

  if (variation !== variationSelected) {
    return null;
  }

  // if (oversSelected !== title) {
  //   return null;
  // }

  const spotsLeftFormatted = spotsLeft.toLocaleString("en-IN");
  const totalSpotsFormatted = totalSpots.toLocaleString("en-IN");

  const spotsTakenPercentage = ((totalSpots - spotsLeft) / totalSpots) * 100;
  const redProgressBarStyle = {
    width: `${spotsTakenPercentage}%`,
    backgroundColor:
      variationSelected === "Ball by Ball Predictor"
        ? "lightblue"
        : COLORS.secondary,
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleContestCardPress(entryFee)}
    >
      <View style={styles.winnersInfoContainer}>
        <View
          style={[
            styles.topLeftContainer,
            {
              backgroundColor:
                variationSelected === "Ball by Ball Predictor"
                  ? COLORS.btn
                  : COLORS.silver,
            },
          ]}
        >
          {variationSelected === "Ball by Ball Predictor" ? (
            <MaterialCommunityIcons
              name="medal"
              size={12}
              color={COLORS.light_grey}
            />
          ) : (
            <Ionicons name="medal" size={12} color={COLORS.bgMateBlack} />
          )}
          <Text
            style={[
              styles.winnersText,
              {
                color:
                  variationSelected === "Ball by Ball Predictor"
                    ? COLORS.light
                    : COLORS.dark,
                fontSize: 12,
              },
            ]}
          >
            Winners: {winners}
          </Text>
        </View>
      </View>
      <View style={styles.contestDetailsContainer}>
        <View style={styles.prizeContainer}>
          <Text style={styles.prizePoolText}>Prize Pool</Text>
          <Text style={styles.prizePoolAmount}>{prizePool}</Text>
        </View>
        <View style={styles.entryFeeContainer}>
          <Text style={styles.entryFeeText}>Entry Fee</Text>
          <Text
            style={[
              styles.entryFeeAmount,
              {
                backgroundColor:
                  variationSelected === "Ball by Ball Predictor"
                    ? COLORS.btn
                    : COLORS.secondary,
                color:
                  variationSelected === "Ball by Ball Predictor"
                    ? COLORS.light
                    : COLORS.dark,
              },
            ]}
          >
            {entryFee}
          </Text>
        </View>
      </View>
      <View style={styles.spotsLeftContainer}>
        <View style={[styles.progressBar, redProgressBarStyle]}></View>
        <View style={styles.whiteProgressBar}></View>
        <View style={styles.spotsLeftDetails}>
          <Text
            style={[
              styles.spotsLeftText,
              {
                color:
                  variationSelected === "Ball by Ball Predictor"
                    ? "lightblue"
                    : COLORS.secondary,
              },
            ]}
          >
            {spotsLeftFormatted} Spots left
          </Text>
          <Text style={styles.totalSpotsText}>{totalSpotsFormatted} Spots</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.prizeText}>
          Mega Prize: <Text style={styles.prizeAmount}>{megaPrize}</Text>
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 4,
            alignItems: "center",
          }}
        >
          {teams ? (
            <>
              <Ionicons name="shirt" size={12} color={COLORS.silver} />
              <Text style={styles.prizeText}>
                Teams: <Text style={styles.prizeAmount}>{teams}</Text>
              </Text>
            </>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topLeftContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 4,
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 5,
  },
  winnersInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  winnersText: {
    color: COLORS.dark,
    fontSize: 11,
    fontWeight: "500",
  },
  contestDetailsContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prizeContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  prizePoolText: {
    color: COLORS.silver,
    fontSize: 13,
    fontWeight: "500",
  },
  prizePoolAmount: {
    color: COLORS.light_grey,
    fontSize: 18,
    fontWeight: "bold",
  },
  entryFeeContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  entryFeeText: {
    color: COLORS.silver,
    fontSize: 13,
    fontWeight: "500",
  },
  entryFeeAmount: {
    color: COLORS.dark,
    textAlign: "center",
    fontSize: 14,
    paddingVertical: 1,
    backgroundColor: COLORS.secondary,
    borderRadius: 5,
    fontWeight: "500",
  },
  spotsLeftContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  progressBar: {
    backgroundColor: COLORS.silver,
    height: 4,
    marginTop: 8,
    borderRadius: 5,
    position: "relative",
  },
  spotsLeftDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  spotsLeftText: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: "500",
  },
  totalSpotsText: {
    color: COLORS.silver,
    fontSize: 11,
    fontWeight: "500",
  },
  bottomContainer: {
    backgroundColor: COLORS.transparentBg,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prizeText: {
    color: COLORS.light_grey,
    fontSize: 11,
    fontWeight: "500",
  },
  prizeAmount: {
    color: COLORS.silver,
    fontSize: 11,
    fontWeight: "700",
  },
  whiteProgressBar: {
    backgroundColor: COLORS.silver,
    height: 4,
    marginTop: 8,
    borderRadius: 5,
    position: "absolute",
  },
});

export default ContestCard;
