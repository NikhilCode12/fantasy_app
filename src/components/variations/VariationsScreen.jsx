import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "../../styles/variations.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";

const VariationsScreen = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const amount = (0).toPrecision(3);
  const variations = [
    { id: "1", title: "Old School" },
    { id: "2", title: "Powerplay" },
    { id: "3", title: "Negative 11" },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <TouchableOpacity style={styles.backArrow}>
            <Ionicons
              name="arrow-back"
              size={24}
              onPress={() => {
                // console.log(navigation.navigate);
                // navigation.navigate;
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
      <Text style={styles.variationHeading}>Select Variation</Text>
      <FlatList
        data={variations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.variationCard}
            onPress={() => {
              navigation.navigate("Contests", {
                data: data,
                amount: amount,
                variation: item.title,
              });
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
