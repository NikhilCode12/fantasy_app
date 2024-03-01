import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import styles from "../../styles/cricket.matches.style";
import COLORS from "../../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MatchCard from "../common/MatchCard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MatchesScreen = ({ onMatchCardPress }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [matches, setMatches] = useState([]);
  const [seriesData, setSeries] = useState({});
  const [dataLoading, setDataLoading] = useState(true);
  const [fullResponse, setFullResponse] = useState({});

  useEffect(() => {
    console.log("MatchesScreen mounted");
    fetchMatchesData();
    const intervalId = setInterval(() => {
      setMatches((prevMatches) =>
        prevMatches.map((match) => ({
          ...match,
          timeRemaining: formatRemainingTime(match.dateTimeGMT),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchMatchesData = async () => {
    try {
      const cachedData = await AsyncStorage.getItem("matchesData");
      if (cachedData !== null) {
        const matchesData = JSON.parse(cachedData);
        setMatches(matchesData);
        setDataLoading(false);
      } else {
        const response = await axios.get(
          "https://fanverse-backend.onrender.com/api/match/all"
        );
        const matchesData = response.data.map((match) => ({
          ...match,
          dateTimeGMT: match.date_start_ist,
        }));
        setMatches(matchesData);
        setFullResponse(response.data);
        setDataLoading(false);
        await AsyncStorage.setItem("matchesData", JSON.stringify(matchesData));
      }
    } catch (err) {
      console.log("Error while fetching data from server: ", err);
    }
  };

  const formatRemainingTime = (dateTimeGMT) => {
    const matchTime = new Date(dateTimeGMT).getTime() + 5.5 * 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    let timeDifference = matchTime - currentTime;

    timeDifference = Math.max(timeDifference, 0);

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    const addLeadingZero = (value) => {
      return value < 10 ? `0${value}` : `${value}`;
    };

    if (years > 0) {
      return `${addLeadingZero(years)}y : ${addLeadingZero(months % 12)}mm`;
    } else if (months > 0) {
      return `${addLeadingZero(months)}mm : ${addLeadingZero(days % 30)}d`;
    } else if (days > 0) {
      return `${addLeadingZero(days)}d : ${addLeadingZero(hours % 24)}h`;
    } else if (hours > 0 || (days === 0 && minutes >= 60)) {
      return `${addLeadingZero(hours)}h : ${addLeadingZero(minutes % 60)}m`;
    } else if (minutes > 0 || (hours === 0 && seconds >= 60)) {
      return `${addLeadingZero(minutes)}m : ${addLeadingZero(seconds % 60)}s`;
    } else {
      return `${addLeadingZero(seconds)}s`;
    }
  };

  const formatTimeVenue = (dateTimeGMT) => {
    const matchDate = new Date(dateTimeGMT);
    matchDate.setTime(matchDate.getTime() + 330 * 60 * 1000);

    const currentDate = new Date();
    const options = { hour: "numeric", minute: "numeric", hour12: true };

    if (
      matchDate.getDate() === currentDate.getDate() &&
      matchDate.getMonth() === currentDate.getMonth() &&
      matchDate.getFullYear() === currentDate.getFullYear()
    ) {
      return `Today, ${matchDate.toLocaleTimeString("en-IN", options)}`;
    }

    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    if (
      matchDate.getDate() === tomorrow.getDate() &&
      matchDate.getMonth() === tomorrow.getMonth() &&
      matchDate.getFullYear() === tomorrow.getFullYear()
    ) {
      return `Tomorrow, ${matchDate.toLocaleTimeString("en-IN", options)}`;
    }

    const dateFormatter = new Intl.DateTimeFormat("en-IN", {
      month: "short",
      day: "numeric",
    });
    const dateString = dateFormatter.format(matchDate);
    return `${dateString}, ${matchDate.toLocaleTimeString("en-IN", options)}`;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await AsyncStorage.removeItem("matchesData");
      await fetchMatchesData();
    } catch (err) {
      console.log("Error while refreshing data: ", err);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={styles.matchesContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 90 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.primary]}
          progressBackgroundColor={COLORS.bgMateBlack}
        />
      }
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 6,
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <Text style={styles.matchText}>{"Upcoming Matches"}</Text>
        <TouchableOpacity style={styles.filterElement}>
          <MaterialCommunityIcons
            name="filter"
            size={16}
            style={{ marginVertical: 4 }}
            color={COLORS.primary}
          />
          <Text style={styles.matchText2}>{"Filter"}</Text>
        </TouchableOpacity>
      </View>
      {dataLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginVertical: "50%",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      {matches
        .slice()
        .sort((a, b) => {
          const timeVenueA = new Date(a.dateTimeGMT).getTime();
          const timeVenueB = new Date(b.dateTimeGMT).getTime();
          return timeVenueA - timeVenueB;
        })
        .filter((match) => {
          const remainingTime = formatRemainingTime(match.dateTimeGMT);
          return remainingTime !== "00s";
        })
        .map((match) => {
          const remainingTime = formatRemainingTime(match.dateTimeGMT);
          const matchDay = formatTimeVenue(match.dateTimeGMT);

          if (matchDay.includes("Today") || matchDay.includes("Tomorrow")) {
            return (
              <MatchCard
                key={match.match_id}
                onMatchCardPress={() =>
                  onMatchCardPress({
                    teamAName: match.teama.short_name,
                    teamBName: match.teamb.short_name,
                    timeRemaining: remainingTime,
                    timeVenue: matchDay,
                    teamAImage: match.teama.logo_url,
                    teamBImage: match.teamb.logo_url,
                  })
                }
                league={match.competition.abbr}
                teamAImage={match.teama.logo_url}
                teamAName={match.teama.short_name}
                teamBName={match.teamb.short_name}
                teamBImage={match.teamb.logo_url}
                timeRemaining={remainingTime}
                timeVenue={matchDay}
                winnings={"5"}
              />
            );
          }
        })}
    </ScrollView>
  );
};

export default MatchesScreen;
