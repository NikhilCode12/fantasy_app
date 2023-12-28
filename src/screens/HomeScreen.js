import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/home.style";
import COLORS from "../constants/colors";
import Main from "../components/home/Main";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ProfileOverlay from "../screens/ProfileOverlay";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isProfileOverlayVisible, setProfileOverlayVisible] = useState(false);

  const openProfileOverlay = () => {
    setProfileOverlayVisible(true);
  };

  const closeProfileOverlay = () => {
    setProfileOverlayVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.appBarContainer}>
        <View style={styles.appBar}>
          <TouchableOpacity onPress={openProfileOverlay}>
            <Ionicons name="person-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.appBarHeading}>Fanverse</Text>
          <View style={styles.appBarRight}>
            <TouchableOpacity onPress={openProfileOverlay}>
              <Ionicons
                name="ios-notifications-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="wallet-outline"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Main />

      {isProfileOverlayVisible && (
        <ProfileOverlay onClose={closeProfileOverlay} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
