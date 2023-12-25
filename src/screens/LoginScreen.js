import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import BackArrow from "../components/BackArrow";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#063970", COLORS.primary]} style={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={styles.heading}>
          {/* <BackArrow
            onPress={() => {
              navigation.navigate("Welcome");
            }} /> */}
          <Text style={styles.headingTitle}>Login/Register</Text>
          <Text style={styles.headingSubTitle}>
            Please enter your account credentials
          </Text>
        </View>
        <View style={styles.ending}>
          <View>
            <Text>Mobile Number</Text>
            <TextInput
              placeholder="+91"
              style={{
                width: "auto",
                backgroundColor: COLORS.light_grey,
                marginVertical: 6,
                paddingVertical: 6,
                paddingHorizontal: 12,
                borderRadius: 5,
                color: COLORS.dark,
                fontWeight: "bold",
                letterSpacing: 1,
                fontSize: 16,
              }}
            />
          </View>
        </View>
      </LinearGradient>
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
    marginVertical: 10,
  },
  headingSubTitle: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  ending: {
    flex: 4,
    backgroundColor: COLORS.light,
    paddingHorizontal: 22,
    paddingVertical: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
