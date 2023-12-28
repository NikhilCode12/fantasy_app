import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/common/Button";
import BackArrow from "../components/common/BackArrow";
import _ from "lodash";

export default function OtpScreen({ navigation }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const refs = useRef([]);

  // Debounce the handleChange function to improve performance
  const debouncedHandleChange = useRef(_.debounce(handleChange, 300)).current;

  function handleChange(value, index) {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input box if a character is entered in the current box
    if (value && index < otp.length - 1) {
      const nextInput = refs.current[index + 1];
      nextInput && nextInput.focus();
    }

    // If the current input is empty, move focus to the previous input
    if (!value && index > 0) {
      const prevInput = refs.current[index - 1];
      prevInput && prevInput.focus();
    }
  }

  const handleResendCode = () => {
    // Implement logic to resend the code
    console.log("Resend code functionality");
    ToastAndroid.show("OTP Resent!", ToastAndroid.SHORT);
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
          <View style={{ paddingTop: 16, paddingHorizontal: 12 }}>
            <BackArrow onPress={() => navigation.navigate("Login")} />
          </View>
          <View style={styles.container}>
            <Text style={styles.heading}>Enter OTP</Text>
            <Text style={styles.subHeading}>
              We've sent a 6-digit code to your mobile number.
            </Text>
            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  value={value}
                  cursorColor={COLORS.dark}
                  maxLength={1}
                  onChangeText={(text) => handleChange(text, index)}
                  ref={(input) => (refs.current[index] = input)}
                  keyboardType="numeric" // Ensure numeric keyboard for OTP
                />
              ))}
            </View>
            <TouchableOpacity
              onPress={() => console.log("Didn't receive code?")}
            >
              <Text style={styles.resendText}>Didn't receive code?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleResendCode}>
              <Text style={styles.resendCode}>Resend Code</Text>
            </TouchableOpacity>
            <Button
              title="Verify OTP"
              onPress={() => {
                const enteredOtp = otp.join("");
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);

                  if (enteredOtp === "123456") {
                    ToastAndroid.show(
                      "OTP Verified. Redirecting to Home...",
                      ToastAndroid.SHORT
                    );
                    setTimeout(() => {
                      navigation.navigate("BottomNavigation");
                    }, 1000);
                  } else {
                    ToastAndroid.show(
                      "Invalid OTP. Please try again.",
                      ToastAndroid.SHORT
                    );
                    setOtp(["", "", "", "", "", ""]);
                  }
                }, 2000);
              }}
            />
            {isLoading && (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color={COLORS.dark} />
              </View>
            )}
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 48,
  },
  heading: {
    color: COLORS.light,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    color: COLORS.primary,
    fontSize: 16,
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    backgroundColor: COLORS.light_grey,
    borderRadius: 5,
    fontSize: 24,
    width: "14%",
    height: 50,
    textAlign: "center",
    color: COLORS.dark,
    fontWeight: "bold",
  },
  resendText: {
    color: COLORS.light,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  resendCode: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
    borderRadius: 10,
  },
});
