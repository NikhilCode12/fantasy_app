import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/home.style";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Main from "../components/home/Main";

const HomeScreen = () => {
  const [isFocusedProfile, setisFocusedProfile] = useState(false);
  const [isFocusedNotifications, setisFocusedNotifications] = useState(false);
  const [isFocusedWallet, setisFocusedWallet] = useState(false);

  return (
    <SafeAreaView>
      <View style={styles.appBarContainer}>
        <View style={styles.appBar}>
          <TouchableOpacity>
            <Ionicons
              onPress={() => {
                setisFocusedProfile(!isFocusedProfile);
              }}
              name={isFocusedProfile ? `person` : `person-outline`}
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <Text style={styles.appBarHeading}>Fanverse</Text>
          <View style={styles.appBarRight}>
            <TouchableOpacity>
              <Ionicons
                onPress={() => {
                  setisFocusedNotifications(!isFocusedNotifications);
                }}
                name={
                  isFocusedNotifications
                    ? `ios-notifications`
                    : `ios-notifications-outline`
                }
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                onPress={() => {
                  setisFocusedWallet(!isFocusedWallet);
                }}
                name={isFocusedWallet ? `wallet` : `wallet-outline`}
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Main />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
