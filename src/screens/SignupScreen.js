import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";

export default function SignUpScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.light }}
    ></SafeAreaView>
  );
}
