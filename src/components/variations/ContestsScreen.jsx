import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../styles/variations.style.js";
import cStyles from "../../styles/contests.style.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors.js";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContestCard from "../common/ContestCard.js";
import contests from "../../constants/contests.json";

const ContestsScreen = ({ route }) => {
  const { data, amount, variation } = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
      {isLoading ? (
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
              color: COLORS.light_grey,
              fontSize: 14,
              fontWeight: "bold",
              marginBottom: 20,
              fontStyle: "italic",
            }}
          >
            {"Loading, contests are on the way..."}
          </Text>
          <ActivityIndicator size="small" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={contests}
          renderItem={({ item }) => (
            <ContestCard contest={item} variationSelected={variation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default ContestsScreen;
