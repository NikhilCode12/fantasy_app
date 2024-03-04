import {
  FlatList,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import styles from "../../styles/variations.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";

const VariationsScreen = ({ route }) => {
  // const data = {};
  const { data } = route.params;
  const navigation = useNavigation();
  const amount = (0).toPrecision(3);
  const variations = [
    { id: "1", title: "7 + 4" },
    { id: "2", title: "10 + 1" },
    { id: "3", title: "Fantastic 5" },
    { id: "4", title: "Top 3" },
    { id: "5", title: "Ball by Ball Predictor" },
    { id: "6", title: "Fanverse Original" },
    { id: "7", title: "Powerplay" },
    { id: "8", title: "Playgrounds" },
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
            <Text style={styles.matchTeamText}>
              {data.teamAName} vs {data.teamBName}
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
      <Text style={styles.variationHeading}>Select Variation</Text>
      <FlatList
        data={variations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.variationCard}
            onPress={() => {
              if (
                item.id === "1" ||
                item.id === "2" ||
                item.id === "3" ||
                item.id === "4"
              ) {
                navigation.navigate("ContestBottomNavigation", {
                  data: data,
                  amount: amount,
                  variation: item.title,
                });
              } else if (item.id === "5") {
                navigation.navigate("BallByBallPredictor", {
                  data: data,
                  amount: amount,
                  variation: item.title,
                });
              } else {
                ToastAndroid.show("Coming soon...", ToastAndroid.SHORT);
              }
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <Text style={styles.variationTitle}>{item.title}</Text>
              {item.id === "5" && (
                <Text
                  style={{
                    color: COLORS.light,
                    fontSize: 10,
                    fontWeight: "bold",
                    paddingHorizontal: 10,
                    textAlign: "center",
                    paddingVertical: 2,
                    borderRadius: 4,
                    backgroundColor: COLORS.transparentBg,
                  }}
                >
                  New
                </Text>
              )}
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default VariationsScreen;
