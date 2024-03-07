import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import COLORS from "../../constants/colors";
import styles from "../../styles/matchcard.style.js";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const MatchCard = ({
  onMatchCardPress,
  league,
  teamAImage,
  teamAName,
  teamBImage,
  teamBName,
  timeRemaining,
  timeVenue,
  format,
  winnings,
}) => {
  const [notified, setNotified] = useState(false);

  const truncatedLeague =
    league.length > 28 ? league.substring(0, 28) + "..." : league;
  const handleMatchCardPress = () => {
    const data = { timeRemaining };
    onMatchCardPress(data);
  };

  // useEffect(() => {
  //   console.log("Time Remaining: ", timeRemaining);
  // }, []);

  // Time remaining is in the format "00d : 00h" || "00h : 00m" || "00m : 00s"

  // if time remaining is less than 5 minutes, then display time in red color
  const timeRemainingArray = timeRemaining.split(" : ");

  const changeTimeColor = (timeRemainingArray) => {
    if (
      timeRemainingArray[0].includes("m") ||
      timeRemainingArray[0].includes("s")
    ) {
      if (parseInt(timeRemainingArray[0]) < 5) return { color: COLORS.darkRed };
      else return { color: COLORS.darkRed };
    } else return { color: COLORS.light_grey };
  };

  return (
    <TouchableOpacity onPress={handleMatchCardPress}>
      {/* Card Container */}
      <View style={styles.cardContainer}>
        {/* Top of Match Card */}
        <View style={styles.topContainer}>
          {/* League of Match */}
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.leagueText}>{truncatedLeague}</Text>
            <Text
              style={[
                styles.leagueText,
                { fontSize: 10, color: COLORS.light_grey },
              ]}
            >
              {format}
            </Text>
          </View>
          {/* Container for Team Details */}
          <View style={styles.teamContainer}>
            {/* Team A Logo and Name */}
            <View style={styles.teamLogoContainer}>
              <Image
                src={teamAImage}
                alt="team A image"
                style={styles.teamLogos}
              />
              <Text style={[styles.teamNameText, { textAlign: "left" }]}>
                {teamAName}
              </Text>
            </View>
            {/* Date,time and remaining time display of match */}
            <View style={styles.timeContainer}>
              <Text
                style={[
                  styles.remainTimeText,
                  {
                    ...changeTimeColor(timeRemainingArray),
                  },
                ]}
              >
                {timeRemaining}
              </Text>
              <Text style={styles.dateTimeText}>
                {/* {"Today, "} */}
                {timeVenue}
              </Text>
            </View>
            {/* Team B Logo and Name */}
            <View style={styles.teamLogoContainer}>
              <Text style={[styles.teamNameText, { textAlign: "right" }]}>
                {teamBName}
              </Text>
              <Image
                src={teamBImage}
                alt="team B image"
                style={styles.teamLogos}
              />
            </View>
          </View>
        </View>
        {/* Divider */}
        <View style={styles.divider}></View>
        {/* Bottom of Match Card */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Winnings Box */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            {/* Cash Display Card */}
            <View style={styles.winningsCard}>
              <Text style={styles.winningsCardText}>
                {/* {"\u20B9"} */}
                {winnings}
                {/* {" Lakhs"} */}
              </Text>
            </View>
            <Text style={styles.winningsText}>{""}</Text>
          </View>
          {/* Notifications Icon */}
          <TouchableOpacity
            onPress={() => {
              setNotified(true);
            }}
            disabled={notified}
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <Text style={styles.notifyText}>
              {notified ? "We will remind you!" : "Notify Me"}
            </Text>
            {notified ? null : (
              <FontAwesome name="bell-o" size={14} color={COLORS.secondary} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MatchCard;
