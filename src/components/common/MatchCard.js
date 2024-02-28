import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import COLORS from "../../constants/colors";
import styles from "../../styles/matchcard.style.js";
import { FontAwesome } from "@expo/vector-icons";

const MatchCard = ({
  onMatchCardPress,
  league,
  teamAImage,
  teamAName,
  teamBImage,
  teamBName,
  timeRemaining,
  timeVenue,
  winnings,
}) => {
  const [notified, setNotified] = useState(false);

  const truncatedLeague =
    league.length > 30 ? league.substring(0, 30) + "..." : league;
  const handleMatchCardPress = () => {
    const data = { timeRemaining };
    onMatchCardPress(data);
  };
  return (
    <TouchableOpacity onPress={handleMatchCardPress}>
      {/* Card Container */}
      <View style={styles.cardContainer}>
        {/* Top of Match Card */}
        <View style={styles.topContainer}>
          {/* League of Match */}
          <Text style={styles.leagueText}>{truncatedLeague}</Text>
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
              <Text style={styles.remainTimeText}>{timeRemaining}</Text>
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
                {"\u20B9"}
                {winnings}
                {" Lakhs"}
              </Text>
            </View>
            <Text style={styles.winningsText}>Winnings</Text>
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
              <FontAwesome name="bell" size={14} color={COLORS.secondary} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MatchCard;
