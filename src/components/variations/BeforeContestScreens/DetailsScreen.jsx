import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const DetailsScreen = () => {
  const prizeBreakdown = [
    { rank: "1", prize: "5 Lakhs" },
    { rank: "2", prize: "3 Lakhs" },
    { rank: "3", prize: "2 Lakhs" },
    { rank: "4", prize: "1 Lakh" },
    { rank: "5-10", prize: "50,000" },
    { rank: "11-50", prize: "25,000" },
    { rank: "51-100", prize: "10,000" },
    { rank: "101-500", prize: "5,000" },
    { rank: "501-1000", prize: "2,000" },
  ];

  const prize = "10 Lakhs";
  const winners = 1000;
  const entryFee = 50;

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Share contest with friends link and details */}
        <TouchableOpacity style={styles.shareContestContainer}>
          <Text style={styles.shareContestText}>
            Share this contest with your friends
          </Text>
          <Ionicons name="share-social" size={18} color={COLORS.primary} />
        </TouchableOpacity>
        {/* Details container */}
        <View style={styles.detailsContainer}>
          <View
            style={{
              width: "33%",
              justifyContent: "center",
              gap: 4,
              borderRadius: 5,
              padding: 8,
            }}
          >
            <Text style={styles.headingText}>Prize</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.teamText}>
                {"\u20B9" + prize.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "33%",
              justifyContent: "center",
              gap: 4,
              backgroundColor: COLORS.bgLightBlack,
              borderRadius: 5,
              padding: 8,
            }}
          >
            <Text style={styles.headingText}>Winners</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.teamText}>
                {winners.toLocaleString("en-IN")}
              </Text>
              <Ionicons
                name="trophy-outline"
                size={14}
                color={COLORS.primary}
              />
            </View>
          </View>
          <View
            style={{
              width: "33%",
              justifyContent: "center",
              gap: 4,
              borderRadius: 5,
              padding: 8,
            }}
          >
            <Text style={styles.headingText}>Entry Fee</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.teamText}>
                {"\u20B9" + entryFee.toLocaleString("en-IN")}
              </Text>
            </View>
          </View>
        </View>
        {/* Prize Breakup View */}
        <Text
          style={[
            styles.shareContestText,
            {
              marginTop: 20,
              fontSize: 13,
            },
          ]}
        >
          Prize Breakdown
        </Text>
        <View style={styles.prizeBreakupContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text
              style={[
                styles.teamText,
                {
                  color: COLORS.silver,
                },
              ]}
            >
              RANK
            </Text>
            <Text
              style={[
                styles.teamText,
                {
                  color: COLORS.silver,
                },
              ]}
            >
              PRIZE
            </Text>
          </View>
          {prizeBreakdown.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <Text
                style={[
                  styles.teamText,
                  {
                    color: COLORS.silver,
                  },
                ]}
              >
                {" #" + item.rank}
              </Text>
              <Text
                style={[
                  styles.teamText,
                  {
                    color: COLORS.silver,
                  },
                ]}
              >
                {"\u20B9" + item.prize}
              </Text>
            </View>
          ))}
        </View>
        <View
          style={{
            marginVertical: 20,
            gap: 4,
            borderRadius: 5,
            backgroundColor: COLORS.dark,
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 13,
              textAlign: "justify",
              fontWeight: "bold",
            }}
          >
            Important Note
          </Text>
          <Text
            style={{
              color: COLORS.silver,
              fontSize: 12,
            }}
          >
            1. If total entries are less than 2 entries, then the contest will
            be cancelled and the entry fee will be refunded into your account.
          </Text>
          <Text
            style={{
              color: COLORS.silver,
              fontSize: 12,
            }}
          >
            2. In such case, winnings will be divided.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

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
    marginTop: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 8,
  },
  teamText: {
    color: COLORS.light,
    fontSize: 13,
    fontWeight: "bold",
  },
  headingText: {
    color: COLORS.silver,
    fontSize: 14,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  prizeBreakupContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
  },
});
