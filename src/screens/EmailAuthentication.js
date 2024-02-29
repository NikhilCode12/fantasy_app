import React, { useState } from "react";
import { SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
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
  ToastAndroid,
} from "react-native";
import CheckBox from "../components/common/Checkbox";
import BackArrow from "../components/common/BackArrow";
// import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function EmailAuthentication({ navigation }) {
  // const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [isFocused, setisFocused] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const onChangeEmail = (email) => {
    setEmail(email);
  };

  const handleEmailVerification = async (email) => {
    try {
      const response = await axios.post(
        "https://fanverse-backend.onrender.com/api/send-email-otp",
        {
          email: email,
        }
      );

      if (response.status === 200) {
         ToastAndroid.show(
        `Sended an OTP to your email ${email}`,
        ToastAndroid.BOTTOM
      );
        navigation.navigate("Otp", {
          mobileOTP: "",
          emailOTP: response.data.otp,
          phoneNum: "",
          email: email,
        });
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        "Email not verified, please try again",
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <LinearGradient
          colors={["#063970", COLORS.primary]}
          style={{ flex: 1 }}
        >
          <StatusBar hidden />
          <View style={{ paddingTop: 16, paddingHorizontal: 12 }}>
            <BackArrow onPress={() => navigation.navigate("Login")} />
          </View>
          <View style={styles.heading}>
            <Text style={styles.headingTitle}>Welcome/Signup</Text>
            <Text style={styles.headingSubTitle}>
              Verify to begin your journey
            </Text>
          </View>
          <View style={styles.ending}>
            <Text style={{ fontSize: 14, marginBottom: 8, color: "white" }}>
              Enter Email Address
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
              <TextInput
                style={{
                  ...styles.emailSize,
                  width: "90%",
                  color: "black",
                  color: COLORS.primary,
                  fontWeight: "bold",
                }}
                placeholder="abc@email.com"
                placeholderTextColor={"lightgrey"}
                cursorColor={COLORS.primary}
                value={email}
                onChangeText={onChangeEmail}
                keyboardType="email-address"
                onFocus={() => {
                  setisFocused(true);
                }}
                onBlur={() => {
                  setisFocused(false);
                }}
              />
              <DeleteIcon
                onPress={() => {
                  setEmail("");
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
                style={{ marginLeft: 8, fontSize: 12, color: "white" }}
                onPress={() => {
                  setisChecked(!isChecked);
                }}
              >
                I certify that I am above 18 years
              </Text>
            </View>
            <Button
              title="Verify email"
              color={isChecked ? COLORS.btn : "grey"}
              onPress={() => {
                if (isChecked) {
                  handleEmailVerification(email);
                } else {
                  ToastAndroid.show(
                    "Please certify if you are above 18",
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
              <Text
                style={{ marginRight: 4, fontSize: 12, color: COLORS.light }}
              >
                By continuing, I agree to fanverse's
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  color: COLORS.light,
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
                style={{ fontSize: 14, marginBottom: 1, color: COLORS.light }}
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                Login via mobile
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "lightgrey",
                  borderStyle: "solid",
                  width: "33%",
                }}
              ></View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginVertical: 12,
              }}
            >
              <View style={styles.smallCircle}></View>
              <View style={styles.smallCircle}></View>
              <View style={styles.smallCircle}></View>
              <View
                style={{
                  borderRadius: 100,
                  backgroundColor: "grey",
                  width: 28,
                  height: 28,
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 4,
                }}
              >
                <Text
                  style={{
                    color: COLORS.light,
                    fontSize: 9,
                    textAlign: "center",
                  }}
                >
                  OR
                </Text>
              </View>
              <View style={styles.smallCircle}></View>
              <View style={styles.smallCircle}></View>
              <View style={styles.smallCircle}></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => console.log("Facebook")}
                style={{
                  marginRight: 6,
                  ...styles.socialLogoIcons,
                }}
              >
                <Image
                  source={require("../../assets/facebook.png")}
                  style={styles.socialLogos}
                  resizeMethod="auto"
                />
                <Text style={styles.socialLogoText}>Facebook</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log("Google")}
                style={{
                  marginLeft: 6,
                  ...styles.socialLogoIcons,
                }}
              >
                <Image
                  source={require("../../assets/google.png")}
                  style={styles.socialLogos}
                  resizeMethod="auto"
                />
                <Text style={styles.socialLogoText}>Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
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
  emailSize: {
    fontSize: 14,
    fontWeight: "600",
  },
  smallCircle: {
    borderRadius: 100,
    marginHorizontal: 2,
    backgroundColor: COLORS.light_grey,
    width: 2,
    height: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  socialLogos: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  socialLogoText: {
    marginLeft: 4,
    color: COLORS.light,
  },
  socialLogoIcons: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 5,
  },
});
