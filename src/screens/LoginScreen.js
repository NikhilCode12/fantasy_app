import React, { useState } from "react";
import { SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import DeleteIcon from "../components/DeleteIcon";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  Button,
  ToastAndroid,
} from "react-native";
import CheckBox from "../components/Checkbox";

export default function LoginScreen({ navigation }) {
  const [phoneNum, setPhoneNum] = useState("");
  const [isChecked, setisChecked] = useState(false);
  const onChangePhone = (number) => {
    setPhoneNum(number);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
        <LinearGradient
          colors={["#063970", COLORS.primary]}
          style={{ flex: 1 }}>
          <StatusBar hidden />
          <View style={styles.heading}>
            <Text style={styles.headingTitle}>Login/Register</Text>
            <Text style={styles.headingSubTitle}>
              Please enter your account credentials
            </Text>
          </View>
          <View style={styles.ending}>
            <Text style={{ fontSize: 14, marginBottom: 8 }}>
              Enter Mobile Number
            </Text>
            <View
              style={{
                backgroundColor: COLORS.light_grey,
                paddingHorizontal: 12,
                flexDirection: "row",
                borderRadius: 5,
                alignItems: "center",
                paddingVertical: 8,
              }}>
              <Text style={styles.numberSize}>{"+91 "}</Text>
              <TextInput
                style={{
                  ...styles.numberSize,
                  width: "80%",
                  color: "black",
                }}
                cursorColor={"grey"}
                value={phoneNum}
                onChangeText={onChangePhone}
                keyboardType="phone-pad"
                maxLength={10}
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
              }}>
              <CheckBox
                checked={isChecked}
                onChange={() => {
                  setisChecked(!isChecked);
                }}
              />
              <Text style={{ marginLeft: 8, fontSize: 12 }}>
                I certify that I am above 18 years
              </Text>
            </View>
            <Button
              title="Verify mobile"
              color={isChecked && phoneNum.length === 10 ? "green" : "grey"}
              onPress={() => {
                if (isChecked && phoneNum.length === 10) {
                  navigation.navigate("Otp");
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
              }}>
              <Text style={{ marginRight: 4, fontSize: 12 }}>
                By continuing, I agree to fanverse's
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>T&C.</Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                marginVertical: 12,
              }}>
              <Text
                style={{ fontSize: 14, marginBottom: 1 }}
                onPress={() => {
                  navigation.navigate("EmailAuthentication");
                }}>
                Other options
              </Text>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                  borderStyle: "dotted",
                  width: "27.5%",
                }}></View>
            </View>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  headingTitle: {
    color: COLORS.light,
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 4,
  },
  headingSubTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  ending: {
    flex: 5,
    backgroundColor: COLORS.light,
    paddingHorizontal: 22,
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  numberSize: {
    fontSize: 16,
    fontWeight: "600",
  },
});
