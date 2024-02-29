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
  const [seriesData, setSeries] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const [fullResponse, setFullResponse] = useState({});

  useEffect(() => {
    console.log("MatchesScreen mounted");
    const fetchData = async () => {
      try {
        let seriesValue = await AsyncStorage.getItem("seriesInfo");
        let matchesData = await AsyncStorage.getItem("matchesData");
        let seriesObj = await AsyncStorage.getItem("seriesObj");

        if (!seriesValue || !matchesData || !seriesObj) {
          const response = await axios.get(
            "https://api.cricapi.com/v1/series_info?apikey=46d49d4f-f77a-49f8-bf70-4c103e14feca&id=c6f823d3-0b54-4a2f-bb09-6a6c6b6481cc"
          );
          if (!seriesValue) {
            seriesValue = response.data.data.info["name"];
            await AsyncStorage.setItem(
              "seriesInfo",
              JSON.stringify({
                name: seriesValue,
              })
            );
          } else {
            seriesValue = JSON.parse(seriesValue).name;
          }

          if (!matchesData) {
            matchesData = response.data.data.matchList;
            await AsyncStorage.setItem(
              "matchesData",
              JSON.stringify(matchesData)
            );
          } else {
            matchesData = JSON.parse(matchesData);
          }

          if (!seriesObj) {
            seriesObj = response.data;
            await AsyncStorage.setItem("seriesObj", JSON.stringify(seriesObj));
          } else {
            seriesObj = JSON.parse(seriesObj);
          }
        } else {
          seriesValue = JSON.parse(seriesValue).name;
          matchesData = JSON.parse(matchesData);
          seriesObj = JSON.parse(seriesObj);
        }
        setSeries(seriesValue);
        setMatches(matchesData);
        setFullResponse(seriesObj);
        setDataLoading(false);
        console.log("MatchesScreen data fetched from AsyncStorage");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

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
      return `${addLeadingZero(years)}y : ${addLeadingZero(months % 12)}m`;
    } else if (months > 0) {
      return `${addLeadingZero(months)}m : ${addLeadingZero(days % 30)}d`;
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

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
          progressBackgroundColor={COLORS.bgLightBlack}
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
          }}
        >
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      )}
      {matches
        .slice()
        .sort((a, b) => {
          const timeVenueA = new Date(a.date).getTime();
          const timeVenueB = new Date(b.date).getTime();
          return timeVenueA - timeVenueB;
        })
        .map((match) => {
          const remainingTime = formatRemainingTime(match.dateTimeGMT);
          const matchDay = formatTimeVenue(match.date);
          if (remainingTime.includes("-")) {
            return null;
          }
          if (matchDay.includes("Today") || matchDay.includes("Tomorrow"))
            return (
              <MatchCard
                key={match.name}
                onMatchCardPress={() =>
                  onMatchCardPress({
                    teamAName: match.teamInfo[0]["shortname"],
                    teamBName: match.teamInfo[1]["shortname"],
                    timeRemaining: remainingTime,
                    timeVenue: matchDay,
                    teamAImage: match.teamInfo[0].img,
                    teamBImage: match.teamInfo[1].img,
                  })
                }
                league={seriesData}
                teamAImage={match.teamInfo[0].img}
                teamAName={match.teamInfo[0]["shortname"]}
                teamBName={match.teamInfo[1]["shortname"]}
                teamBImage={match.teamInfo[1].img}
                timeRemaining={remainingTime}
                timeVenue={formatTimeVenue(match.dateTimeGMT)}
                winnings={"15"}
              />
            );
        })}
    </ScrollView>
  );
};

export default MatchesScreen;
