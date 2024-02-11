import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  ToastAndroid,
  Animated,
  Image,
  Easing,
  Share,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Clipboard from '@react-native-clipboard/clipboard';
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/RewardsScreen.style";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import RewardsCard from "../components/common/RewardsCard";
const RewardsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 80,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Rewards</Text>
        </View>
        {/* <Text
          style={{
            color: COLORS.light,
            fontSize: 18,
            paddingHorizontal: 70,
            paddingVertical: 25,
            fontWeight: "400",
            // backgroundColor: "teal",
          }}
        >
          Rewards
        </Text> */}
          </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 1,
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: COLORS.bgLightBlack,
            // borderRadius: 20,
            paddingVertical: 10,
            marginHorizontal: 20,

          }}
        >
          <Ionicons name="md-star" size={25} color={"#faf25a"} />
          <View>
            <Text style={{ fontSize: 18, color:COLORS.light_grey }}>365</Text>
            <Text style={{ fontSize: 12, color:COLORS.light_grey }}>Available Points</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.bgMateBlack,
              gap: 3,
              flexDirection: "row",
              alignItems:"center",
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 10,
            }}
          >
            <Ionicons name="time-outline" size={19} color={"#4f9c9c"} />
            <Text style={{ color: "#4f9c9c", fontSize: 16 }}>History</Text>
          </TouchableOpacity>
        </View>
      <ScrollView contentContainerStyle={{paddingBottom:70}}   showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: 15 }}>
          <RewardsCard
            name={"starbucks"}
            title={"10$ spotify card"}
            currentpoints={300}
            totalpoints={300}
          />
          <RewardsCard
            name={"amazon"}
            title={"50$ gift Card on Amazon"}
            currentpoints={500}
            totalpoints={2500}
          />
          <RewardsCard
            name={"starbucks"}
            title={"10$ spotify card"}
            currentpoints={300}
            totalpoints={300}
          />
          <RewardsCard
            name={"amazon"}
            title={"50$ gift Card on Amazon"}
            currentpoints={500}
            totalpoints={2500}
          />
          <RewardsCard
            name={"starbucks"}
            title={"10$ spotify card"}
            currentpoints={300}
            totalpoints={300}
          />
          <RewardsCard
            name={"amazon"}
            title={"50$ gift Card on Amazon"}
            currentpoints={500}
            totalpoints={2500}
          />
          <RewardsCard
            name={"starbucks"}
            title={"10$ spotify card"}
            currentpoints={300}
            totalpoints={300}
          />
          <RewardsCard
            name={"amazon"}
            title={"50$ gift Card on Amazon"}
            currentpoints={500}
            totalpoints={2500}
          />
          <RewardsCard
            name={"starbucks"}
            title={"10$ spotify card"}
            currentpoints={300}
            totalpoints={300}
          />
          <RewardsCard
            name={"amazon"}
            title={"50$ gift Card on Amazon"}
            currentpoints={500}
            totalpoints={2500}
          />
          <RewardsCard
            name={"starbucks"}
            title={"10$ spotify card"}
            currentpoints={300}
            totalpoints={300}
          />
          <RewardsCard
            name={"amazon"}
            title={"50$ gift Card on Amazon"}
            currentpoints={500}
            totalpoints={2500}
          />
        
        </View>
      </ScrollView>
    </View>
  );
};

export default RewardsScreen;
