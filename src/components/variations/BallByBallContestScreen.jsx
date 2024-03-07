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
import ContestCard2 from "../common/ContestCard2.js";
// import contests from "../../constants/contests.json";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BallByBallContestScreen = ({ route }) => {
  const { data, amount, variation, title } = route.params;
  const [contests, setContests] = useState([]);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function updateContests() {
      if (title === "Overs: 1-3") {
        console.log("here");
        const responseData = await axios.post(
          "https://fanverse-backend.onrender.com/api/ballbyball/onetothree/getall",
          { matchId: data.matchId }
        );
        setContests(responseData.data);
        console.log(responseData.data);
      } else if (title === "Overs: 3-6") {
        const responseData = await axios.post(
          "https://fanverse-backend.onrender.com/api/ballbyball/fourtosix/getall",
          { matchId: data.matchId }
        );
        console.log(responseData.data);
        setContests(responseData.data);
      } else if (title === "Overs: 6-9") {
        const responseData = await axios.post(
          "https://fanverse-backend.onrender.com/api/ballbyball/seventonine/getall",
          { matchId: data.matchId }
        );
        // console.log(responseData.data);
        setContests(responseData.data);
      } else if (title === "Overs: 9-12") {
        const responseData = await axios.post(
          "https://fanverse-backend.onrender.com/api/ballbyball/tentotwelve/getall",
          { matchId: data.matchId }
        );
        // console.log(responseData.data);
        setContests(responseData.data);
      } else if (title === "Overs: 12-15") {
        const responseData = await axios.post(
          "https://fanverse-backend.onrender.com/api/ballbyball/thirteentofifteen/getall",
          { matchId: data.matchId }
        );
        // console.log(responseData.data);
        setContests(responseData.data);
      } else if (title === "Overs: 15-18") {
        const responseData = await axios.post(
          "https://fanverse-backend.onrender.com/api/ballbyball/sixteentoeighteen/getall",
          { matchId: data.matchId }
        );
        // console.log(responseData.data);
        setContests(responseData.data);
      } else {
        const responseData = await axios.post(
          "https://fanverse-backend.onrender.com/api/ballbyball/nineteentotwenty/getall",
          { matchId: data.matchId }
        );
        // console.log(responseData.data);
        setContests(responseData.data);
      }
    }
    updateContests();
  }, []);
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

  // set the match Id and its competition id from data into async storage
  useEffect(() => {
    const storeMatchIdandCompetitionId = async () => {
      try {
        await AsyncStorage.setItem("matchId", JSON.stringify(data.matchId));
        await AsyncStorage.setItem(
          "competitionId",
          JSON.stringify(data.competitionId)
        );
      } catch (e) {
        console.log("Error storing matchId and competitionId: ", e);
      }
    };
    console.log("match id is :", data.matchId);
    storeMatchIdandCompetitionId();
  }, []);

  const handleCardPress = (fee, contestId) => {
    navigation.navigate("BeforeContestDetails", {
      data: data,
      amount: amount,
      variation: variation,
      title: title,
      entryFee: fee,
      contestId: contestId,
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
          {variation === "Ball by Ball Predictor"
            ? title === "Overs: 1-3" || title === "Overs: 3-6"
              ? "Powerplay " + title
              : title === "Overs: 18-20"
              ? "Final " + title
              : title
            : variation}
          {variation === "7 + 4" ? " players" : ""}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: variation === "Ball by Ball Predictor" ? 62 : 128,
        }}
      >
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
              size={12}
              style={{ marginVertical: 4 }}
              color={COLORS.light_grey}
            />
            <Text style={cStyles.matchText2}>{"Filter"}</Text>
          </TouchableOpacity>
        </View>
        {contests.length === 0 ? (
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
              <ContestCard2
                contest={item}
                variationSelected={variation}
                oversSelected={title}
                handleContestCardPress={() =>
                  handleCardPress(item.EntryFees, item._id)
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      {variation !== "Ball by Ball Predictor" && (
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
      )}
    </SafeAreaView>
  );
};

export default BallByBallContestScreen;
