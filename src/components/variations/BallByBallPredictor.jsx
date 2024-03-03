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

const BallByBallPredictor = ({ route }) => {
  // const data = {};
  const { data, variation } = route.params;
  const navigation = useNavigation();
  const amount = (0).toPrecision(3);
  const choices = [
    { id: "1", title: "Overs: 1-3" },
    { id: "2", title: "Overs: 3-6" },
    { id: "3", title: "Overs: 6-9" },
    { id: "4", title: "Overs: 9-12" },
    { id: "5", title: "Overs: 12-15" },
    { id: "6", title: "Overs: 15-18" },
    { id: "7", title: "Overs: 18-20" },
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
      <Text style={styles.variationHeading}>Select Overs</Text>
      <FlatList
        data={choices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.variationCard,
              {
                backgroundColor:
                  item.id === "1" || item.id === "2" || item.id === "7"
                    ? COLORS.btn
                    : COLORS.transparentBg,
              },
            ]}
            onPress={() => {
              navigation.navigate("ContestBottomNavigation", {
                data: data,
                amount: amount,
                variation: variation,
                title: item.title,
              });
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
              <Text
                style={[
                  styles.variationTitle,
                  {
                    color: COLORS.light,
                  },
                ]}
              >
                {item.title}
              </Text>
              {(item.id === "1" || item.id === "2") && (
                <Text
                  style={{
                    color: COLORS.light,
                    fontSize: 10,
                    fontWeight: "500",
                    paddingHorizontal: 10,
                    textAlign: "center",
                    paddingVertical: 4,
                    borderRadius: 4,
                    backgroundColor: COLORS.transparentBg,
                  }}
                >
                  Powerplay
                </Text>
              )}
              {item.id === "7" ? (
                <Text
                  style={{
                    color: COLORS.light,
                    fontSize: 10,
                    fontWeight: "500",
                    paddingHorizontal: 10,
                    textAlign: "center",
                    paddingVertical: 4,
                    borderRadius: 4,
                    backgroundColor: COLORS.transparentBg,
                  }}
                >
                  Final Overs
                </Text>
              ) : null}
            </View>
            <Ionicons name="chevron-forward" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default BallByBallPredictor;
