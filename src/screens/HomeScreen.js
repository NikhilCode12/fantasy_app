import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/home.style";
import COLORS from "../constants/colors";
import Main from "../components/home/Main";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.appBarContainer}>
        <View style={styles.appBar}>
          <TouchableOpacity
            style={styles.appBarIconsBg}
            onPress={() => {
              navigation.navigate("DrawerNavigation");
            }}
          >
            <Ionicons name="person-outline" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.appBarHeading}>Fanverse</Text>
          <View style={styles.appBarRight}>
            <TouchableOpacity style={styles.appBarIconsBg}>
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                onPress={() => {
                  navigation.navigate("Notification");
                }}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.appBarIconsBg}>
              <Ionicons
                name="wallet-outline"
                size={22}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Main />
    </SafeAreaView>
  );
};

export default HomeScreen;
