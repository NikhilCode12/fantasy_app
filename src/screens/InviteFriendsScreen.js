import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Share,
} from "react-native";
// import Clipboard from '@react-native-clipboard/clipboard';
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/InviteFriendsScreen.style";
import { Ionicons } from "@expo/vector-icons";
export default function InviteFriendsScreen({ navigation }) {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Download the Fanverse App Now using my coupoun Code ",
      });

      if (result.action === Share.sharedAction) {
        console.log("Shared successfully");
      } else if (result.action === Share.dismissedAction) {
        console.log("Share was dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };
  // const imagePath = '.../assets/inviteAndearn.jpg';
  const copyToClipboard = () => {
    // Clipboard.setString('5BGhbc45GX');
    ToastAndroid.show("Coupoun Code Copied", ToastAndroid.SHORT);
  };

  //   const fetchCopiedText = async () => {
  //     const text = await Clipboard.getString();
  //     setCopiedText(text);
  //   };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Invite Friends</Text>
      </View>

      <Image
        source={require("../../assets/inviteAndEarn.jpg")}
        style={styles.image}
      />

      <View style={styles.referralCode}>
        <View>
          <Text style={styles.referralCodeText2}>Referral Code</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Text style={styles.referralCodeText}>4KWYAPO</Text>
          <Ionicons
            name="copy"
            color={COLORS.light}
            size={18}
            onPress={copyToClipboard}
          />
        </View>
      </View>
      <View style={styles.howItWorks}>
        <Text style={styles.howItWorksTitle}>How it works?</Text>
        <View style={styles.steps}>
          <Text style={styles.step}>
            1. Share this code with friends & family.
          </Text>
          <Text style={styles.step}>
            2. They will use your referral code at the time of sign up.
          </Text>
          <Text style={styles.step}>
            3. Your friend will get a signup deposit coupon worth up to ₹50.
          </Text>
          <Text style={styles.step}>
            4. You will get up to ₹500 in your Discount point wallet on your
            friend's first deposit of minimum ₹50. (Up to 5 Referrals)
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={handleShare}
          style={{
            marginHorizontal: 80,
            alignItems: "center",
            marginTop: 25,
            backgroundColor: "#f2cd66",
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: 6,
            paddingVertical: 12,
            borderRadius: 20,
          }}
        >
          <Ionicons name="share" color={COLORS.bgMateBlack} size={25} />
          <Text style={{ fontSize: 18 }}>Invite Friends</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
