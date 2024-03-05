import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import DeleteIcon from "../components/common/DeleteIcon";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckBox from "../components/common/Checkbox";
import BackArrow from "../components/common/BackArrow";
import { Ionicons } from "@expo/vector-icons";
// import { ScrollView } from "react-native-gesture-handler";

export default function HelpandSupportScreen({ navigation }) {
  const [registration, setregistration] = useState(false);
  const [PlayingTheGame, setPlayingTheGame] = useState(false);
  const [ScoresAndPoints, setScoresAndPoints] = useState(false);
  const [contests, setcontests] = useState(false);
  const [cashPrize, setCashPrize] = useState(false);
  const [accounBalance, setaccounBalance] = useState(false);
  const [Verfication, setVerifiaction] = useState(false);
  const [withdrawls, setWithdrawls] = useState(false);
  const [payments, setPayments] = useState(false);
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
        <Text style={styles.headerText}>Help and Support</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.faqsmainContainer}>
          <TouchableOpacity onPress={() => setregistration(!registration)}>
            <View style={styles.faqBox}>
              <Text style={styles.faqTitle}>Registration</Text>
              <Ionicons
                name={registration ? "remove" : "add"}
                size={20}
                color={COLORS.light_grey}
              />
            </View>
          </TouchableOpacity>
          {registration && (
            <View>
              <Text style={styles.faqQues}>
                What is Fantasy Akhada Referal Code?
              </Text>
              <Text style={styles.faqAns}>
                You can use the referral / promo code : AKHADA to get 500 Bonus
                while registration.
              </Text>
              <Text style={styles.faqQues}>
                Where Can I download Fantasy Akhada APK ?
              </Text>
              <Text style={styles.faqAns}>
                Visit www.fantasyakhada.com and click on “Download the Android
                App” button to download the APK.
              </Text>
              <Text style={styles.faqQues}>
                How do I sign up on Fantasy Akhada?
              </Text>
              <Text style={styles.faqAns}>
                The users can sign up on Fantasy Akhada by filling a short
                registration form available on the homepage of Fantasy Akhada
                website.
              </Text>
              <Text style={styles.faqQues}>
                How many accounts can I create with the same email id on Fantasy
                Akhada?
              </Text>
              <Text style={styles.faqAns}>
                Warning! You can create only one account with one email id on
                Fantasy Akhada. Creation of multiple accounts by a single user
                is strictly prohibited and violates our Fair Play policy.
              </Text>
              <Text style={styles.faqQues}>
                Can I update / edit my information?
              </Text>
              <Text style={styles.faqAns}>
                Sure! Simply log into Fantasy Akhada and click on ‘Profile’ at
                the bottom of the page. You will be able to update / edit your
                personal information. You can also edit your basic details like
                date of birth, address and state if your Fantasy Akhada account
                is ‘Unverified’. Remember, the Full Name, DOB, chosen by you,
                the email id and phone number registered once cannot be changed.
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={() => setPlayingTheGame(!PlayingTheGame)}>
            <View style={styles.faqBox}>
              <Text style={styles.faqTitle}>Playing the game</Text>
              <Ionicons
                name={PlayingTheGame ? "remove" : "add"}
                size={20}
                color={COLORS.light_grey}
              />
            </View>
          </TouchableOpacity>
          {PlayingTheGame && (
            <View>
              <Text style={styles.faqQues}>
                What is Fantasy Akhada Referal Code?
              </Text>
              <Text style={styles.faqAns}>
                You can use the referral / promo code : AKHADA to get 500 Bonus
                while registration.
              </Text>
              <Text style={styles.faqQues}>
                Where Can I download Fantasy Akhada APK ?
              </Text>
              <Text style={styles.faqAns}>
                Visit www.fantasyakhada.com and click on “Download the Android
                App” button to download the APK.
              </Text>
              <Text style={styles.faqQues}>
                How do I sign up on Fantasy Akhada?
              </Text>
              <Text style={styles.faqAns}>
                The users can sign up on Fantasy Akhada by filling a short
                registration form available on the homepage of Fantasy Akhada
                website.
              </Text>
              <Text style={styles.faqQues}>
                How many accounts can I create with the same email id on Fantasy
                Akhada?
              </Text>
              <Text style={styles.faqAns}>
                Warning! You can create only one account with one email id on
                Fantasy Akhada. Creation of multiple accounts by a single user
                is strictly prohibited and violates our Fair Play policy.
              </Text>
              <Text style={styles.faqQues}>
                Can I update / edit my information?
              </Text>
              <Text style={styles.faqAns}>
                Sure! Simply log into Fantasy Akhada and click on ‘Profile’ at
                the bottom of the page. You will be able to update / edit your
                personal information. You can also edit your basic details like
                date of birth, address and state if your Fantasy Akhada account
                is ‘Unverified’. Remember, the Full Name, DOB, chosen by you,
                the email id and phone number registered once cannot be changed.
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => setScoresAndPoints(!ScoresAndPoints)}
          >
            <View style={styles.faqBox}>
              <Text style={styles.faqTitle}>Scores and Points</Text>
              <Ionicons
                name={ScoresAndPoints ? "remove" : "add"}
                size={20}
                color={COLORS.light_grey}
              />
            </View>
          </TouchableOpacity>
          {ScoresAndPoints && (
            <View>
              <Text style={styles.faqQues}>
                What is Fantasy Akhada Referal Code?
              </Text>
              <Text style={styles.faqAns}>
                You can use the referral / promo code : AKHADA to get 500 Bonus
                while registration.
              </Text>
              <Text style={styles.faqQues}>
                Where Can I download Fantasy Akhada APK ?
              </Text>
              <Text style={styles.faqAns}>
                Visit www.fantasyakhada.com and click on “Download the Android
                App” button to download the APK.
              </Text>
              <Text style={styles.faqQues}>
                How do I sign up on Fantasy Akhada?
              </Text>
              <Text style={styles.faqAns}>
                The users can sign up on Fantasy Akhada by filling a short
                registration form available on the homepage of Fantasy Akhada
                website.
              </Text>
              <Text style={styles.faqQues}>
                How many accounts can I create with the same email id on Fantasy
                Akhada?
              </Text>
              <Text style={styles.faqAns}>
                Warning! You can create only one account with one email id on
                Fantasy Akhada. Creation of multiple accounts by a single user
                is strictly prohibited and violates our Fair Play policy.
              </Text>
              <Text style={styles.faqQues}>
                Can I update / edit my information?
              </Text>
              <Text style={styles.faqAns}>
                Sure! Simply log into Fantasy Akhada and click on ‘Profile’ at
                the bottom of the page. You will be able to update / edit your
                personal information. You can also edit your basic details like
                date of birth, address and state if your Fantasy Akhada account
                is ‘Unverified’. Remember, the Full Name, DOB, chosen by you,
                the email id and phone number registered once cannot be changed.
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={() => setcontests(!contests)}>
            <View style={styles.faqBox}>
              <Text style={styles.faqTitle}>Contests</Text>
              <Ionicons
                name={contests ? "remove" : "add"}
                size={20}
                color={COLORS.light_grey}
              />
            </View>
          </TouchableOpacity>
          {contests && (
            <View>
              <Text style={styles.faqQues}>
                What is Fantasy Akhada Referal Code?
              </Text>
              <Text style={styles.faqAns}>
                You can use the referral / promo code : AKHADA to get 500 Bonus
                while registration.
              </Text>
              <Text style={styles.faqQues}>
                Where Can I download Fantasy Akhada APK ?
              </Text>
              <Text style={styles.faqAns}>
                Visit www.fantasyakhada.com and click on “Download the Android
                App” button to download the APK.
              </Text>
              <Text style={styles.faqQues}>
                How do I sign up on Fantasy Akhada?
              </Text>
              <Text style={styles.faqAns}>
                The users can sign up on Fantasy Akhada by filling a short
                registration form available on the homepage of Fantasy Akhada
                website.
              </Text>
              <Text style={styles.faqQues}>
                How many accounts can I create with the same email id on Fantasy
                Akhada?
              </Text>
              <Text style={styles.faqAns}>
                Warning! You can create only one account with one email id on
                Fantasy Akhada. Creation of multiple accounts by a single user
                is strictly prohibited and violates our Fair Play policy.
              </Text>
              <Text style={styles.faqQues}>
                Can I update / edit my information?
              </Text>
              <Text style={styles.faqAns}>
                Sure! Simply log into Fantasy Akhada and click on ‘Profile’ at
                the bottom of the page. You will be able to update / edit your
                personal information. You can also edit your basic details like
                date of birth, address and state if your Fantasy Akhada account
                is ‘Unverified’. Remember, the Full Name, DOB, chosen by you,
                the email id and phone number registered once cannot be changed.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  scrollarea: {
    flex: 1,
    // paddingBottom:5,
    // marginBottom:15
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.bgMateBlack,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.light_grey,
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  backArrow: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  colorslight: { color: COLORS.light },
  colorslight_grey: { color: COLORS.light_grey },

  // bottom
  faqsmainContainer: { flexDirection: "column", marginHorizontal: 20 },
  faqBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 15,
    backgroundColor: COLORS.transparentBg,
    paddingVertical: 10,
  },
  faqTitle: { color: COLORS.light_grey, fontSize: 16 },
  faqQues: { color: COLORS.light, marginTop: 30 },
  faqAns: { color: COLORS.light_grey, marginTop: 5 },
});
