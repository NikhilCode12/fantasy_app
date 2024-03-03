import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "../styles/variations.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors.js";
import { useNavigation } from "@react-navigation/native";

const VariationsScreen = () => {
  const navigation = useNavigation();
  const amount = (0).toPrecision(3);
  const variations = [
     { id: "1", title: "7 + 4" },
    { id: "2", title: "10 + 1" },
    { id: "3", title: "Fantastic 5" },
    { id: "4", title: "Top 3" },
    { id: "5", title: "Fanverse Original" },
    { id: "6", title: "Powerplay" },
    { id: "7", title: "Playgrounds" },
  ];
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
            <Text style={styles.matchTeamText}>{"Variations"}</Text>
            <Text style={styles.matchTimeText}>{"Fanverse zone"}</Text>
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
      <Text style={styles.variationHeading}>Select Variation</Text>
      <FlatList
        data={variations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.variationCard}
            onPress={() => {
              // navigation.navigate("");
            }}
          >
            <Text style={styles.variationTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default VariationsScreen;
