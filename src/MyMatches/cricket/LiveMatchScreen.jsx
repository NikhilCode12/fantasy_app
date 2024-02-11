import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import LiveMatchCard from "./LiveMatchCard";
import matchesdata from "../../constants/matchesdummy.json";
import icon from "../../../assets/icon.png";
export default function LiveMatchScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {matchesdata.map((match) => {
          return (
            <LiveMatchCard
              key={match.id}
              league={match.league}
              teamAImage={icon}
              teamAName={match.teamAName}
              teamBImage={icon}
              teamBName={match.teamBName}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
