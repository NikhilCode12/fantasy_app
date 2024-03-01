import React, { useState, useRef, useEffect } from "react";
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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function OtpScreen({ navigation, route }) {
  const { mobileOTP, emailOTP, phoneNum, email } = route.params;
  const [actualOtp, setActualOtp] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [otpResentTime, setOtpResentTime] = useState(null); // Track the time when OTP was resent
  const refs = useRef([]);

  const randomName = Math.random().toString(36).substring(7);

  useEffect(() => {
    setOtpResentTime(new Date());
    refs.current[0].focus();
    startResendTimer();
    if (emailOTP === "") setActualOtp(mobileOTP);
    else setActualOtp(emailOTP);
  }, []);

  const startResendTimer = () => {
    const timerInterval = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          clearInterval(timerInterval);
          setResendDisabled(false);
          return 60;
        }
      });
    }, 1000);
  };

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

  const handleResendCode = async (phoneNum, email) => {
    try {
      console.log("Resend code pressed!");

      if (phoneNum) {
        const response = await axios.post(
          "https://fanverse-backend.onrender.com/api/send-sms-otp",
          {
            mobileNumber: "+91" + phoneNum,
          }
        );

        if (response.status === 200) {
          console.log("SMS OTP Resent!");
          ToastAndroid.show(
            "Resent OTP Valid for 1 minute!",
            ToastAndroid.SHORT
          );
          setActualOtp(response.data.otp);
          setOtpResentTime(new Date()); // Record the time when OTP was resent
        }
      } else if (email) {
        const response = await axios.post(
          "https://fanverse-backend.onrender.com/api/send-email-otp",
          {
            email: email,
          }
        );

        if (response.status === 200) {
          console.log("Email OTP Resent!");
          ToastAndroid.show(
            "Resent OTP Valid for 1 minute!",
            ToastAndroid.SHORT
          );
          setActualOtp(response.data.otp);
          setOtpResentTime(new Date()); // Record the time when OTP was resent
        }
      }

      ToastAndroid.show("OTP Resent!", ToastAndroid.SHORT);
      setResendDisabled(true);
      setResendTimer(60);
      startResendTimer();
    } catch (error) {
      console.log("Error in handleResendCode", error);
    }
  };

  const isOtpExpired = () => {
    // console.log("INSIDE IS OTP EXPIRED");
    const currentTime = new Date();

    const difference = (currentTime - otpResentTime) / 1000; // Difference in seconds
    if (!otpResentTime) return false; // If OTP was never resent, consider it as not expired
    // console.log("prev time: ",otpResentTime,"Current Time: ",currentTime);
    return difference > 60; // If difference exceeds 10 minutes (600 seconds), OTP is expired
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <LinearGradient
          colors={["#063970", COLORS.secondary]}
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

            <TouchableOpacity
              onPress={() => handleResendCode(phoneNum, email)}
              disabled={resendDisabled} // Disable resend button when timer is active
            >
              <Text
                style={[
                  styles.resendCode,
                  resendDisabled && { color: COLORS.light_grey },
                ]}
              >
                {resendDisabled
                  ? `Resend Code in ${resendTimer}s`
                  : "Resend Code"}
              </Text>
            </TouchableOpacity>
            <Button
              title="Verify OTP"
              onPress={async () => {
                const enteredOtp = otp.join("");
                setIsLoading(true);
                setTimeout(async () => {
                  setIsLoading(false);

                  if (enteredOtp == actualOtp) {
                    if (!isOtpExpired()) {
                      const user = await axios.post(
                        "https://fanverse-backend.onrender.com/api/user/create",
                        {
                          username: randomName,
                          email: email,
                          mobile: phoneNum,
                        }
                      );

                      if (user) {
                        try {
                          await AsyncStorage.setItem(
                            "userToken",
                            JSON.stringify(user.data.token)
                            );
                          if(user.data.msg==="User Already Registered"){
                            
                            await AsyncStorage.setItem(
                              "user",
                              JSON.stringify(user.data.existingUser)
                              );
                          }
                          else{
                            await AsyncStorage.setItem(
                              "user",
                              JSON.stringify(user.data.newUser)
                              );
                          }
                        } catch (e) {
                          console.log(e);
                        }
                      }

                      ToastAndroid.show(
                        "OTP Verified. Redirecting to Home...",
                        ToastAndroid.SHORT
                      );
                      setTimeout(() => {
                        navigation.navigate("BottomNavigation");
                      }, 1000);
                    } else {
                      ToastAndroid.show(
                        "Expired OTP. Please resend the code.",
                        ToastAndroid.SHORT
                      );
                    }
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
    borderWidth: 1,
    borderColor: COLORS.primary,
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
