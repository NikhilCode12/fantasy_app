import React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = async () => {
    // AsyncStorage.clear();
    // navigation.navigate("Login");
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      // console.log("USER TOKEN IS: ", userToken);
      // console.log("USER DATA IS : ", await AsyncStorage.getItem("user"));
      if (userToken) {
        navigation.navigate("BottomNavigation");
      } else {
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log("Error checking if user is logged in: ", err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/cricket_icon.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.subtitle}>Fanverse</Text>
        <Text style={styles.description}>
          Unleash your fantasy sports journey on this platform.
        </Text>
        <Text style={styles.description}>
          Click on Get Started to Play and Enjoy!
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>GET STARTED</Text>
          <AntDesign name="rightcircle" size={24} color={COLORS.dark} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    borderWidth: 4,
    borderColor: COLORS.primary,
    borderRadius: 100,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.light,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.primary,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.light,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    marginRight: 10,
  },
});

export default WelcomeScreen;
