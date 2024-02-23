import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import DeleteIcon from "../components/common/DeleteIcon";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  Button,
  ToastAndroid,
  SafeAreaView,
} from "react-native";
import CheckBox from "../components/common/Checkbox";
import BackArrow from "../components/common/BackArrow";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [phoneNum, setPhoneNum] = useState("");
  const [isFocused, setisFocused] = useState(false);
  const [isChecked, setisChecked] = useState(false);

  const onChangePhone = (number) => {
    setPhoneNum(number);
  };

  const sendMobileOtp = async (phoneNum) => {
    try {
      await axios.post(
        "https://fanverse-backend.onrender.com/api/send-sms-otp",
        {
          mobileNumber: "+91" + phoneNum,
        }
      );

      ToastAndroid.show(
        "OTP sent successfully. Please check your SMS",
        ToastAndroid.BOTTOM
      );
    } catch (err) {
      console.log("Failed to send OTP via SMS", err);
      ToastAndroid.show(
        "Failed to send OTP via SMS. Please try again later",
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#063970", COLORS.primary]} style={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={{ paddingTop: 16, paddingHorizontal: 12 }}>
          <BackArrow onPress={() => navigation.navigate("Welcome")} />
        </View>
        <View style={styles.heading}>
          <Text style={styles.headingTitle}>Login/Register</Text>
          <Text style={styles.headingSubTitle}>
            Please enter your account credentials
          </Text>
        </View>
        <View style={styles.ending}>
          <Text style={{ fontSize: 14, marginBottom: 8, ...styles.textColor }}>
            Enter Mobile Number
          </Text>
          <View
            style={{
              backgroundColor: COLORS.teflon,
              paddingHorizontal: 12,
              flexDirection: "row",
              borderRadius: 5,
              alignItems: "center",
              paddingVertical: 8,
              borderWidth: 2,
              borderColor: COLORS.light_grey,
              borderBottomColor: isFocused ? COLORS.primary : "transparent",
            }}
          >
            <Text style={styles.numberSize}>{"+91 "}</Text>
            <TextInput
              style={{
                ...styles.numberSize,
                width: "80%", // Adjusted width
                marginLeft: 4,
                color: COLORS.primary,
                fontWeight: "bold",
              }}
              cursorColor={COLORS.primary}
              value={phoneNum}
              onChangeText={onChangePhone}
              keyboardType="phone-pad"
              maxLength={10}
              onFocus={() => {
                setisFocused(true);
              }}
              onBlur={() => {
                setisFocused(false);
              }}
            />
            <DeleteIcon
              onPress={() => {
                setPhoneNum("");
              }}
            />
          </View>
          <View
            style={{
              marginVertical: 12,
              marginBottom: 22,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CheckBox
              checked={isChecked}
              onChange={() => {
                setisChecked(!isChecked);
              }}
            />
            <Text
              style={{ marginLeft: 8, fontSize: 12, ...styles.textColor }}
              onPress={() => {
                setisChecked(!isChecked);
              }}
            >
              I certify that I am above 18 years
            </Text>
          </View>
          <Button
            title="Verify mobile"
            color={isChecked && phoneNum.length === 10 ? COLORS.btn : "grey"}
            onPress={() => {
              if (isChecked && phoneNum.length === 10) {
                sendMobileOtp(phoneNum);
                navigation.navigate("Otp", { phoneNum });
              } else {
                ToastAndroid.show(
                  "Please certify if you are above 18 and enter a valid 10-digit mobile number",
                  ToastAndroid.BOTTOM
                );
              }
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 12,
            }}
          >
            <Text style={{ marginRight: 4, fontSize: 12, ...styles.textColor }}>
              By continuing, I agree to fanverse's
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                ...styles.textColor,
              }}
            >
              T&C.
            </Text>
          </View>
          <View
            style={{
              alignItems: "flex-end",
              marginVertical: 12,
            }}
          >
            <Text
              style={{ fontSize: 14, marginBottom: 1, ...styles.textColor }}
              onPress={() => {
                navigation.navigate("EmailAuthentication");
              }}
            >
              other options
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "lightgrey",
                borderStyle: "solid",
                width: "26.5%",
              }}
            ></View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  headingTitle: {
    color: COLORS.light,
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 6,
  },
  headingSubTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "800",
    marginVertical: 6,
  },
  ending: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
    paddingHorizontal: 22,
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  numberSize: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  textColor: {
    color: COLORS.light,
  },
});
