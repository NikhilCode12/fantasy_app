import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  Animated,
  Image,
} from "react-native";
import COLORS from "../../constants/colors";
export default function LiveMatchCard({
  league,
  teamAImage,
  teamAName,
  teamBImage,
  teamBName,
  timeRemaining,
  startTime,
}) {
  return (
    <View
      style={{
        marginHorizontal: 20,
        marginTop: 10,
        backgroundColor: COLORS.bgLightBlack,
        paddingVertical: 10,
        paddingHorizontal: 8,
        flexDirection: "column",
        borderRadius: 10,
      }}
    >
      <Text style={{ color: COLORS.light_grey, fontSize: 12 }}>{league}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 10,
          }}
        >
          <Image
            source={teamAImage}
            alt="team A image"
            style={{ borderRadius: 50, height: 36, width: 36 }}
          />
          <Text
            style={{
              color: COLORS.light_grey,
              fontWeight: "500",
              fontSize: 13,
            }}
          >
            Team A
          </Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text style={{ fontSize: 10, color: COLORS.primary }}>
            {timeRemaining}
          </Text>
          <Text style={{ fontSize: 10, color: COLORS.light_grey }}>
            Today, {startTime}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 10,
          }}
        >
          <Text
            style={{
              color: COLORS.light_grey,
              fontWeight: "500",
              fontSize: 13,
            }}
          >
            Team B
          </Text>
          <Image
            source={teamBImage}
            alt="team B image"
            style={{ borderRadius: 50, height: 36, width: 36 }}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
