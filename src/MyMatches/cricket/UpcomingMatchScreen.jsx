import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import UpcomingMatchCard from "./UpcomingMatchCard";
import matchesdata from "../../constants/matchesdummy.json";
import icon from "../../../assets/icon.png";
export default function UpComingMatchScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {matchesdata.map((match) => {
          return (
            <UpcomingMatchCard
              key={match.id}
              league={match.league}
              teamAImage={icon}
              teamAName={match.teamAName}
              teamBImage={icon}
              teamBName={match.teamBName}
              timeRemaining={match.timeRemaining}
              startTime={match.timeVenue.time}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
