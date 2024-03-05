import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Animated,
  Easing,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/home.style";
import COLORS from "../constants/colors";
import Main from "../components/home/Main";
import { Ionicons } from "@expo/vector-icons";
import ProfileOverlay from "../screens/ProfileOverlay";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = ({}) => {
  const navigation = useNavigation();
  const [isProfileOverlayVisible, setProfileOverlayVisible] = useState(false);
  const [overlayAnimation] = useState(new Animated.Value(-300));

  const handleMatchCardPress = (data) => {
    AsyncStorage.setItem("matchId",JSON.stringify(data.matchId));
    AsyncStorage.setItem("competitionId",JSON.stringify(data.competitionId));
    navigation.navigate("VariationsScreen", { data: data });
  };

  const openProfileOverlay = () => {
    setProfileOverlayVisible(true);
  };

  const closeProfileOverlay = () => {
    Animated.timing(overlayAnimation, {
      toValue: -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => setProfileOverlayVisible(false));
  };

  useEffect(() => {
    if (isProfileOverlayVisible) {
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  }, [isProfileOverlayVisible, overlayAnimation]);
  useEffect(() => {
    const backAction = () => {
      closeProfileOverlay();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.dark }}>
      <View style={styles.appBarContainer}>
        <View style={styles.appBar}>
          <TouchableOpacity
            style={styles.appBarIconsBg}
            onPress={openProfileOverlay}
          >
            <Ionicons name="person-outline" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.appBarHeading}>Fannverse</Text>
          <View style={styles.appBarRight}>
            <TouchableOpacity
              style={styles.appBarIconsBg}
              onPress={() => {
                navigation.navigate("Notification");
              }}
            >
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.appBarIconsBg}
              onPress={() => {
                navigation.navigate("Wallet");
              }}
            >
              <Ionicons
                name="wallet-outline"
                size={22}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Main onMatchCardPress={handleMatchCardPress} />
      <ProfileOverlay
        isVisible={isProfileOverlayVisible}
        onClose={closeProfileOverlay}
        overlayAnimation={overlayAnimation}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
