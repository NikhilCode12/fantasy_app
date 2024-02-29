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
    }, 200);
  }, []);

  const handleCardPress = (fee) => {
    navigation.navigate("BeforeContestDetails", {
      data: data,
      amount: amount,
      variation: variation,
      entryFee: fee,
    });
  };

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
      <View style={styles.variationsTitleContainer}>
        <Text style={styles.variationTitleText}>
          {variation}
          {variation === "7 + 4" ? " players" : ""}
        </Text>
      </View>
      <View style={{ flex: 1, marginBottom: 130 }}>
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
              color={COLORS.light_grey}
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
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={contests}
            renderItem={({ item }) => (
              <ContestCard
                contest={item}
                variationSelected={variation}
                handleContestCardPress={() => handleCardPress(item.entryFee)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          if (variation === "7 + 4" || variation === "10 + 1") {
            navigation.navigate("PlayerSelection", {
              data: data,
              amount: amount,
              variation: variation,
            });
          } else if (variation === "Fantastic 5") {
            navigation.navigate("PlayerSelection2", {
              data: data,
              amount: amount,
              variation: variation,
            });
          } else {
            navigation.navigate("PlayerSelection3", {
              data: data,
              amount: amount,
              variation: variation,
            });
          }
        }}
        style={cStyles.createTeamButton}
      >
        <Text style={cStyles.buttonText}>Create New Team</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ContestsScreen;
