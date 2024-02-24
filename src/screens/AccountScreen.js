import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
  TextInput,
  ScrollView,
  AsyncStorage,
  Image,
} from "react-native";
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/AccountScreen.style.js";
import { Ionicons } from "@expo/vector-icons";
import DeleteIcon from "../components/common/DeleteIcon.js";
import Toast from "react-native-toast-message";
import axios from "axios";

export default function AccountScreen({ navigation }) {
  const [isVerified, SetisVerified] = useState(false);

  // get user token from async storage
  useEffect(() => {
    async function getUserToken() {
      try {
        const value = await AsyncStorage.getItem("userToken");
        if (value !== null) {
          // value previously stored
          console.log("userToken", value);
        }
      } catch (e) {
        // error reading value
        console.log("error reading userToken", e);
      }
    }
    getUserToken();
  }, []);

  // get user data from api using token
  const getUserData = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const response = await axios.get(
        `https://fanverse-backend.onrender.com/api/user/${userToken}`
      );
      console.log("user data", response.data);
    } catch (e) {
      console.log("error getting user data", e);
    }
  };

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
            <Text style={styles.colorslight}>ARYAN KOHLI</Text>
            <Text style={styles.colorslight_grey}>mymail@gmail.com</Text>
            {isVerified == false && (
              <View style={styles.verfied_container}>
                <Ionicons name="warning" size={25} color={"#ad7736"} />
                <Text style={[styles.colorslight_grey, { marginLeft: 10 }]}>
                  Not Verified
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
              <Text style={styles.contestRecordBoxPoints}>10</Text>
              <Text style={styles.contestRecordBoxPointsDesc}>Contest Won</Text>
            </View>
            <View style={styles.contestRecordBox}>
              <Text style={styles.contestRecordBoxPoints}>49</Text>
              <Text style={styles.contestRecordBoxPointsDesc}>
                Total Contest
              </Text>
            </View>
            <View style={styles.contestRecordBox}>
              <Text style={styles.contestRecordBoxPoints}>40</Text>
              <Text style={styles.contestRecordBoxPointsDesc}>Matches</Text>
            </View>
            <View style={styles.contestRecordBox}>
              <Text style={styles.contestRecordBoxPoints}>35</Text>
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
                <Text style={styles.primaryItem}>+91 9876543210 </Text>
              </View>
              <View>
                <Text style={styles.ChangeText}>CHANGE</Text>
              </View>
            </View>
            <View style={styles.primaryInfoBoxRow}>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.colorslight}>Email Id</Text>
                <Text style={styles.primaryItem}>mymailid@gmail.com</Text>
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
                  12/12/2007
                </Text>
              </View>
              <View style={{ width: "38%" }}>
                <Text style={[styles.colorslight_grey]}>Gender</Text>
                <Text style={[styles.colorslight_grey, { fontSize: 12 }]}>
                  Male
                </Text>
              </View>
            </View>
            <View style={styles.basicInfoRow2}>
              <View style={{ width: "35%" }}>
                <Text style={[styles.colorslight_grey]}>Country</Text>
                <Text style={[styles.colorslight_grey, { fontSize: 12 }]}>
                  India
                </Text>
              </View>
              <View style={{ width: "38%" }}>
                <Text style={[styles.colorslight_grey]}>State</Text>
                <Text style={[styles.colorslight_grey, { fontSize: 12 }]}>
                  Arunachal Pradesh
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
