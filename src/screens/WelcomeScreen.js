import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";
import COLORS from "../constants/colors";
import Button from "../components/common/Button";

export default function WelcomeScreen({ navigation }) {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={["skyblue", COLORS.btn, "#063970"]}
    >
      <View>
        <Image
          source={require("../../assets/icon.png")}
          style={{
            width: 200,
            height: 200,
            borderRadius: 20,
            position: "absolute",
            borderWidth: 6,
            borderColor: COLORS.dark,
            top: 90,
            left: 75,
          }}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          position: "absolute",
          top: 350,
          width: "100%",
        }}
      >
        <Text style={{ fontSize: 42, fontWeight: 900, color: COLORS.light }}>
          Welcome,
        </Text>
        <Text
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: COLORS.light,
          }}
        >
          To Fanverse
        </Text>
        <View style={{ marginVertical: 24 }}>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.primary,
              fontWeight: "bold",
              marginVertical: 6,
            }}
          >
            Unleash Your Fantasy Sports Journey on this platform...
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: COLORS.light,
              fontWeight: "bold",
              marginVertical: 6,
            }}
          >
            Click on Get Started to Play and Enjoy!
          </Text>
          <Button
            title="GET STARTED"
            style={{ marginVertical: 14, width: "100%" }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
}
