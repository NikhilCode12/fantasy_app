import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import COLORS from "../../constants/colors";
import styles from "../../styles/matchcard.style.js";
import { FontAwesome } from "@expo/vector-icons";

const MatchCard = ({
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

  return (
    <TouchableOpacity>
      {/* Card Container */}
      <View style={styles.cardContainer}>
        {/* Top of Match Card */}
        <View style={styles.topContainer}>
          {/* League of Match */}
          <Text style={styles.leagueText}>{league}</Text>
          {/* Container for Team Details */}
          <View style={styles.teamContainer}>
            {/* Team A Logo and Name */}
            <View style={styles.teamLogoContainer}>
              <Image
                source={teamAImage}
                alt="team A image"
                style={styles.teamLogos}
              />
              <Text style={styles.teamNameText}>{"Team A"}</Text>
            </View>
            {/* Date,time and remaining time display of match */}
            <View style={styles.timeContainer}>
              <Text style={styles.remainTimeText}>{timeRemaining}</Text>
              <Text style={styles.dateTimeText}>
                {"Today, "}
                {timeVenue}
              </Text>
            </View>
            {/* Team B Logo and Name */}
            <View style={styles.teamLogoContainer}>
              <Text style={styles.teamNameText}>{"Team B"}</Text>
              <Image
                source={teamBImage}
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
            style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          >
            <Text style={styles.notifyText}>{notified ? "" : "Notify Me"}</Text>
            <FontAwesome
              name={notified ? "bell" : "bell-o"}
              size={15}
              color={COLORS.light_grey}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MatchCard;
