import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/AccountScreen.style.js";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen({ navigation }) {
  const [isVerified, setIsVerified] = useState(false);

  const [data, setData] = useState({
    username: "dummy",
    contestsWon: 0,
    totalContests: 0,
    matches: [],
    series: 0,
    primaryInfo: {
      mobile: "unknown",
      email: "unknown",
    },
  });

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      return token != null ? JSON.parse(token) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getToken().then(async (token) => {
      try {
        const userData = await axios.get(
          "https://fanverse-backend.onrender.com/api/user/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (userData) {
          setData(userData.data);
        }
      } catch (error) {
        console.log("Error in getting user data: ", error);
      }
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Account</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* personal INfo */}
        <View style={styles.personalInfoTop}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/pic_sample.jpg")}
              style={styles.image_profile}
            />
          </View>
          <View style={styles.top_profile_left}>
            <Text style={styles.colorslight}>{data.username}</Text>
            <Text style={styles.colorslight_grey}>{data.email}</Text>
            {isVerified == false && (
              <View style={styles.verfied_container}>
                <Ionicons
                  name={isVerified ? "shield-checkmark" : "warning"}
                  size={25}
                  color={isVerified ? COLORS.darkGreen : "#ad7736"}
                />
                <Text style={[styles.colorslight_grey, { marginLeft: 10 }]}>
                  {isVerified ? "Verified" : "Not Verified"}
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* Finacial history -- all transactions */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyTransactions");
          }}
        >
          <View style={styles.financialHistoryContainer}>
            <Text style={styles.financialHistoryText}>Financial history</Text>
          </View>
        </TouchableOpacity>
        {/*player contest records  */}
        <View style={styles.playingExperienceContainer}>
          <View style={{}}>
            <Text style={styles.playingExperienceText}>Playing Experience</Text>
          </View>
          <View style={styles.contestRecordContainer}>
            <View style={styles.contestRecordBox}>
              <Text style={styles.contestRecordBoxPoints}>
                {data.contestsWon}
              </Text>
              <Text style={styles.contestRecordBoxPointsDesc}>Contest Won</Text>
            </View>
            <View style={styles.contestRecordBox}>
              <Text style={styles.contestRecordBoxPoints}>
                {data.totalContests}
              </Text>
              <Text style={styles.contestRecordBoxPointsDesc}>
                Total Contests
              </Text>
            </View>
            <View style={styles.contestRecordBox}>
              <Text style={styles.contestRecordBoxPoints}>
                {data.matches.length}
              </Text>
              <Text style={styles.contestRecordBoxPointsDesc}>Matches</Text>
            </View>
            <View style={styles.contestRecordBox}>
              <Text style={styles.contestRecordBoxPoints}>{data.series}</Text>
              <Text style={styles.contestRecordBoxPointsDesc}>Series</Text>
            </View>
          </View>
        </View>
        {/* Primary Info */}
        <View style={styles.primaryInfoContainer}>
          <View>
            <Text style={[styles.colorslight_grey]}>Primary Info</Text>
          </View>
          <View style={styles.primaryInfoBox}>
            <View style={styles.primaryInfoBoxRow}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.colorslight}>Mobile No.</Text>
                <Text style={styles.primaryItem}>+91 {data.mobile}</Text>
              </View>
              <View>
                <Text style={styles.ChangeText}>CHANGE</Text>
              </View>
            </View>
            <View style={styles.primaryInfoBoxRow}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.colorslight}>Email Id</Text>
                <Text style={styles.primaryItem}>{data.email}</Text>
              </View>
              <View>
                <Text style={styles.ChangeText}>CHANGE</Text>
              </View>
            </View>
          </View>
        </View>
        {/* Basic Info */}
        <View style={styles.basicInfoContainer}>
          <View>
            <Text style={[styles.colorslight_grey]}>Basic Info</Text>
          </View>
          <View style={styles.basicInfoBox}>
            <View style={styles.basicInfoRow1}>
              <View style={{ width: "35%" }}>
                <Text style={[styles.colorslight_grey]}>Date of birth</Text>
                <Text style={[styles.colorslight_grey, { fontSize: 12 }]}>
                  {"unknown"}
                </Text>
              </View>
              <View style={{ width: "38%" }}>
                <Text style={[styles.colorslight_grey]}>Gender</Text>
                <Text style={[styles.colorslight_grey, { fontSize: 12 }]}>
                  {"unknown"}
                </Text>
              </View>
            </View>
            <View style={styles.basicInfoRow2}>
              <View style={{ width: "35%" }}>
                <Text style={[styles.colorslight_grey]}>Country</Text>
                <Text style={[styles.colorslight_grey, { fontSize: 12 }]}>
                  {"unknown"}
                </Text>
              </View>
              <View style={{ width: "38%" }}>
                <Text style={[styles.colorslight_grey]}>State</Text>
                <Text style={[styles.colorslight_grey, { fontSize: 12 }]}>
                  {"unknown"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
