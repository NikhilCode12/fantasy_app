import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import styles from "../../styles/variations.style.js";
import cStyles from "../../styles/contests.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const contests = [
  {
    id: "1",
    name: "Grand League",
    size: "1000",
    entry: "100",
    winning: "1000",
  },
  {
    id: "2",
    name: "Mega League",
    size: "100",
    entry: "10",
    winning: "100",
  },
  {
    id: "3",
    name: "Small League",
    size: "10",
    entry: "1",
    winning: "10",
  },
];

const ContestsScreen = ({ route }) => {
  const { data, amount, variation } = route.params;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={styles.matchDetails}>
            <Text style={styles.matchTeamText}>
              {"Team A"} vs {"Team B"}
            </Text>
            <Text style={styles.matchTimeText}>
              {data.timeRemaining}
              {" left"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.walletIcon}
          onPress={() => {
            navigation.navigate("Wallet");
          }}
        >
          <Text style={styles.walletText}>&#8377;{amount}</Text>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.variationsTitleContainer}>
        <Text style={styles.variationTitleText}>
          {variation}
          {variation === "7 + 4" ? " players" : ""}
        </Text>
      </View>
      <View style={cStyles.sortContainer}>
        <Text style={cStyles.sortText}>{"Sort by:"}</Text>
        <TouchableOpacity style={cStyles.sortButton}>
          <Text style={cStyles.sortButtonText}>{"Entry"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={cStyles.sortButton}>
          <Text style={cStyles.sortButtonText}>{"Contest Size"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={cStyles.filterElement}>
          <MaterialCommunityIcons
            name="filter"
            size={16}
            style={{ marginVertical: 4 }}
            color={COLORS.primary}
          />
          <Text style={cStyles.matchText2}>{"Filter"}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
            fontStyle: "italic",
          }}
        >
          {"Work in Progress..."}
        </Text>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    </SafeAreaView>
  );
};

export default ContestsScreen;
