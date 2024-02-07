import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styles from "../../styles/variations.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";

const ContestsScreen = ({ route }) => {
  const { data, amount, variation } = route.params;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <TouchableOpacity style={styles.backArrow}>
            <Ionicons
              name="arrow-back"
              size={24}
              onPress={() => {
                navigation.goBack();
              }}
              color={COLORS.primary}
            />
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
        <TouchableOpacity style={styles.walletIcon}>
          <Text style={styles.walletText}>&#8377;{amount}</Text>
          <Ionicons
            name="add-circle-outline"
            size={24}
            onPress={() => {
              navigation.navigate("Wallet");
            }}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ContestsScreen;
